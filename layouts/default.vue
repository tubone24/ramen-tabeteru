<template>
  <v-app dark>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
    <v-app-bar
      absolute
      color="teal lighten-3"
      dark
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-navigation v-model="bottomNav">
      <v-footer app>
        <span
          >&copy; {{ new Date().getFullYear() }}
          <a
            href="https://portfolio.tubone-project24.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            >tubone24</a
          ></span
        >
      </v-footer>
    </v-bottom-navigation>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
      ],
      title: 'ラーメン食べてる？',
    }
  },
}
</script>
