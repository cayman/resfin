import {getSnapList, parseError} from '../utils';

export default {
  fetchSectors: ({commit, getters}) => {
    console.log('fetchSectors');
    commit('loading', true);
    return getters.sectors.get()
      .then(sectors => getSnapList(sectors)
        .sort((a,b) => a.code > b.code ? 1 : -1)
      )
      .then(sectors => {
        commit('setSectors', sectors);
        commit('loading', false);
        return sectors;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения секторов:', error));
        commit('loading', false);
      });
  },

  fetchLinks: ({commit, getters}) => {
    console.log('fetchLinks');
    commit('loading', true);
    return getters.links.orderBy('order').get()
      .then(links => getSnapList(links)
        .sort((a,b) => a.order > b.order ? 1 : -1)
      )
      .then(links => {
        commit('setLinks', links);
        commit('loading', false);
        return links;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения ссылок:', error));
        commit('loading', false);
      });
  },

  fetchIndicators: ({commit, getters}) => {
    console.log('fetchIndicators');
    commit('loading', true);
    return getters.indicators.orderBy('order').get()
      .then(indicators => getSnapList(indicators)
        .sort((a,b) => a.order > b.order ? 1 : -1)
      )
      .then(indicators => {
        commit('setIndicators', indicators);
        commit('loading', false);
        return indicators;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения индикаторов:', error));
        commit('loading', false);
      });
  },

  fetchAccounts: ({commit, getters}) => {
    console.log('fetchAccounts');
    commit('loading', true);
    return getters.accounts.get()
      .then(accounts => getSnapList(accounts)
        .sort((a,b) => a.order > b.order ? 1 : -1)
      )
      .then(accounts => {
        commit('setAccounts', accounts);
        commit('loading', false);
        return accounts;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения счетов:', error));
        commit('loading', false);
      });
  },

}