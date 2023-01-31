export const actions = {
  getGameProviderList (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_game_providers', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
