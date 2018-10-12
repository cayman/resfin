import Vue from 'vue';
import {parseValue, setAppStorageItem} from '../utils';

export default {

  loading: (state, loading) => {
    state.loading = loading;
  },

  setMessage: (state, message) => {
    state.message = message;
  },

  setUser: (state, user) => {
    state.user = user;
    setAppStorageItem('user', state.user);
  },

  setLinks: (state, list) => {
    Vue.set(state.links, 'list', list);
  },
  setSectors: (state, list) => {
    Vue.set(state.sectors, 'list', list);
  },
  setIndicators: (state, list) => {
    Vue.set(state.indicators, 'list', list);
  },
  setAccounts: (state, list) => {
    Vue.set(state.accounts, 'list', list);
  },
  setPage: (state, page) => {
    state.page = page;
    setAppStorageItem('page', page);
  },

  // Акции
  setSecurities: (state, list) => {
    Vue.set(state.securities, 'list', list);
  },
  setSecuritiesComments: (state, list) => {
    Vue.set(state.securities, 'comments', list);
  },
  updateSecuritiesComments: (state, {code, list}) => {
    state.securities.comments = state.securities.comments
      .filter(com => com.securityCode !== code).concat(list);
  },
  setSecurity: (state, model) => {
    Vue.set(state.security, 'model', model);
  },
  setSecurityMoex: (state, moex) => {
    const data = moex.data && moex.data[0] ? moex.columns.reduce((data, column, index) => {
      data[column] = moex.data[0][index];
      return data;
    },{}) :  {};
    Vue.set(state.security, 'moex', data);
  },
  editingSecurity: (state, editing) => {
    state.security.editing = editing;
  },
  setSecurityField: (state, {name, value, type}) => {
    const val = parseValue(value, type);
    console.log('parsed:', name, value, '=>', val, typeof val);
    Vue.set(state.security.model, name, val);
  },

  // Комментарии
  setComments: (state, list) => {
    Vue.set(state.comments, 'list', list);
  },
  toggleExpandComment: (state, id) => {
    const index = state.comments.expanded.indexOf(id);
    if (index < 0) {
      state.comments.expanded.push(id)
    } else {
      state.comments.expanded.splice(index, 1);
    }
  },
  setExpandComments: (state, expanded) => {
    state.comments.expanded = expanded;
  },

  // Комментарий
  setComment: (state, model) => {
    Vue.set(state.comment, 'model', model);
  },
  editingComment: (state, editing) => {
    state.comment.editing = editing;
  },
  setCommentField: (state, {name, value, type}) => {
    const val = parseValue(value, type);
    console.log('parsed:', name, value, '=>', val, typeof val);
    Vue.set(state.comment.model, name, val);
  },
  spliceCommentField: (state, {name, index, value, type}) => {
    const val = parseValue(value, type);
    console.log('parsed:', name, value, '=>', val, typeof val);
    const list = state.comment.model[name] || [];
    list.splice(index, 1, val);
    Vue.set(state.comment.model, name, list);
  },

  // Сделки
  setTrades: (state, list) => {
    Vue.set(state.trades, 'list', list);
  },
  setExpandTrades: (state, expanded = []) => {
    Vue.set(state.trades, 'expanded', expanded);
  },
  toggleExpandTrade: (state, id) => {
    const index = state.trades.expanded.indexOf(id);
    if (index < 0) {
      state.trades.expanded.push(id)
    } else {
      state.trades.expanded.splice(index, 1);
    }
  },

  // Сделка
  setTrade: (state, model) => {
    Vue.set(state.trade, 'model', model);
  },
  updateTrade: (state, model) => {
    Object.assign(state.trade.model, model);
  },
  editingTrade: (state, editing) => {
    state.trade.editing = editing;
  },
  setTradeField: (state, {name, value, type}) => {
    const val = parseValue(value, type);
    console.log('parsed:', name, value, '=>', val, typeof val);
    Vue.set(state.trade.model, name, val);
  },
  spliceTradeField: (state, {name, index, value, type}) => {
    const val = parseValue(value, type);
    console.log('parsed:', name, value, '=>', val, typeof val);
    const list = state.trade.model[name] || [];
    list.splice(index, 1, val);
    Vue.set(state.trade.model, name, list);
  },

};
