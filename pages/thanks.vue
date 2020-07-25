<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
      </div>
      <Header-thanks />
      <v-spacer />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="goToHome">
          ホームに戻る
        </v-btn>
      </v-card-actions>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import HeaderThanks from '~/components/HeaderThanks.vue'

export default {
  components: {
    Logo,
    HeaderThanks,
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>
