<template>
  <div class="main-container bg-primary" :class="($mq==='xl' || $mq==='lg') ? 'desktop' : 'mobile'">
    <b-container v-if="!getGamePlayStatus" fluid class="mx-0">
      <b-row>
        <b-col class="px-0 bg-dark" style="cursor: pointer" @click="gotoAction">
          <Slider />
        </b-col>
      </b-row>
      <b-row class="px-0">
        <b-col class="bg-tab-container-color">
          <b-nav
            class="game-group-nav"
            :class="($mq==='xl' || $mq==='lg') ? 'd-flex justify-content-center align-items-center' : ''"
            :style="($mq==='xl' || $mq==='lg') ? '' : 'overflow-x:scroll;'"
          >
            <b-nav-item v-for="(group, index) in gameGroups" :key="index" :active="group.active" class="text-white" @click="clickGameGroup(index)">
              {{ $t(group.slug+'') }}
            </b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
      <b-row v-if="gameGroups && gameGroups.length" class="gameListPane bg-primary">
        <b-container fluid class="px-4">
          <mq-layout mq="lg+">
            <b-row
              class="my-4"
              align-v="center"
            >
              <b-col cols="8">
<!--                <h2 class="activeGroup text-white">-->
<!--                  {{ gameGroups[activeGameGroup].name }}-->
<!--                </h2>-->
              </b-col>
              <b-col cols="2">
                <b-input-group class="search-game">
                  <template v-slot:append>
                    <b-input-group-text>
                      <font-awesome-icon :icon="['fas', 'search']" class="text-secondary" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    v-model="searchGameName"
                    autocomplete
                    :placeholder="$t('search_game')"
                    @input="updateGameText()"
                  />
                </b-input-group>
              </b-col>
              <b-col cols="2">
                <v-select
                  v-model="activeGameProvider"
                  class="provider-select"
                  :options="providerList"
                  :clearable="false"
                  :searchable="false"
                  @input="searchGame()"
                />
              </b-col>
            </b-row>
          </mq-layout>
          <mq-layout mq="md">
            <b-row
              class="my-4"
              align-v="center"
            >
              <b-col cols="6">
                <b-input-group class="search-game">
                  <template v-slot:append>
                    <b-input-group-text>
                      <font-awesome-icon :icon="['fas', 'search']" class="text-secondary" />
                    </b-input-group-text>
                  </template>
                  <b-form-input
                    v-model="searchGameName"
                    autocomplete
                    :placeholder="$t('search_game')"
                    @input="updateGameText()"
                  />
                </b-input-group>
              </b-col>
              <b-col cols="6">
                <v-select
                  v-model="activeGameProvider"
                  class="provider-select"
                  :options="providerList"
                  :clearable="false"
                  :searchable="false"
                  @input="searchGame()"
                />
              </b-col>
            </b-row>
          </mq-layout>
          <div class="infinite-wrapper pb-4">
            <b-row v-for="(index) in Math.ceil(gameCount/gamesPerRow)" :key="index" class="mx-0">
              <b-col v-for="(colIndex) in gamesPerRow" :key="colIndex" class="py-2 px-1">
                <template v-if="(index-1)*gamesPerRow+colIndex <= totalGameCount">
                  <b-row style="height: 90%;">
                    <b-col cols="12" class="h-100">
                      <b-img-lazy
                        class="game-image h-100 w-100"
                        blank-color="#000"
                        rounded
                        fluid-grow
                        center
                        :src="getGameImage((index-1)*gamesPerRow + colIndex-1)"
                      />
                      <div class="game-actions d-flex justify-content-center align-items-center">
                        <!--                      <template v-if="$mq!=='md'">-->
                        <!--                        <span class="game-title">{{ gameList[(index-1)*gamesPerRow + colIndex-1].name }}</span>-->
                        <!--                        <b-button-->
                        <!--                          pill-->
                        <!--                          size="sm"-->
                        <!--                          variant="red"-->
                        <!--                          class="red-btn mx-2 text-white text-nowrap"-->
                        <!--                          @click="PlayGameAction(gameList[(index-1)*gamesPerRow + colIndex-1], true)"-->
                        <!--                        >-->
                        <!--                          {{ $t('real_play') }}-->
                        <!--                        </b-button>-->
                        <!--                        <b-button-->
                        <!--                          pill-->
                        <!--                          size="sm"-->
                        <!--                          variant="outline-light text-white border-white text-nowrap"-->
                        <!--                          style="text-transform: uppercase"-->
                        <!--                          @click="PlayGameAction(gameList[(index-1)*gamesPerRow + colIndex-1])"-->
                        <!--                        >-->
                        <!--                          {{ $t('fun_play') }}-->
                        <!--                        </b-button>-->
                        <!--                      </template>-->
                        <!--                      <template v-else>-->
                        <b-row class="w-100">
                          <b-col cols="12" class="p-1 d-flex justify-content-center align-items-center">
                            <b-button
                              pill
                              size="sm"
                              block
                              class="orange-btn text-dark text-nowrap w-75"
                              @click="PlayGameAction(gameList[(index-1)*gamesPerRow + colIndex-1], true)"
                            >
                              {{ $t('real_play') }}
                            </b-button>
                          </b-col>
<!--                          <b-col cols="12" class="p-1 d-flex justify-content-center align-items-center">-->
<!--                            <b-button-->
<!--                              pill-->
<!--                              size="sm"-->
<!--                              class="w-75"-->
<!--                              block-->
<!--                              variant="outline-light text-white border-white text-nowrap"-->
<!--                              style="text-transform: uppercase"-->
<!--                              @click="PlayGameAction(gameList[(index-1)*gamesPerRow + colIndex-1])"-->
<!--                            >-->
<!--                              {{ $t('fun_play') }}-->
<!--                            </b-button>-->
<!--                          </b-col>-->
                        </b-row>
                        <!--                      </template>-->
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="py-2 d-flex justify-content-start align-items-center">
                      <h5 class="text-white">
                        {{ gameList[(index-1)*gamesPerRow + colIndex-1].name }}
                      </h5>
                    </b-col>
                  </b-row>
                </template>
              </b-col>
            </b-row>
            <infinite-loading
              ref="iiloading"
              force-use-infinite-wrapper=".force-use-infinite-wrapper"
              :identifier="infiniteId"
              @infinite="infiniteHandler"
            >
              <div slot="no-more" />
              <div slot="no-results">
                <!--                <span class="text-white" style="font-size: 1.5rem;">{{ $t('no_matches_found') }}</span>-->
              </div>
            </infinite-loading>
          </div>
          <b-row v-if="!showMoreGame" class="py-2">
            <b-col cols="12" class="d-flex justify-content-center align-items-center">
              <b-button
                pill
                variant="secondary"
                class="orange-btn mx-2"
                @click="showMoreGame=true,infiniteId+=1"
              >
                {{ $t('more_game') }}
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-row>
    </b-container>
    <b-container v-else class="game-container h-100 w-100" :class="($mq==='xl' || $mq==='lg') ? 'desktop' : 'mobile'">
      <b-row align-h="center" align-v="center" class="h-100">
        <b-col cols="12">
          <b-row>
            <b-col
              v-if="!loggedIn || !realPlay"
              cols="12"
              class="bg-dark py-2 d-flex justify-content-center align-items-center"
            >
              <span class="text-white px-2 text-nowrap">{{ $t('alert_demo_play') }}</span>
              <b-button pill size="sm" variant="secondary text-dark text-nowrap" class="orange-btn" @click="gotoRealAction">
                {{ $t('play_for_real') }}
              </b-button>
            </b-col>
            <b-col class="p-0" cols="12">
              <b-embed
                type="iframe"
                aspect="16by9"
                :src="gameUrl"
                allowfullscreen
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <Footer v-if="!getGamePlayStatus" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { debounce } from 'debounce'
import common from '~/mixins/common'

export default {
  mixins: [common],
  data: () => ({
    gameGroups: [],
    activeGameGroup: 0,
    providerList: [],
    activeGameProvider: '',
    page: 1,
    gamesPerRow: 6,
    itemsPerPage: 0,
    gameList: [],
    totalGameCount: 0,
    gameCount: 0,
    searchGameName: '',
    infiniteId: +new Date(),
    gameUrl: '',
    realPlay: false,
    game: '',
    bottomOfWindow: false,
    showMoreGame: false,
    fetchGame: true
  }),
  computed: {
    ...mapGetters(['getGamePlayStatus', 'loggedIn', 'loggedUser'])
  },
  watch: {
  },
  created () {
  },
  async mounted () {
    this.setActivePage(1)
    window.onscroll = () => {
      this.bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight
    }
    if (this.$mq === 'xl' || this.$mq === 'lg') {
      this.gamesPerRow = 6
    } else {
      this.gamesPerRow = 3
    }
    this.itemsPerPage = this.gamesPerRow * 4
    await this.getGameProviderListAction()
    await this.getGameGroupListAction()
  },
  methods: {
    ...mapActions('game', ['getGames', 'getLiveGameURL']),
    ...mapActions('gameGroup', ['getGameGroupList']),
    ...mapActions(['setGamePlayStatus', 'setGameName', 'setMainLoading', 'setActivePage']),
    ...mapActions('gameProvider', ['getGameProviderList']),
    async getGameGroupListAction () {
      const data = await this.getGameGroupList({
        $axios: this.$axios,
        params: {
          type: 'live'
        }
      })
      if (data.status === 1) {
        this.gameGroups = []
        data.gameGroupList.forEach((gameGroup, index) => {
          this.gameGroups.push({
            name: gameGroup.group_name,
            id: gameGroup.id,
            slug: gameGroup.group_slug,
            active: index === this.activeGameGroup
          })
        })
      }
    },
    async getGameProviderListAction () {
      const data = await this.getGameProviderList({
        $axios: this.$axios,
        params: {
          type: 'live',
          country: this.getCountryCode,
          status: 'activated'
        }
      })
      if (data.status === 1) {
        this.providerList = []
        this.providerList.push({
          label: this.$t('all_provider'),
          value: 0
        })
        this.activeGameProvider = this.providerList[0]
        data.gameProviderList.forEach((provider, index) => {
          this.providerList.push({
            label: provider.provider_name,
            value: provider.id
          })
        })
      }
    },
    async infiniteHandler ($state = null) {
      if (this.showMoreGame || this.fetchGame) {
        if (this.fetchGame) {
          this.fetchGame = false
        }
        const data = await this.getGames({
          $axios: this.$axios,
          params: {
            filterGame: this.searchGameName,
            filterProvider: this.activeGameProvider.value,
            filterGroup: this.gameGroups[this.activeGameGroup].id,
            page: this.page,
            itemsPerPage: this.itemsPerPage,
            country: this.getCountryCode
          }
        })
        if (data.status === 1) {
          this.totalGameCount = data.gameList.count
          if (this.totalGameCount <= this.gamesPerRow * 4) {
            this.showMoreGame = true
          }
          if (data.gameList.rows.length) {
            this.gameList = this.gameList.concat(data.gameList.rows)
            this.gameCount = this.gameList.length
            this.page += 1
            $state.loaded()
          } else {
            $state.complete()
          }
        }
      } else {
        $state.complete()
      }
    },
    clickGameGroup (index) {
      this.gameGroups[this.activeGameGroup].active = false
      this.gameGroups[index].active = true
      this.activeGameGroup = index
      this.searchGame()
    },
    getGameImage (index) {
      if (!this.gameList || this.gameList.length < index + 1) {
        return
      }
      if (!('game_info' in this.gameList[index])) {
        return
      }
      let imageInfo = ''
      if (typeof this.gameList[index].game_info === 'object') {
        imageInfo = this.gameList[index].game_info
      } else {
        imageInfo = JSON.parse(this.gameList[index].game_info)
      }
      return Object.values(imageInfo)[0]
      // return imageInfo['250x180']
      // return imageInfo['500x360']
    },
    updateGameText: debounce(function (e) {
      this.searchGame()
    }, 300),
    searchGame () {
      this.page = 1
      this.gameList = []
      this.gameCount = 0
      this.totalGameCount = 0
      this.fetchGame = true
      this.showMoreGame = false
      this.infiniteId += 1
    },
    async gotoRealAction () {
      if (this.loggedIn && this.loggedUser) {
        this.setMainLoading(true)
        try {
          this.gameUrl = ''
          const data = await this.getLiveGameURL({
            $axios: this.$axios,
            params: {
              game_id: this.game.external_game_id,
              player_id: this.loggedUser.id,
              currency: 'EUR',
              lan: this.$i18n.locale,
              provider: this.game.provider_id
            }
          })
          if (data.status === 1) {
            if (this.$mq === 'md') {
              await this.setGamePlayStatus(false)
              window.open(data.gameURL, '_blank')
            } else {
              this.gameUrl = data.gameURL
              await this.setGamePlayStatus(false)
            }
          }
          await this.sleep(500)
          this.setMainLoading(false)
          // await this.setGameName(this.game.name)
        } catch (e) {
          this.setMainLoading(false)
          await this.setGamePlayStatus(false)
        }
      } else {
        this.$nuxt.$emit('login-action')
      }
    },
    async PlayGameAction (game, isRealPlay = false) {
      this.realPlay = isRealPlay
      this.game = game
      // if (isRealPlay) {
      // if (this.loggedIn) {
      if (isRealPlay && !this.loggedIn) {
        this.$nuxt.$emit('login-action')
        return
      }
      this.setMainLoading(true)
      if (this.$mq === 'md') {
        this.popWindow = window.open('', '_blank')
      }
      const data = await this.getLiveGameURL({
        $axios: this.$axios,
        params: {
          game_id: game.external_game_id,
          player_id: this.loggedUser.id,
          is_real: isRealPlay,
          lan: this.$i18n.locale,
          provider: this.game.provider_id
        }
      })
      if (data.status === 1) {
        if (this.$mq === 'md') {
          await this.setGamePlayStatus(false)
          this.popWindow.location = data.gameURL
          this.popWindow.focus()
          // window.open(data.gameURL, '_blank')
        } else {
          await this.setGamePlayStatus(true)
          this.gameUrl = data.gameURL
        }
      } else {
        this.$bvToast.toast(this.$t('action_failed'), {
          variant: 'danger',
          appendToast: true,
          toaster: 'b-toaster-top-right',
          noCloseButton: true,
          autoHideDelay: 3500,
          solid: true
        })
      }
      await this.sleep(500)
      this.setMainLoading(false)
      // await this.setGameName(game.name)
    },
    gotoAction () {
      if (this.loggedIn && this.loggedUser) {
        this.$nuxt.$emit('deposit-action')
      } else {
        this.$nuxt.$emit('login-action')
      }
    }
  }
}
</script>
