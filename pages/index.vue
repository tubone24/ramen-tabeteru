<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
      </div>
      <Header />
      <v-spacer />
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Header from '~/components/Header.vue'

export default {
  components: {
    Logo,
    Header,
  },
}
</script>
