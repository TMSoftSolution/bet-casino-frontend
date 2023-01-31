export const state = () => ({
  success: {},
  error: {},
  errors: {},
  user: null,
  theme: 'light',
  modal: false,
  language: 'en',
  isGamePlay: false,
  gameName: '',
  managementTab: 0,
  countryCode: '',
  ip: '',
  activePage: 0,
  mainLoading: false,
  balanceInfo: '',
  bonusCode: '',
  countryBlackList: '',
  ipBlackList: '',
  pageReady: false
})

export const mutations = {
  setSuccess (state, success) {
    state.success = success
  },
  SET_LANGUAGE (state, lan) {
    state.language = lan
  },
  SET_GAMEPLAY_STATUS (state, status) {
    state.isGamePlay = status
  },
  UNSET_USER (state) {
    state.auth.user = null
    state.auth.loggedIn = false
  },
  SET_GAME_NAME (state, status) {
    state.gameName = status
  },
  SET_MANAGEMENT_TAB (state, status) {
    state.managementTab = status
  },
  SET_COUNTRY_CODE (state, status) {
    state.countryCode = status
  },
  SET_MAIN_LOADING (state, status) {
    state.mainLoading = status
  },
  SET_ACTIVE_PAGE (state, status) {
    state.activePage = status
  },
  SET_BALANCE_INFO (state, status) {
    state.balanceInfo = status
  },
  SET_BONUS_CODE (state, status) {
    state.bonusCode = status
  },
  SET_COUNTRY_BLACK_LIST (state, status) {
    state.countryBlackList = status
  },
  SET_PAGE_READY (state, status) {
    state.pageReady = status
  },
  SET_IP (state, status) {
    state.ip = status
  },
  SET_IP_BLACK_LIST (state, status) {
    state.ipBlackList = status
  }
}

export const getters = {
  loggedIn: state => state.auth.user !== null && state.auth.user.player !== null && state.auth.user.player !== false,
  loggedUser: state => state.auth.user !== null ? state.auth.user.player : null,
  darkTheme: state => state.theme === 'dark',
  error: state => state.error,
  language: state => state.language,
  getGamePlayStatus: state => state.isGamePlay,
  getGameName: state => state.gameName,
  getManagementTab: state => state.managementTab,
  getCountryCode: state => state.countryCode,
  getMainLoading: state => state.mainLoading,
  getActivePage: state => state.activePage,
  getBalanceInfo: state => state.balanceInfo,
  getBonusCode: state => state.bonusCode,
  getCountryBlackList: state => state.countryBlackList,
  getPageReady: state => state.pageReady,
  getIP: state => state.ip,
  getIpBlackList: state => state.ipBlackList
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    try {
      // const geoData = await this.$axios.$get('https://ipinfo.io/json?token=9a50bf62c4b1b0')
      // commit('SET_COUNTRY_CODE', geoData.country)

      const blackListData = await this.$axios.$post(this.$config.SERVER_BASE_URL + '/api/front/get_setting')
      commit('SET_COUNTRY_BLACK_LIST', blackListData.setting.country_black_list)
      commit('SET_IP_BLACK_LIST', blackListData.setting.ip_black_list)
    } catch (e) {
      console.log(e)
    }
  },
  handleHttpResponse ({ commit }, response) {
    commit('setSuccess', response)
  },
  handleSignedOut ({ commit }) {
    commit('UNSET_USER')
  },
  setLanguage ({ commit }, data) {
    commit('SET_LANGUAGE', data)
  },
  setGamePlayStatus ({ commit }, data) {
    commit('SET_GAMEPLAY_STATUS', data)
  },
  setGameName ({ commit }, data) {
    commit('SET_GAME_NAME', data)
  },
  setManagementTab ({ commit }, data) {
    commit('SET_MANAGEMENT_TAB', data)
  },
  setCountryCode ({ commit }, data) {
    commit('SET_COUNTRY_CODE', data)
  },
  setMainLoading ({ commit }, data) {
    commit('SET_MAIN_LOADING', data)
  },
  setActivePage ({ commit }, data) {
    commit('SET_ACTIVE_PAGE', data)
  },
  setBalanceInfo ({ commit }, data) {
    commit('SET_BALANCE_INFO', data)
  },
  setBonusCode ({ commit }, data) {
    commit('SET_BONUS_CODE', data)
  },
  setCountryBlackList ({ commit }, data) {
    commit('SET_COUNTRY_BLACK_LIST', data)
  },
  setPageReady ({ commit }, data) {
    commit('SET_PAGE_READY', data)
  },
  setIP ({ commit }, data) {
    commit('SET_IP', data)
  }
}
