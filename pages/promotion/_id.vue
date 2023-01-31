<template>
  <div class="main-container bg-primary m-2" :class="($mq==='xl' || $mq==='lg') ? 'desktop' : 'mobile'">
    <b-container class="promotion-container">
      <b-row class="p-2 border-primary border-bottom">
        <b-col cols="12" class="d-flex justify-content-between">
          <h3 class="text-secondary font-weight-bold mb-0">
            {{ promotionData.title }}
          </h3>
          <b-button
            pill
            size="sm"
            variant="secondary text-dark"
            class="orange-btn"
            @click="backPromotionAction"
          >
            {{ $t('back_promotion') }}
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="12"
          class="p-3"
        >
          <b-card
            class="h-100 promotion-card"
            :img-src="promotionData.image_url"
            img-alt="Image"
            img-top
            no-body
          >
            <b-card-text class="px-3 py-4 mb-0">
              <h5 class="text-white" v-html="promotionData.text" />
            </b-card-text>
            <b-card-footer class="d-flex justify-content-between align-items-center" style="background-color: #282826">
              <h5 class="text-info">{{ $tc('promo_code', 1) }}: {{ promotionData.promo_code }}</h5>
              <b-button
                pill
                size="sm"
                variant="secondary text-dark"
                class="orange-btn"
                @click="clickBonusAction(promotionData.promo_code)"
              >
                {{ $t('get_bonus') }}
              </b-button>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    promotionData: '',
    promotionId: ''
  }),
  computed: {
    ...mapGetters(['getGamePlayStatus', 'getActivePage', 'getGameName', 'loggedIn', 'loggedUser', 'getSideBar', 'getBalanceInfo'])
  },
  mounted () {
    this.setActivePage(4)
    this.promotionId = this.$route.params.id
    this.getPromotions()
  },
  methods: {
    ...mapActions('promotion', ['getPromotionTemplates']),
    ...mapActions(['setGamePlayStatus', 'setManagementTab', 'setMainLoading', 'setActivePage', 'setBalanceInfo', 'setBonusCode']),
    async getPromotions () {
      const data = await this.getPromotionTemplates({
        $axios: this.$axios,
        params: {
          language: this.$i18n.locale,
          bonus_id: this.promotionId
        }
      })
      if (data.status === 1) {
        this.promotionData = data.templateList[0]
      }
    },
    backPromotionAction () {
      this.$router.push(this.localePath('/promotion', this.$i18n.locale))
    },
    async clickBonusAction (promoCode) {
      if (this.loggedIn && this.loggedUser) {
        this.setManagementTab(2)
        this.setGamePlayStatus(false)
        this.setBonusCode(promoCode)
        await this.$router.push(this.localePath('/user-management', this.$i18n.locale))
      } else {
        this.$nuxt.$emit('login-action')
      }
    }
  }
}
</script>
