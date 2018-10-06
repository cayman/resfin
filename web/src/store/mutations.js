import Vue from 'vue';

export default {
  setLinks: (state, list) => {
    Vue.set(state.links, 'list', list);
  },
  setSectors: (state, list) => {
    Vue.set(state.sectors, 'list', list);
  },
  setAccounts: (state, list) => {
    Vue.set(state.accounts, 'list', list);
  },
  setPage: (state, page) => {
    state.page = page;
    localStorage.setItem('page', page);
  },

  // Акции
  setStocks: (state, list) => {
    Vue.set(state.stocks, 'list', list);
  },
  setStock: (state, model) => {
    Vue.set(state.stock, 'model', model);
  },
  setStockMicex: (state, micex) => {
    const data = micex.data && micex.data[0] ? micex.columns.reduce((data, column, index) => {
      data[column] = micex.data[0][index];
      return data;
    },{}) :  {};
    Vue.set(state.stock, 'micex', data);
  },
  editingStock: (state, editing) => {
    state.stock.editing = editing;
  },
  setStockField: (state, {name, value}) => {
    Vue.set(state.stock.model, name, value);
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
  setCommentField: (state, {name, value}) => {
    Vue.set(state.comment.model, name, value);
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
  setTradeField: (state, {name, value}) => {
    Vue.set(state.trade.model, name, value);
  },

};
