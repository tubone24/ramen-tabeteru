<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <h2>{{ $route.query.shopName }}</h2>
        <GmapMap
          :center="position"
          :zoom="15"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        >
          <GmapMarker
            :position="position"
            :clickable="true"
            :draggable="true"
            @click="center=position"
          />
        </GmapMap>
        <v-form ref="form">
          <v-select
            v-model="select"
            :items="items"
            :rules="[(v) => !!v || 'Item is required']"
            label="星いくつ？"
            required
          ></v-select>
          <v-textarea
            counter
            label="ラーメン評論"
            :rules="textAreaRule"
            :value="textValue"
          ></v-textarea>
        </v-form>
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
      items: ['1', '2', '3', '4', '5'],
      textAreaRule: [(v) => v.length <= 2000 || 'Max 2000 characters'],
      textValue: '評論家になったつもりで感想を書いてみよう！',
      latitude: 0,
      longitude: 0,
      position: {},
    }
  },
  beforeMount() {
    this.latitude = parseFloat(this.$route.query.lat)
    this.longitude = parseFloat(this.$route.query.lon)
    this.position = { lat: this.latitude, lng: this.longitude }
    console.log(this.position)
  },
  methods: {
    add() {
      console.log('login')
      const lineUserId = this.$route.query.userId
      const shopId = this.$route.query.shopId
      const shopName = this.$route.query.shopName
      const latitude = this.latitude
      const longitude = this.longitude
      const textValue = this.textValue
      const router = this.$router
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
              ramenText: textValue,
              latitude,
              longitude,
            })
            .then(function (docRef) {
              console.log('Document written with ID: ', docRef.id)
              router.push('/thanks')
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
