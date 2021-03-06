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
  indicators () {
    return db.collection('indicators');
  },

  page (state) {
    return state.user.id? state.page : null;
  },

  isAuthenticated (state) {
    return !!state.user.id;
  },

  isAuthentication (state) {
    return state.signIn && state.signIn + 30 * 1000 > new Date().getTime();
  },

  getSecurityMoex: (state) => (code) => {
    const url = state.security.url + code + '.json';
    console.log('fetch', url);
    return axios.get(url)
      .then(response => response.data || {})
  },

  chartLinks ({links}) {
    return links.list.filter(link => link.chartUrl)
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

  securityTradeAccounts ({trades, accounts}) {
    return trades.list.reduce((items, model) => {
      console.log('model', model);
      const code = model.accountCode;
      const account = accounts.list.find(account => account.code === code);
      items[code] = items[code] ||
        { code,
          name: account ? account.name : '-',
          securities: {},
          trades: []
        };

      const securityCode = model.securityCode;
      items[code].securities[securityCode] = items[code].securities[securityCode] ||
        { code: model.securityCode,
          name: account ? account.name : '-',
          date: null,
          volume: 0,
          avg: 0,
          income: 0, // общий приход за продажу буман
          interest: 0, // общий приход дивидендов, проуентам или купону
          expense: 0, // общий расход на покупку
          commission: 0, // общая расход на коммиссию
          tax: 0, // общая сумма налогов
        };

      console.log('model', model);
      const a = items[code].securities[securityCode];
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
        a.tax += model.tax; // получаем суммарные налоги
      } else if (model.typeCode === 'coupon') {
        a.interest += (model.sum - model.tax); // получаем стоимость отдаем налог
        a.tax += model.tax; // получаем суммарные налоги
      }
      a.date = model.date;
      a.commission += model.commission.reduce((sum, c) => sum + c, 0); // отдаем коммиссию
      const calc = {
        avg: a.avg, // средневзвешенное значение
        volume: a.volume, // количество бумаг
        income: a.income, // доход от продажи
        interest: a.interest, // доход от дивидендов
        expense: a.expense, // расход на покупку
        commission: a.commission,  // расход на комиссию
        tax: a.tax  // сумма налогов
      };
      items[code].trades.push({...model, calc });
      return items;
    }, {});
  },


  securityCode : ({security}) =>
    security.market['SECID'],

  securityName : ({security}) =>
    security.market['SECNAME'],

  securityIsin : ({security}) =>
    security.market['ISIN'],

  securityLevel : ({security}) =>
    security.market['LISTLEVEL'],

  securityStatus : ({security}) =>
    security.market['STATUS'],

  securityReg : ({security}) =>
    security.market['REGNUMBER'],

  securityIssueSize : ({security}) =>
    security.market['ISSUESIZE'],

  securityVolume : ({security}) =>
    security.price['VALTODAY'],

  securityIssueCapitalization : ({security}) =>
    security.price['ISSUECAPITALIZATION'],

  securityPrice : ({security}) =>
    security.price['LAST'] || security.price['LCURRENTPRICE'],

  securityPriceChange : ({security}) =>
    security.price['CHANGE'],

  securityPriceChangePercent : ({security}) =>
    security.price['LASTTOPREVPRICE']

};
