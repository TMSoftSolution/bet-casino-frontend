<template>
  <div />
</template>

<script>
export default {
  mounted () {
    let trackingInfo = ''
    if (this.$route.query.code) {
      trackingInfo = `?code=${this.$route.query.code}`
    }
    this.$router.push(this.localePath('/online-casino' + trackingInfo, this.$i18n.locale))
  }
}
</script>
