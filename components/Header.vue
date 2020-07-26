<template>
  <v-card>
    <v-card-title class="headline">
      ラーメン食べてる？
    </v-card-title>
    <v-card-text>
      <p>
        近くのラーメン屋を検索できるLINE BOT<br />
        <b>ラーメン食べたい</b>のWebページです。<br />
        下記のボタンからLINEBOTをフォローしよう！
      </p>
      <hr class="my-3" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <a href="https://lin.ee/Y9mUrIN"
        ><img
          src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
          alt="友だち追加"
          height="36"
          border="0"
      /></a>
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
