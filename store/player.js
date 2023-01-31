export const actions = {
  registerPlayer (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/register_player', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  validatePlayerName (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/validate_player_name', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  updatePassword (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/update_player_password', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPlayer (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_player_profile', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getPlayerBalanceInfo (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_player_balance', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  updateProfile (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/update_profile', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  resetPassword (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/reset_player_password', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
