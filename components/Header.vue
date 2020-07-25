<template>
  <v-card>
    <v-card-title class="headline">
      ラーメン食べてる？
    </v-card-title>
    <v-card-text>
      <p>
        近くのラーメン屋を検索できるLINE BOT ～ラーメン食べたい～ のWebページです。<br />
      </p>
      <hr class="my-3" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="login">
        Twitterでログイン
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    login() {
      console.log('login')
      this.$store.dispatch('login')
    },
  },
}
</script>
