import {getSnapList, getSnapData, parseError} from '../utils';

export default {
  // Акции
  fetchSecurities: ({commit, getters}, code) => {
    console.log('fetchSecurities', code);
    if (!code) {
      commit('setSecurities', []);
      return [];
    }
    commit('loading', true);
    const securities = code === 'f' ? getters.securities.where('favorite', '>', 1)
      : code === 'p' ? getters.securities.where('portfolio', '==', true)
        : getters.securities.where('sectorCode', '==', code);
    return securities.get()
      .then(securities => getSnapList(securities)
        .sort((a,b) => a.favorite > b.favorite ? -1: a.favorite < b.favorite ? 1 : a.code > b.code ? 1 : -1)
      )
      .then(securities => {
        commit('setSecurities', securities);
        return securities.map(sec => sec.code);
      })
      .then(() => {
        return getters.comments.where('interest', '>=', 0).get()
      })
      .then(comments => getSnapList(comments)
        .sort((a,b) => a.created > b.created ? -1 : 1)
      )
      .then(comments => {
        commit('setSecuritiesComments', comments);
        commit('loading', false);
        return comments;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения ценных бумаг:', error));
        commit('loading', false);
      });
  },

  fetchSecuritiesInfo ({dispatch}, page) {
    return dispatch('fetchSecurities', page)
      .then(securities => {
        if(securities.length) {
          return dispatch('fetchSecurityInfo', securities[0].id);
        }else {
          return dispatch('newSecurity', page);
        }
      });
  },

  fetchSecurity: ({commit, getters}, id) => {
    console.log('fetchSecurity:' + id);
    commit('loading', true);
    commit('editingSecurity', false);
    return getters.securities.doc(id).get()
      .then(security => getSnapData(security))
      .then(security => {
        commit('setSecurity', security);
        return  getters.getSecurity(security.code);
      })
      .then(data => {
        commit('setSecurityMoex', data);
        commit('loading', false);
        return data;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения ценной бумаги:', error));
        commit('loading', false);
      });
  },

  fetchSecurityInfo: ({dispatch, commit}, id) => {
    console.log('fetchSecurityInfo', id);
    commit('editingSecurity', false);
    dispatch('fetchSecurity', id);
    dispatch('fetchComments', id);
    commit('setExpandComments', []);
    dispatch('fetchTrades', id);
    commit('setExpandTrades', []);
  },

  newSecurity: ({commit}, page) =>{
    console.log('newSecurity in', page);
    commit('editingSecurity', true);
    commit('setSecurity', {
      code: null,
      name: null,
      desc: null,
      typeCode: null,
      favorite: page === 'f',
      portfolio: page === 'p',
      sectorName: null,
      sectorCode: ['p', 'f'].includes(page) ? null : page,
    });
    commit('setSecurityMoex', {});
    commit('setComments',[]);
    commit('setTrades',[]);
  },

  saveSecurity: ({commit, getters}, security) => {
    const id = security.id || security.code;
    console.log('saveSecurity:', id, security);
    commit('loading', true);
    const data = Object.keys(security)
      .filter(key  => key.startsWith('ref'))
      .reduce((model, key) => ({...model, [key]: security[key]}),
        { code: security.code,
          name: security.name,
          desc: security.desc,
          typeCode: security.typeCode,
          favorite: security.favorite,
          portfolio: security.portfolio,
          sectorName: security.sectorName,
          sectorCode: security.sectorCode
        });
    return getters.securities.doc(id).set(data)
      .then(() => {
        commit('loading', false);
        return id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка сохранения ценной бумаги:', error));
        commit('loading', false);
      });
  },

  favoriteSecurity: ({commit, getters}, {id, favorite}) => {
    const newFavorite = favorite === 0 ? 5 : favorite === 5 ? 1 : 0;
    console.log('favoriteSecurity:', id, favorite, newFavorite);
    commit('loading', true);
    return getters.securities.doc(id).update({favorite: newFavorite})
      .then(() => {
        commit('loading', false);
        return id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка изменения ценной бумаги:', error));
        commit('loading', false);
      });
  },

  renameSecuritiesFields: ({dispatch, commit, getters}) => {
    console.log('renameSecuritiesFields:');
    commit('loading', true);
    return getters.securities.get()
      .then(securities => getSnapList(securities)
      )
      .then(securities => {
        securities.forEach(trade => {
          dispatch('saveSecurity',trade);
        });
        return securities;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка переименования ценных бумаг:', error));
        commit('loading', false);
      });
  }

}