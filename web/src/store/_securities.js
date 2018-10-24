import { getSnapList, getSnapData, parseError } from '../utils';
import { SECURITY, SECURITIES } from '../types';

export default {
  // Акции
  fetchSecurities: ({commit, getters}, code) => {
    console.log('fetchSecurities', code);
    if (!code) {
      commit('setSecurities', []);
      return [];
    }
    commit('loading', SECURITIES);
    const securities = code === 'f' ? getters.securities.where('favorite', '>', 1)
      : code === 'p' ? getters.securities.where('portfolio', '==', true)
        : getters.securities.where('sectorCode', '==', code);
    return securities.get()
      .then(securities => getSnapList(securities)
        .sort((a,b) => a.favorite > b.favorite ? -1: a.favorite < b.favorite ? 1 : a.code > b.code ? 1 : -1)
      )
      .then(securities => {
        commit('setSecurities', securities);
        commit('loaded', SECURITIES);
        return securities;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения ценных бумаг:', error));
        commit('loaded', SECURITIES);
      });
  },

  fetchSecurity: ({commit, getters, state}, id) => {
    console.log('fetchSecurity:' + id);
    commit('loading', SECURITY);
    commit('editingSecurity', false);
    return getters.securities.doc(id).get()
      .then(security => getSnapData(security))
      .then(security => {
        commit('setSecurity', security);
        return getters.getSecurityMoex(security.code);
      })
      .then(data => {
        commit('setSecurityMoex', data);
        commit('loaded', SECURITY);
        return state.security.model;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения ценной бумаги:', error));
        commit('loaded', SECURITY);
      });
  },

  fetchSecurityInfo: ({dispatch, commit}, id) => {
    console.log('fetchSecurityInfo', id);
    commit('editingSecurity', false);
    return dispatch('fetchSecurity', id)
      .then(security => {
        commit('setExpandTrades', []);
        commit('setExpandComments', []);
        dispatch('fetchTrades', security.code);
        return dispatch('fetchComments', security.code);
      });
  },

  newSecurity: ({commit, state}, page) =>{
    console.log('newSecurity in', page);
    commit('editingSecurity', true);
    commit('setSecurity', {
      code: null,
      name: null,
      desc: null,
      typeCode: null,
      favorite: page === 'f',
      portfolio: page === 'p',
      sectorName: state.sectors.list
        .filter(sector => sector.code === page).map(sector => sector.name)[0],
      sectorCode: ['p', 'f'].includes(page) ? null : page,
    });
    commit('setSecurityMoex', {});
    commit('setComments',[]);
    commit('setTrades',[]);
  },

  saveSecurity: ({commit, getters}, security) => {
    const id = security.id || security.code.toUpperCase();
    console.log('saveSecurity:', id, security);
    commit('loading', SECURITY);
    commit('loading', SECURITIES);
    const data = Object.keys(security)
      .filter(key  => key.startsWith('ref'))
      .reduce((model, key) => ({...model, [key]: security[key]}),
        { code: security.code.toUpperCase(),
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
        commit('loaded', SECURITY);
        commit('loaded', SECURITIES);
        return id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка сохранения ценной бумаги:', error));
        commit('loaded', SECURITY);
        commit('loaded', SECURITIES);
      });
  },

  favoriteSecurity: ({commit, getters}, {id, favorite}) => {
    const newFavorite = favorite === 0 ? 5 : favorite === 5 ? 1 : 0;
    console.log('favoriteSecurity:', id, favorite, newFavorite);
    commit('loading', SECURITIES);
    return getters.securities.doc(id).update({favorite: newFavorite})
      .then(() => {
        commit('loaded', SECURITIES);
        return id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка изменения ценной бумаги:', error));
        commit('loaded', SECURITIES);
      });
  },

  renameSecuritiesFields: ({dispatch, commit, getters}) => {
    console.log('renameSecuritiesFields:');
    commit('loading', SECURITIES);
    return getters.securities.get()
      .then(securities => getSnapList(securities)
      )
      .then(securities => {
        securities.forEach(trade => {
          dispatch('saveSecurity',trade);
        });
        commit('loaded', SECURITIES);
        return securities;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка переименования ценных бумаг:', error));
        commit('loaded', SECURITIES);
      });
  }

}