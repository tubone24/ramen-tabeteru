<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <p>{{ $route.query.shopId }}</p>
        <p>{{ $route.query.shopName }}</p>
        <v-btn color="primary" @click="add">
          Twitterでログインして投稿
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      query: '',
    }
  },
  methods: {
    add() {
      console.log('login')
      const lineUserId = this.$route.query.userId
      const shopId = this.$route.query.shopId
      const shopName =  this.$route.query.shopName
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          const user = result.user
          // eslint-disable-next-line no-console
          console.log('success : ' + user.uid + ' : ' + user.displayName)
          const db = firebase.firestore()
          const ramensRef = db.collection('ramens')
          const updateDateTime = moment().format('YYYY-MM-DD hh:mm:ss')
          ramensRef
            .add({
              lineUserId,
              twitterUserId: user.uid,
              twitterUserName: user.displayName,
              twitterUserPhotoUrl: user.photoURL.replace('_normal', ''),
              shopId,
              shopName,
              updateDateTime,
            })
            .then(function (docRef) {
              console.log('Document written with ID: ', docRef.id)
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        })
        .catch(function (error) {
          const errorCode = error.code
          console.log(error)
          console.log('error : ' + errorCode)
        })
    },
  },
}
</script>
