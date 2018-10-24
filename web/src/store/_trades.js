import {currentDate, getSnapList, parseError} from '../utils';
import { TRADE, TRADES } from '../types';

export default {
  // Получение списка сделок по инструменту
  fetchTrades: ({commit, getters}, securityCode) => {
    console.log('fetchTrades:' + securityCode);
    commit('loading', TRADES);
    return getters.trades.where('securityCode', '==', securityCode).get()
      .then(trades => getSnapList(trades)
        .sort((a,b) => a.date > b.date ? 1 : a.date < b.date ? -1 : a.created > b.created ? 1 : -1)
      )
      .then(trades => {
        commit('setTrades', trades);
        commit('loaded', TRADES);
        return trades;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения сделок:', error));
        commit('loaded', TRADES);
      });
  },

  newTrade: ({commit}, {securityCode, typeCode, accountCode, date}) => {
    console.log('newTrade for', securityCode, typeCode, accountCode);
    commit('editingTrade', true);
    commit('setTrade', {
      code: null,
      securityCode,
      accountCode,
      typeCode,
      date: date || new Date(currentDate()),
      count: null,
      price: null,
      sum: null,
      commission: [],
      tax: null
    });
  },

  editTrade: ({commit}, trade) => {
    console.log('editTrade', trade);
    commit('editingTrade', true);
    commit('setTrade', {...trade});
  },

  copyTrade: ({commit}, trade) => {
    console.log('copyTrade', trade);
    commit('editingTrade', true);
    commit('setTrade', {
      code: null,
      securityCode: trade.securityCode,
      accountCode: trade.accountCode,
      typeCode: trade.typeCode,
      date: trade.date,
      count: trade.count,
      price: trade.price,
      sum: trade.sum,
      commission: [],
      tax: null
    });
  },

  // Сохранение объекта
  saveTrade: ({getters, commit}, trade) => {
    console.log('saveTrade:', trade);
    commit('loading', TRADE);
    commit('loading', TRADES);
    const id = trade.id;
    const isDividend = trade.typeCode === 'dividend';
    const updated = new Date().getTime();
    const data = {
      code: trade.code || '--',
      securityCode: trade.securityCode,
      accountCode: trade.accountCode,
      typeCode: trade.typeCode,
      date: trade.date,
      count: trade.count,
      price: trade.price,
      sum: trade.sum,
      commission: !isDividend ? trade.commission : [],
      tax: isDividend ? trade.tax : null,
      created: trade.created || updated,
      updated: trade.updated || updated
    };
    const action = id
      ? getters.trades.doc(id).set(data)
      : getters.trades.add(data);
    return action
      .then((ref) => {
        commit('loaded', TRADE);
        commit('loaded', TRADES);
        return id || ref.id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка сохранения операции:', error));
        commit('loaded', TRADE);
        commit('loaded', TRADES);
      });
  },

  // Удаление объекта
  deleteTrade: ({getters, commit}, id) => {
    console.log('deleteTrade:', id);
    commit('loading', TRADES);
    return getters.trades.doc(id).delete()
      .then((ref) => {
        commit('loaded', TRADES);
        return ref;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка удаления операции:', error));
        commit('loaded', TRADES);
      });
  },

  renameTradesFields: ({dispatch, commit, getters}) => {
    console.log('renameTradesFields:');
    commit('loading', true);
    return getters.trades.get()
      .then(trades => getSnapList(trades)
      )
      .then(trades => {
        trades.forEach(trade => {
          dispatch('saveTrade',trade);
        });
        return trades;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка переименования сделок:', error));
        commit('loading', false);
      });
  }
}