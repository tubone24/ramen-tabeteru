<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h2>
        {{ displayName || ramenData[0].lineUserName }}さんのラーメンライフログ
      </h2>
      <h3>
        ふたつな: <b>{{ secondName }}</b>
      </h3>
      <GmapMap
        :center="{ lat: 37.057372, lng: 139.327271 }"
        :zoom="6"
        map-type-id="terrain"
        style="width: auto; height: 300px;"
      >
        <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="toggleInfoWindow(m)"
        />
        <GmapInfoWindow
          v-for="(m, index) in markers"
          :key="index"
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
          style="color: black;"
        >
          {{ m.text }}</GmapInfoWindow
        >
      </GmapMap>
      <v-timeline>
        <v-timeline-item
          v-for="(ramen, i) in ramenData"
          :key="i"
          :icon="icon ? 'mdi-star' : ''"
        >
          <v-avatar>
            <img :src="ramen.lineUserPhoto" />
          </v-avatar>
          <span slot="opposite">{{ ramen.updateDateTime }}</span>
          <v-card class="elevation-2">
            <v-card-title class="headline">{{ ramen.shopName }}</v-card-title>
            <v-card-text>
              {{ ramen.ramenText }}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      ramenData: [
        // {
        //   lineUserName: '名無し',
        //   lineUserPhoto: '',
        //   updateDateTime: '1900-01-01',
        //   shopName: '名無しショップ',
        //   ramenText: 'うまい',
        // },
      ],
      markers: [],
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
      lineUserId: '',
      displayName: '',
      secondName: '',
      profileText: '',
    }
  },
  beforeCreate() {
    this.lineUserId = this.$route.query.uid
    const that = this
    const ramenData = []
    const db = firebase.firestore()
    const ramensRef = db.collection('ramens')
    const userDoc = db.collection('users').doc(this.lineUserId)
    ramensRef
      .where('lineUserId', '==', that.lineUserId)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          console.log('success : ' + `${doc.id} => ${doc.data()}`)
          const data = doc.data()
          ramenData.push(data)
        })
        that.ramenData = ramenData
        console.log(that.ramenData)
        that.markers = ramenData.map((item) => {
          return {
            position: { lat: item.latitude, lng: item.longitude },
            text: item.shopName,
          }
        })
        userDoc.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data()
            console.log(data)
            that.displayName = data.displayName
            that.profileText = data.profileText
            that.secondName = data.secondName
          }
        })
      })
  },
  methods: {
    toggleInfoWindow(marker) {
      this.infoWindowPos = marker.position
      this.infoWinOpen = true
    },
  },
}
</script>
<style>
.gm-style.gm-style-iw {
  color: black;
}
</style>
