export const actions = {
  getBetList (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_bet_list', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
