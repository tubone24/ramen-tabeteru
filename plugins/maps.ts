import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

export default (context, _) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: context.env.googleMapApiKey,
      libraries: 'places'
    },
    installComponents: true
  })
}
