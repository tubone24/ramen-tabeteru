<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <h2>{{ $route.query.shopName }}</h2>
        <GmapMap
          :center="position"
          :zoom="15"
          map-type-id="terrain"
          style="width: auto; height: 300px;"
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
            v-model="starSelect"
            :items="items"
            :rules="[(v) => !!v || 'Item is required']"
            label="星いくつ？"
            required
          ></v-select>
          <v-textarea
            counter
            v-model="ramenText"
            label="ラーメン評論"
            :rules="textAreaRule"
            :value="textSample"
          ></v-textarea>
          <v-file-input
            @change="uploadFile"
            :rules="imageRules"
            accept="image/*"
            placeholder="ラーメン画像を上げてね！"
            prepend-icon="mdi-camera"
            label="ラーメン画像"
          ></v-file-input>
        </v-form>
<!--        <v-btn color="primary" @click="login">-->
<!--          Twitterでログイン-->
<!--        </v-btn>-->
        <v-btn color="primary" @click="add">
          投稿する
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
      imageRules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
      ],
      textSample: '評論家になったつもりで感想を書いてみよう！',
      ramenText: '',
      latitude: 0,
      longitude: 0,
      position: {},
      lineUserId: '',
      shopId: '',
      shopName: '',
      starSelect: '',
      imageUrl: '',
      // twitterUserId: '',
      // twitterUserName: '',
      // twitterUserPhotoUrl: '',
      // isLogin: false,
    }
  },
  beforeMount() {
    this.latitude = parseFloat(this.$route.query.lat)
    this.longitude = parseFloat(this.$route.query.lon)
    this.position = { lat: this.latitude, lng: this.longitude }
    this.lineUserId = this.$route.query.uid
    this.lineUserName = this.$route.query.un
    this.lineUserPhoto = this.$route.query.up
    this.shopId = this.$route.query.sid
    this.shopName = this.$route.query.sn
  },
  methods: {
    login() {
      console.log('login')
      const provider = new firebase.auth.TwitterAuthProvider()
      const that = this
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function (result) {
          const user = result.user
          // eslint-disable-next-line no-console
          console.log('success : ' + user.uid + ' : ' + user.displayName)
          that.twitterUserId = user.uid
          that.twitterUserName = user.displayName
          that.twitterUserPhotoUrl = user.photoURL.replace('_normal', '')
          that.isLogin = true
        })
        .catch(function (error) {
          const errorCode = error.code
          console.log(error)
          console.log('error : ' + errorCode)
        })
    },
    uploadFile(e) {
      const updateDateTime = moment().format('YYYYMMDDhhmmss')
      const that = this
      const storage = firebase.storage()
      const storageRef = storage.ref()
      const uploadTask = storageRef
        .child(`images/${that.lineUserId}/${updateDateTime}${e.name}`)
        .put(e)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log('snapshot', snapshot)
        },
        (error) => {
          console.log('err', error)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL)
            that.imageUrl = downloadURL
          })
        }
      )
    },
    add() {
      const db = firebase.firestore()
      const ramensRef = db.collection('ramens')
      const updateDateTime = moment().format('YYYY-MM-DD hh:mm:ss')
      const that = this
      ramensRef
        .add({
          lineUserId: that.lineUserId,
          lineUserName: that.lineUserName,
          lineUserPhoto: that.lineUserPhoto,
          shopId: that.shopId,
          shopName: that.shopName,
          updateDateTime,
          ramenText: that.ramenText,
          latitude: that.latitude,
          longitude: that.longitude,
          starSelect: that.starSelect,
          imageUrl: that.imageUrl,
        })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
          that.$router.push('/thanks')
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    }
  },
}
</script>
