import {db} from './firebase';
import axios from 'axios';
export default {
  userId () {
    return db.collection('sectors');
  },
  sectors () {
    return db.collection('sectors');
  },
  links () {
    return db.collection('links');
  },
  stocks () {
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
  getStock: (state) => (code) => {
    const url = state.stock.url + code + '.json';
    console.log('fetch', url);
    return axios.get(url)
      .then(response => response.data || {})
      .then(data => data.marketdata || {});
  },

  chartLink ({links}) {
    return links.list.find(link => link.chart);
  },

  tradeAccounts ({trades, accounts}) {
    return trades.list.reduce((items, model) => {
      console.log('model', model);
      items[model.account] = items[model.account] ||
        { code: model.account,
          name: accounts.list.find(account => account.code === model.account).name,
          date: null,
          volume: 0,
          avg: 0,
          income: 0, // общий приход за продажу буман
          dividend: 0, // общий приход дивидендов
          expense: 0, // общий расход на покупку
          commission: 0, // общая расход на коммиссию
          trades: []
        };
      console.log('model', model);
      const a = items[model.account];
      if (model.type === 'buy') {
        // средневзвешенная после покупки
        a.avg =  (a.avg * a.volume + model.price * model.count) / (a.volume + model.count);
        a.volume += model.count;
        a.expense += model.sum; // отдаем стоимость
      } else if (model.type === 'sell') {
        // средневзвешенная после продажи
        a.avg = a.volume >= model.count ? a.avg : model.price;
        a.volume -= model.count;
        a.income += model.sum; // получаем стоимость
      } else if (model.type === 'dividend') {
        a.dividend += (model.sum - model.tax); // получаем стоимость отдаем налог
      }
      a.date = model.date;
      a.commission += model.commission.reduce((sum, c) => sum + c, 0); // отдаем коммиссию
      const calc = {
        avg: a.avg, // средневзвешенное значение
        volume: a.volume, // количество бумаг
        income: a.income, // доход от продажи
        dividend: a.dividend, // доход от дивидендов
        expense: a.expense, // расход на покупку
        commission: a.commission  // расход на комиссию
      };
      a.trades.push({...model, calc });
      console.log('account', a);
      return items;
    }, {});
  },

  stockPrice : ({stock}) =>
    stock.micex['LAST'] || stock.micex['LCURRENTPRICE'],

  stockPriceChange : ({stock}) =>
    stock.micex['CHANGE'],

  stockPriceChangePercent : ({stock}) =>
    stock.micex['LASTTOPREVPRICE']

};
