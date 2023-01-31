<template>
  <b-container fluid class="mx-0 faq-container main-container">
    <mq-layout mq="lg+">
      <b-row>
        <b-col cols="12" class="d-flex justify-content-center bg-primary">
          <a :href="'/'">
            <b-img src="/logo1.png" height="70" class="py-1" />
          </a>
        </b-col>
      </b-row>
      <b-row class="py-4">
        <b-col cols="2">
          <b-nav vertical class="faq-nav">
            <b-nav-item
              v-for="(item, index) in templateList"
              :key="index"
              :active="activeTab == index"
              @click="activeTab = index"
            >
              {{ $t(item.content_tab+'') }}
            </b-nav-item>
          </b-nav>
        </b-col>
        <b-col cols="10">
          <span v-if="templateList[activeTab]" v-html="templateList[activeTab].content" />
        </b-col>
      </b-row>
    </mq-layout>
    <mq-layout mq="md">
      <b-row>
        <b-col
          cols="12"
          class="d-flex justify-content-center align-items-center bg-primary"
          style="position: fixed;top: 0;z-index: 999"
        >
          <font-awesome-icon
            :icon="['fas', 'bars']"
            class="text-white mr-2"
            style="font-size: 1.5rem;position: absolute;left: 15px;top: 23px"
            @click="showSideBar=!showSideBar"
          />
          <a :href="'/'">
            <b-img src="/logo1.png" height="70" class="py-1" />
          </a>
        </b-col>
        <b-col cols="12" style="top:70px">
          <span v-if="templateList[activeTab]" v-html="templateList[activeTab].content" />
        </b-col>
      </b-row>
    </mq-layout>
    <b-sidebar
      v-model="showSideBar"
      shadow
      bg-variant="white"
      backdrop-variant="transparent"
      backdrop
      no-header
    >
      <div class="sidebar-div">
        <b-list-group>
          <b-list-group-item
            v-for="(item, index) in templateList"
            :key="index"
            :active="activeTab == index"
            class="bg-white text-light"
            @click="showSideBar=!showSideBar,activeTab=index"
          >
            <h4 class="text-light text-nowrap">
              {{ $t(item.content_tab+'') }}
            </h4>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-sidebar>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'faq',
  data: () => ({
    templateList: [],
    activeTab: 0,
    showSideBar: false
  }),
  computed: {
  },
  mounted () {
    this.activeTab = this.$route.params.id
    if (this.activeTab === undefined) {
      this.activeTab = 0
    }
    this.getTemplateAction()
  },
  methods: {
    ...mapActions('siteContent', ['getContentTemplates', 'getFaqTemplates']),
    async getTemplateAction () {
      const data = await this.getFaqTemplates({
        $axios: this.$axios,
        params: {
          language: this.$i18n.locale
        }
      })
      if (data.status === 1) {
        this.templateList = data.templateList
      }
    }
  }
}
</script>
