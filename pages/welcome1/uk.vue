<template>
  <div class="main-container bg-primary" :class="($mq==='xl' || $mq==='lg') ? 'desktop' : 'mobile'">
    <b-img :src="welcomeImage('uk')" class="w-100 h-100" @click="clickWelcome" style="cursor: pointer"/>
    <Footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import common from '~/mixins/common'

export default {
  mixins: [common],
  data: () => ({
  }),
  computed: {
    ...mapGetters(['loggedIn', 'loggedUser', 'getCountryCode'])
  },
  created () {
  },
  mounted () {
  },
  methods: {
    welcomeImage (locale) {
      return `/welcome1/${locale}.png`
    },
    clickWelcome () {
      if (this.loggedIn && this.loggedUser) {
        this.$nuxt.$emit('deposit-action')
      } else {
        this.$nuxt.$emit('login-action')
      }
    }
  }
}
</script>
