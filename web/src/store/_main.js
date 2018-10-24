import {getSnapList, parseError} from '../utils';
import { SECTORS, LINKS, INDICATORS, ACCOUNTS } from '../types';

export default {
  fetchSectors: ({commit, getters}) => {
    console.log('fetchSectors');
    commit('loading', SECTORS);
    return getters.sectors.get()
      .then(sectors => getSnapList(sectors)
        .sort((a,b) => a.code > b.code ? 1 : -1)
      )
      .then(sectors => {
        commit('setSectors', sectors);
        commit('loaded', SECTORS);
        return sectors;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения секторов:', error));
        commit('loaded', SECTORS);
      });
  },

  fetchLinks: ({commit, getters}) => {
    console.log('fetchLinks');
    commit('loading', LINKS);
    return getters.links.orderBy('order').get()
      .then(links => getSnapList(links)
        .sort((a,b) => a.order > b.order ? 1 : -1)
      )
      .then(links => {
        commit('setLinks', links);
        commit('loaded', LINKS);
        return links;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения ссылок:', error));
        commit('loaded', LINKS);
      });
  },

  fetchIndicators: ({commit, getters}) => {
    console.log('fetchIndicators');
    commit('loading', INDICATORS);
    return getters.indicators.orderBy('order').get()
      .then(indicators => getSnapList(indicators)
        .sort((a,b) => a.order > b.order ? 1 : -1)
      )
      .then(indicators => {
        commit('setIndicators', indicators);
        commit('loaded', INDICATORS);
        return indicators;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения индикаторов:', error));
        commit('loaded', INDICATORS);
      });
  },

  fetchAccounts: ({commit, getters}) => {
    console.log('fetchAccounts');
    commit('loading', ACCOUNTS);
    return getters.accounts.get()
      .then(accounts => getSnapList(accounts)
        .sort((a,b) => a.order > b.order ? 1 : -1)
      )
      .then(accounts => {
        commit('setAccounts', accounts);
        commit('loaded', ACCOUNTS);
        return accounts;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения счетов:', error));
        commit('loaded', ACCOUNTS)
      });
  },

}