import moment from 'moment'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()

export const state = () => ({
  userUid: '',
  userName: '',
  userPhotoUrl: '',
})

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  setUserPhotoUrl(state, userPhotoUrl) {
    state.userPhotoUrl = userPhotoUrl
  },
}

export const actions = {
  login({ commit }) {
    console.log('login action')
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user
        // eslint-disable-next-line no-console
        console.log('success : ' + user.uid + ' : ' + user.displayName)
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
        commit('setUserPhotoUrl', user.photoURL.replace('_normal', ''))
      })
      .catch(function (error) {
        const errorCode = error.code
        console.log('error : ' + errorCode)
      })
  },
}

export const getters = {
  getUserUid(state) {
    return state.userUid
  },
  getUserName(state) {
    return state.userName
  },
  getUserPhotoUrl(state) {
    return state.userPhotoUrl
  },
}
