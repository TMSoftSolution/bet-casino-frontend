export const actions = {
  sendMessage (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/player_send_message', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
