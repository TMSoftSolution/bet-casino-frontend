<template>
  <div class="main-container bg-primary" :class="($mq==='xl' || $mq==='lg') ? 'desktop' : 'mobile'">
    <mq-layout mq="lg+">
      <b-container fluid class="mx-0 management-container desktop">
        <b-row style="min-height: 650px">
          <b-col cols="3" lg="3" xl="2">
            <b-nav vertical class="management-nav">
              <b-nav-item :active="getManagementTab === 0" @click="clickTab(0)">
                <h6>{{ $t('bet_list') }}</h6>
              </b-nav-item>
              <b-nav-item :active="getManagementTab === 1" @click="clickTab(1)">
                <h6>{{ $t('personal_details') }}</h6>
              </b-nav-item>
              <b-nav-item :active="getManagementTab === 2" @click="clickTab(2)">
                <h6>{{ $t('deposit') }}</h6>
              </b-nav-item>
              <b-nav-item :active="getManagementTab === 3" @click="clickTab(3)">
                <h6>{{ $t('withdraw') }}</h6>
              </b-nav-item>
              <b-nav-item :active="getManagementTab === 4" @click="clickTab(4)">
                <h6>{{ $t('transaction_list') }}</h6>
              </b-nav-item>
              <b-nav-item :active="getManagementTab === 5" @click="clickTab(5)">
                <h6>{{ $t('change_password') }}</h6>
              </b-nav-item>
            </b-nav>
          </b-col>
          <b-col cols="8">
            <BetList v-if="getManagementTab === 0" />
            <Profile v-else-if="getManagementTab === 1" />
            <Deposit v-else-if="getManagementTab === 2" />
            <Withdraw v-else-if="getManagementTab === 3" />
            <TransactionList v-else-if="getManagementTab === 4" />
            <ChangePassword v-else-if="getManagementTab === 5" />
          </b-col>
        </b-row>
      </b-container>
    </mq-layout>
    <mq-layout mq="md">
      <BetList v-if="getManagementTab === 0" />
      <Profile v-else-if="getManagementTab === 1" />
      <Deposit v-else-if="getManagementTab === 2" />
      <Withdraw v-else-if="getManagementTab === 3" />
      <TransactionList v-else-if="getManagementTab === 4" />
      <ChangePassword v-else-if="getManagementTab === 5" />
    </mq-layout>
    <Footer style="position: fixed; bottom: 0;" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TransactionList from '~/components/TransactionList'
import Withdraw from '~/components/Withdraw'
export default {
  components: { Withdraw, TransactionList },
  middleware: ['isLoggedInUser'],
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters(['getManagementTab'])
  },
  async mounted () {
    this.setActivePage(-1)
    if (this.$route.query.deposit) {
      await this.setManagementTab(2)
    }
  },
  methods: {
    ...mapActions(['setManagementTab', 'setActivePage']),
    clickTab (index) {
      if (Object.keys(this.$route.query).length) {
        this.$router.replace({ query: null })
      }
      this.setManagementTab(index)
    }
  }
}
</script>
