import {getSnapList, parseError} from '../utils';

export default {

  // Комментарии
  fetchComments: ({commit, getters}, securityCode) => {
    console.log('fetchComments:' + securityCode);
    commit('loading', true);
    return getters.comments.where('securityCode', '==', securityCode).get()
      .then(comments => getSnapList(comments)
        .sort((a,b) => a.created > b.created ? -1 : 1)
      )
      .then(comments => {
        commit('setComments', comments);
        commit('loading', false);
        return comments;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка получения комментариев:', error));
        commit('loading', false);
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
    commit('loading', true);
    const id = comment.id;
    const updated = new Date().getTime();
    const data = {
      securityCode: comment.securityCode,
      title: comment.title || null,
      text: comment.text || null,
      source: comment.source || null,
      price: comment.price,
      interest: comment.interest,
      created: comment.created || updated,
      updated: comment.updated || updated
    };
    const action = comment.id
      ? getters.comments.doc(id).set(data)
      : getters.comments.add(data);
    return action
      .then((ref) => {
        commit('loading', false);
        return id || ref.id;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка сохранения комментария:', error));
        commit('loading', false);
      });
  },

  deleteComments: ({commit, getters}, id) => {
    console.log('deleteComments:', id);
    commit('loading', true);
    return getters.comments.doc(id).delete()
      .then((ref) => {
        commit('loading', false);
        return ref;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка удаления комментария:', error));
        commit('loading', false);
      });
  },

  renameCommentsFields: ({dispatch, commit, getters}) => {
    console.log('renameCommentsFields:');
    commit('loading', true);
    return getters.comments.get()
      .then(comments => getSnapList(comments)
      )
      .then(comments => {
        comments.forEach(comment => {
          dispatch('saveComment',comment);
        });
        return comments;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка переименования комментариев:', error));
        commit('loading', false);
      });
  }

}