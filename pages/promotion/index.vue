<template>
  <div class="main-container bg-primary" :class="($mq==='xl' || $mq==='lg') ? 'desktop' : 'mobile'">
    <b-container>
      <b-row>
        <b-col
          v-for="(promotion, index) in promotionList"
          :key="index"
          cols="12"
          class="p-3"
        >
          <b-card
            class="h-100 promotion-card"
            style="background-color: #2c2e32"
            :img-src="promotion.image_url"
            img-alt="Image"
            img-top
          >
            <b-card-title>
              <h3 class="text-secondary font-weight-bold">{{ promotion.title }}</h3>
            </b-card-title>
            <b-card-text>
              <h5 class="text-white" v-html="promotion.brief_text" />
              <b-button
                pill
                size="sm"
                variant="secondary text-dark"
                class="orange-btn my-2"
                @click="clickBonusAction(promotion.bonus_id)"
              >
                {{ $t('more_info') }}
              </b-button>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    promotionList: ''
  }),
  mounted () {
    this.setActivePage(4)
    this.getPromotions()
  },
  methods: {
    ...mapActions('promotion', ['getPromotionTemplates']),
    ...mapActions(['setGamePlayStatus', 'setManagementTab', 'setMainLoading', 'setActivePage', 'setBalanceInfo']),
    async getPromotions () {
      const data = await this.getPromotionTemplates({
        $axios: this.$axios,
        params: {
          language: this.$i18n.locale
        }
      })
      if (data.status === 1) {
        this.promotionList = data.templateList
      }
    },
    clickBonusAction (id) {
      this.$router.push(this.localePath(`/promotion/${id}`, this.$i18n.locale))
    }
  }
}
</script>
