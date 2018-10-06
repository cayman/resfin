import {parseError} from "../utils";
import {auth} from "./firebase";

export default {
  signIn: ({commit}, {email, password}) => {
    console.log('signIn:' + email);
    commit('loading', true);
    return auth.signInWithEmailAndPassword(email, password)
      .then(ref => {
        console.log('success:', ref.user );
        return {
          id: ref.user.uid,
          email: ref.user.email,
          name: ref.user.displayName,
          photoURL: ref.user.photoURL,
          metadata: ref.user.metadata
        };
      })
      .then(user => {
        console.log('success:', );
        commit('setUser', user);
        commit('loading', false);
        return user;
      })
      .catch((error) => {
        commit('setMessage', parseError('Ошибка авторизации:', error));
        commit('loading', false);
        return null;
      });
  },

  authenticated: ({state, dispatch}) => {
    dispatch('fetchLinks');
    dispatch('fetchSectors');
    return dispatch('fetchAccounts')
      .then(() => {
          return dispatch('fetchSecuritiesInfo', state.page);
      });
  }
}

// user: Q
// G: []
// I: true
// N: [ƒ]
// O: []
// Qb: Q {G: Array(0), m: "AIzaSyAhE-1NGBa_p1cXwtc6F7vvrLVm9lGq2Lc", o: "[DEFAULT]", u: "finbar-fa91b.firebaseapp.com", b: Ch, …}
// Ua: null
// V: ƒ ()
// W: Xl {m: false, settings: Mk, app: FirebaseAppImpl, b: Ch, N: Array(0), …}
// X: Xl {m: false, settings: Mk, app: FirebaseAppImpl, b: Ch, N: Array(0), …}
// a: tk {u: "finbar-fa91b.firebaseapp.com", l: "AIzaSyAhE-1NGBa_p1cXwtc6F7vvrLVm9lGq2Lc", m: "[DEFAULT]", h: Array(2), f: false, …}
// b: Ch {b: "AIzaSyAhE-1NGBa_p1cXwtc6F7vvrLVm9lGq2Lc", i: "https://securetoken.googleapis.com/v1/token", l: Be, f: {…}, g: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/", …}
// ba: Kl {a: "AIzaSyAhE-1NGBa_p1cXwtc6F7vvrLVm9lGq2Lc:[DEFAULT]", b: Fj}
// displayName: null
// email: "zakirovrr@gmail.com"
// emailVerified: false
// h: Tk {f: Ch, a: "AEXAG-fPxqFeWTZqslQ9nv1tFZE6aEclBmgv-7XO2AVeRzSS2o…ApiwW3CS3XHaJS4f9END6vPFTmGUSI7QK4e3-BClWACUbSByQ", b: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2OThjZmNlMTgzNWZjND…9WGg0ZYCb5IxsK9LvEjfC_yqg7PMmnceFERGh7_lBjgCZLTsg", c: 1538861844576}
// i: null
// isAnonymous: false
// ja: undefined
// ka: null
// l: lc {src: Q, a: {…}, b: 3}
// m: "AIzaSyAhE-1NGBa_p1cXwtc6F7vvrLVm9lGq2Lc"
// metadata: Yk {a: "1538828023000", b: "1538858244000", lastSignInTime: "Sat, 06 Oct 2018 20:37:24 GMT", creationTime: "Sat, 06 Oct 2018 12:13:43 GMT"}
// o: "[DEFAULT]"
// pa: false
// phoneNumber: null
// photoURL: null
// providerData: [$k]
// qa: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2OThjZmNlMTgzNWZjNDZmNWVhZWZjOGJmOTMwNjk0OGQ2OTFmMGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmluYmFyLWZhOTFiIiwiYXVkIjoiZmluYmFyLWZhOTFiIiwiYXV0aF90aW1lIjoxNTM4ODU3OTEzLCJ1c2VyX2lkIjoiWGZNZjRoTk8wTVBiZmV4QUJFT3pibGpKQWJWMiIsInN1YiI6IlhmTWY0aE5PME1QYmZleEFCRU96YmxqSkFiVjIiLCJpYXQiOjE1Mzg4NTc5MTMsImV4cCI6MTUzODg2MTUxMywiZW1haWwiOiJ6YWtpcm92cnJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInpha2lyb3ZyckBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.GDoAaUBp2tijiClake7MUbe9qycVtiX58UOcUBTCLD8Wx4I9IOVmjue6_2pOtz9Mslhfbp-OvR3o0uYzifFwb1stGrzlL0CUU8St_LDeli3VU-nRXcjc3Lep-zJTMvKLwcrzMfB45qO3Hr7F8MmPtjfKbfvfb4qFdiUEEj1hkDW4fylVRzPHOScaxt4v8gBt-YK1MzdQPWDXii7KlY1XIJQP3ctDghy5diWb-D_qOwT_qdBi40DOxwVEjBukcFXOoK-Qt_luyPHA9mJ7HpXMNAY0KAXrl20g0OIghBepO9oDGQAzYTzeoBNs_Bk2j2SasONK3n-MvPiMDXlW_kDSnw"
// ra: ƒ (a)
// refreshToken: "AEXAG-fPxqFeWTZqslQ9nv1tFZE6aEclBmgv-7XO2AVeRzSS2osk4bl_cXbyZwl9-NKit9uC_UEHtchN6bNf2L6TcLnp0pt6ld58Ao7nR913c-IJlvU66NOgFx-ehRYFworh7VraZND4LHiA_tfF0SnMaCIpnsI8XYdaV17q9RVSYN1eWApiwW3CS3XHaJS4f9END6vPFTmGUSI7QK4e3-BClWACUbSByQ"
// sa: ƒ (a)
// u: "finbar-fa91b.firebaseapp.com"
// uid: "XfMf4hNO0MPbfexABEOzbljJAbV2"
// w: Qk {h: ƒ, i: ƒ, g: ƒ, c: 30000, f: 960000, …}