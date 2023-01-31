<template>
  <div
    v-if="getPageReady"
    class="main-body bg-primary vh-100"
    :class="($mq === 'lg' || $mq === 'xl') ? 'desktop' : 'mobile'"
  >
    <loading
      :active.sync="getMainLoading"
      :is-full-page="true"
      background-color="#000"
      color="#fff"
    />
    <Header />
    <Nuxt />
    <Notify />
    <Modal />
    <SideBar />
    <AccountSideBar />
  </div>
  <div v-else class="main-body bg-primary vh-100">
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Notify from '~/components/Notify'
import SideBar from '~/components/SideBar'
import AccountSideBar from '~/components/AccountSideBar'
export default {
  components: { AccountSideBar, SideBar, Notify },
  // middleware: ['siteAccess'],
  data: () => ({
  }),
  computed: {
    ...mapGetters(['getMainLoading', 'getGamePlayStatus', 'getCountryBlackList', 'getPageReady', 'getIP', 'getIpBlackList'])
  },
  async beforeCreate () {
    const geoData = await this.$axios.$get('https://ipinfo.io/json?token=9a50bf62c4b1b0')
    await this.setCountryCode(geoData.country)
    await this.setIP(geoData.ip)
    if ((this.getCountryBlackList !== null && this.getCountryBlackList.includes(geoData.country)) ||
      (this.getIpBlackList !== null && this.getIpBlackList.includes(geoData.ip))) {
      await this.setPageReady(false)
      await this.$router.push(this.localePath('/restriction', this.$i18n.locale))
    } else {
      await this.setPageReady(true)
    }
  },
  async mounted () {
  },
  methods: {
    ...mapActions(['setCountryCode', 'setPageReady', 'setIP']),
    ...mapActions('geolocation', ['getGeoLocation'])
  }
}
</script>
