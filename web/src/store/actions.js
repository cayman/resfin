import {currentDate} from '../utils';

function getList (snap) {
  return snap.docs.map(item => ({id: item.id, ...item.data()}));
}

function getData (snap) {
  return snap.exists ? {id: snap.id, ...snap.data()} : {};
}

export default {
  fetchSectors: ({commit, getters}) => {
    console.log('fetchSectors');
    return getters.sectors.get()
      .then(sectors => getList(sectors)
        .sort((a,b) => a.code > b.code ? 1 : -1)
      )
      .then(sectors => {
        commit('setSectors', sectors);
        return sectors;
      })
      .catch((error) => {
        console.log('Ошибка получения секторов:', error);
      });
  },

  fetchLinks: ({commit, getters}) => {
    console.log('fetchLinks');
    return getters.links.orderBy('order').get()
      .then(links => getList(links)
        .sort((a,b) => a.order > b.order ? 1 : -1)
      )
      .then(links => {
        commit('setLinks', links);
        return links;
      })
      .catch((error) => {
        console.log('Ошибка получения ссылок:', error);
      });
  },

  fetchAccounts: ({commit, getters}) => {
    console.log('fetchAccounts');
    return getters.accounts.get()
      .then(accounts => getList(accounts)
        .sort((a,b) => a.order > b.order ? 1 : -1)
      )
      .then(accounts => {
        commit('setAccounts', accounts);
        return accounts;
      })
      .catch((error) => {
        console.log('Ошибка получения счетов:', error);
      });
  },

  // Акции
  fetchStocks: ({commit, getters}, code) => {
    console.log('fetchStocks', code);
    const stocks = code === 'f' ? getters.stocks.where('favorite', '==', true)
      : code === 'p' ? getters.stocks.where('portfolio', '==', true)
      : getters.stocks.where('sectorCode', '==', code);
    return stocks.get()
      .then(stocks => getList(stocks)
        .sort((a,b) => a.favorite > b.favorite ? -1: a.favorite < b.favorite ? 1 : a.code > b.code ? 1 : -1)
      )
      .then(stocks => {
        commit('setStocks', stocks);
        return stocks;
      })
      .catch((error) => {
        console.log('Ошибка получения акций:', error);
      });
  },

  fetchStock: ({commit, getters}, id) => {
    console.log('fetchStock:' + id);
    commit('editingStock', false);
    return getters.stocks.doc(id).get()
      .then(stock => getData(stock))
      .then(stock => {
        commit('setStock', stock);
        return  getters.getStock(stock.code);
      })
      .then(data => {
        commit('setStockMicex', data);
        return data;
      })
      .catch((error) => {
        console.log('Ошибка получения акции:', error);
      });
  },

  fetchStockInfo: ({dispatch, commit}, id) => {
    console.log('fetchStockInfo', id);
    commit('editingStock', false);
    dispatch('fetchStock', id);
    dispatch('fetchComments', id);
    commit('setExpandComments', []);
    dispatch('fetchTrades', id);
    commit('setExpandTrades', []);
  },

  newStock: ({commit}, page) =>{
    console.log('newStock in', page);
    commit('editingStock', true);
    commit('setStock', {
      code: null,
      name: null,
      desc: null,
      type: null,
      favorite: page === 'f',
      portfolio: page === 'p',
      sector: null,
      sectorCode: ['p', 'f'].includes(page) ? null : page,
    });
    commit('setStockMicex', {});
    commit('setComments',[]);
    commit('setTrades',[]);
  },

  saveStock: ({getters}, stock) => {
    const id = stock.id || stock.code;
    console.log('saveStock:', id, stock);
    const data = Object.keys(stock)
      .filter(key  => key.startsWith('ref'))
      .reduce((model, key) => ({...model, [key]: stock[key]}),
        { code: stock.code,
          name: stock.name,
          desc: stock.desc,
          type: stock.type,
          favorite: stock.favorite,
          portfolio: stock.portfolio,
          sector: stock.name,
          sectorCode: stock.sectorCode
      });
    return getters.stocks.doc(id).set(data).then(() => id)
      .catch((error) => {
        console.log('Ошибка сохранения акции:', error);
      });
  },

  updateStockFavorite: ({getters}, {id, favorite}) => {
    console.log('updateStockFavorite:', id);
    return getters.stocks.doc(id).update({favorite})
      .then(() => {
        return id;
      })
      .catch((error) => {
        console.log('Ошибка сохранения акции:', error);
      });
  },

  // Комментарии
  fetchComments: ({commit, getters}, stockId) => {
    console.log('fetchComments:' + stockId);
    return getters.comments.where('stock', '==', stockId).get()
      .then(comments => getList(comments)
        .sort((a,b) => a.created > b.created ? -1 : 1)
      )
      .then(comments => {
        commit('setComments', comments);
        return comments;
      })
      .catch((error) => {
        console.log('Ошибка получения комментариев:', error);
      });
  },

  newComment: ({commit}, {stock, price}) =>{
    console.log('newComment for', stock, price);
    commit('editingComment', true);
    commit('setComment', {
      stock,
      title: null,
      text: null,
      source: null,
      price,
      dividend: null,
      created: null,
      updated: null,
    });
  },

  editComment: ({commit}, comment) => {
    console.log('editComment', comment);
    commit('editingComment', true);
    commit('setComment', {...comment});
  },

  saveComment: ({getters}, comment) => {
    console.log('saveComment:', comment);
    const id = comment.id;
    const updated = new Date().getTime();
    const data = {
      stock: comment.stock,
      title: comment.title,
      text: comment.text,
      source: comment.source,
      price: comment.price,
      dividend: comment.dividend,
      created: comment.created || updated,
      updated
    };
    const action = comment.id
      ? getters.comments.doc(id).set(data).then(() => id)
      : getters.comments.add(data).then(ref => ref.id);
    return action
      .catch((error) => {
        console.log('Ошибка сохранения комментария:', error);
      });
  },

  deleteComments: ({getters}, id) => {
    console.log('deleteComments:', id);
    return getters.comments.doc(id).delete()
      .then((ref) => {
        return ref;
      })
      .catch((error) => {
        console.log('Ошибка удаления комментария:', error);
      });
  },


  // Сделки
  fetchTrades: ({commit, getters}, stockId) => {
    console.log('fetchTrades:' + stockId);
    return getters.trades.where('stock', '==', stockId).get()
      .then(trades => getList(trades)
        .sort((a,b) => a.date > b.date ? 1 : a.date < b.date ? -1 : a.created > b.created ? 1 : -1)
      )
      .then(trades => {
        commit('setTrades', trades);
        return trades;
      })
      .catch((error) => {
        console.log('Ошибка получения сделок:', error);
      });
  },

  newTrade: ({commit}, {stock, type, account, date}) => {
    console.log('newTrade for', stock, type, account);
    commit('editingTrade', true);
    commit('setTrade', {
      stock,
      account,
      date: date || new Date(currentDate()),
      type,
      code: null,
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
      stock: trade.stock,
      account: trade.account,
      date: trade.date,
      type: trade.type,
      code: null,
      count: trade.count,
      price: trade.price,
      sum: trade.sum,
      commission: [],
      tax: null
    });
  },

  saveTrade: ({getters}, trade) => {
    console.log('saveTrade:', trade);
    const id = trade.id;
    const isDividend = trade.type === 'dividend';
    const updated = new Date().getTime();
    const data = {
      stock: trade.stock,
      account: trade.account,
      date: trade.date,
      type: trade.type,
      code: trade.code,
      count: trade.count,
      price: trade.price,
      sum: trade.sum,
      commission: !isDividend ? trade.commission : [],
      tax: isDividend ? trade.tax : null,
      created: trade.created || updated,
      updated
    };
    const action = id
      ? getters.trades.doc(id).set(data).then(() => id)
      : getters.trades.add(data).then(ref => ref.id);
    return action
      .catch((error) => {
        console.log('Ошибка сохранения операции:', error);
      });
  },

  deleteTrade: ({getters}, id) => {
    console.log('deleteTrade:', id);
    return getters.trades.doc(id).delete()
      .then((ref) => {
        return ref;
      })
      .catch((error) => {
        console.log('Ошибка удаления операции:', error);
      });
  },

}