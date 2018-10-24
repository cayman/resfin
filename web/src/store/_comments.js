import {getSnapList, parseError} from '../utils';
import { COMMENT, COMMENTS, SECURITIES } from '../types';

export default {

  // Комментарии
  fetchComments: ({commit, getters}, securityCode) => {
    console.log('fetchComments:' + securityCode);
    commit('loading', COMMENTS);
    return getters.comments.where('securityCode', '==', securityCode).get()
      .then(comments => getSnapList(comments)
        .sort((a,b) => a.created > b.created ? -1 : 1)
      )
      .then(comments => {
        commit('setComments', comments);
        commit('loaded', COMMENTS);
        return comments;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения комментариев:', error));
        commit('loaded', COMMENTS);
      });
  },

  fetchSecuritiesComments: ({commit, getters}, codes) => {
    console.log('fetchSecuritiesComments:', codes);
    commit('loading', SECURITIES);
    return getters.comments.get()
      .then(comments => getSnapList(comments)
        .filter(comment => !codes || codes.includes(comment.securityCode))
        .sort((a,b) => a.created > b.created ? -1 : 1)
      )
      .then(comments => {
        commit('setSecuritiesComments', comments);
        commit('loaded', SECURITIES);
        return comments;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения комментариев:', error));
        commit('loaded', SECURITIES);
      });
    },

  newComment: ({commit}, {securityCode, price}) =>{
    console.log('newComment for', securityCode, price);
    commit('editingComment', true);
    commit('setComment', {
      securityCode,
      title: null,
      text: null,
      source: null,
      price,
      interest: null,
      indicators: [],
      created: null,
      updated: null,
    });
  },

  editComment: ({commit}, comment) => {
    console.log('editComment', comment);
    commit('editingComment', true);
    commit('setComment', {...comment});
  },

  saveComment: ({commit, getters}, comment) => {
    console.log('saveComment:', comment);
    commit('loading', COMMENT);
    commit('loading', COMMENTS);
    const id = comment.id;
    const updated = new Date().getTime();
    const data = {
      securityCode: comment.securityCode,
      title: comment.title || null,
      text: comment.text || null,
      source: comment.source || null,
      price: comment.price || null,
      interest: comment.interest || null,
      indicators: comment.indicators || null,
      created: comment.created || updated,
      updated: comment.updated || updated
    };
    const action = comment.id
      ? getters.comments.doc(id).set(data)
      : getters.comments.add(data);
    return action
      .then((ref) => {
        commit('loaded', COMMENT);
        commit('loaded', COMMENTS);
        return id || ref.id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка сохранения комментария:', error));
        commit('loaded', COMMENT);
        commit('loaded', COMMENTS);
      });
  },

  deleteComments: ({commit, getters}, id) => {
    console.log('deleteComments:', id);
    commit('loading', COMMENTS);
    return getters.comments.doc(id).delete()
      .then((ref) => {
        commit('loaded', COMMENTS);
        return ref;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка удаления комментария:', error));
        commit('loaded', COMMENTS);
      });
  },

  renameCommentsFields: ({dispatch, commit, getters}) => {
    console.log('renameCommentsFields:');
    commit('loading', COMMENTS);
    return getters.comments.get()
      .then(comments => getSnapList(comments)
      )
      .then(comments => {
        comments.forEach(comment => {
          dispatch('saveComment',comment);
        });
        commit('loaded', COMMENTS);
        return comments;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка переименования комментариев:', error));
        commit('loaded', COMMENTS);
      });
  }

}