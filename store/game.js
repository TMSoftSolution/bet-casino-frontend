export const actions = {
  getGames (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_games', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getGameURL (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_game_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getLiveGameURL (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_live_game_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
