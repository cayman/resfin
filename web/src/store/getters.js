import {db} from './firebase';
import axios from 'axios';
export default {
  sectors () {
    return db.collection('sectors');
  },
  links () {
    return db.collection('links');
  },
  securities () {
    return db.collection('stocks');
  },
  comments () {
    return db.collection('comments');
  },
  accounts () {
    return db.collection('accounts');
  },
  trades () {
    return db.collection('trades');
  },

  page (state) {
    return state.user.id? state.page : null;
  },

  getSecurity: (state) => (code) => {
    const url = state.security.url + code + '.json';
    console.log('fetch', url);
    return axios.get(url)
      .then(response => response.data || {})
      .then(data => data.marketdata || {});
  },

  chartLink ({links}) {
    return links.list.find(link => link.chart);
  },

  securityTypes : ({security}) =>
    security.types.reduce((types, type) => {
      types[type.code] = type;
      return types;
    }, {}),

  securityFavorites : ({security}) =>
    security.favorites.reduce((favorites, favorite) => {
      favorites[favorite.code] = favorite;
      return favorites;
    }, {}),

  tradeAccounts ({trades, accounts}) {
    return trades.list.reduce((items, model) => {
      console.log('model', model);
      items[model.accountCode] = items[model.accountCode] ||
        { code: model.accountCode,
          name: accounts.list.find(account => account.code === model.accountCode).name,
          date: null,
          volume: 0,
          avg: 0,
          income: 0, // общий приход за продажу буман
          interest: 0, // общий приход дивидендов, проуентам или купону
          expense: 0, // общий расход на покупку
          commission: 0, // общая расход на коммиссию
          trades: []
        };
      console.log('model', model);
      const a = items[model.accountCode];
      if (model.typeCode === 'buy') {
        // средневзвешенная после покупки
        a.avg =  (a.avg * a.volume + model.price * model.count) / (a.volume + model.count);
        a.volume += model.count;
        a.expense += model.sum; // отдаем стоимость
      } else if (model.typeCode === 'sell') {
        // средневзвешенная после продажи
        a.avg = a.volume >= model.count ? a.avg : model.price;
        a.volume -= model.count;
        a.income += model.sum; // получаем стоимость
      } else if (model.typeCode === 'dividend' ) {
        a.interest += (model.sum - model.tax); // получаем стоимость отдаем налог
      } else if (model.typeCode === 'coupon') {
        a.interest += (model.sum - model.tax); // получаем стоимость отдаем налог
      }
      a.date = model.date;
      a.commission += model.commission.reduce((sum, c) => sum + c, 0); // отдаем коммиссию
      const calc = {
        avg: a.avg, // средневзвешенное значение
        volume: a.volume, // количество бумаг
        income: a.income, // доход от продажи
        interest: a.interest, // доход от дивидендов
        expense: a.expense, // расход на покупку
        commission: a.commission  // расход на комиссию
      };
      a.trades.push({...model, calc });
      console.log('account', a);
      return items;
    }, {});
  },

  securityPrice : ({security}) =>
    security.moex['LAST'] || security.moex['LCURRENTPRICE'],

  securityPriceChange : ({security}) =>
    security.moex['CHANGE'],

  securityPriceChangePercent : ({security}) =>
    security.moex['LASTTOPREVPRICE']

};
