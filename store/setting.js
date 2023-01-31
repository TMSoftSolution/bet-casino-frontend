export const actions = {
  getSetting (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_setting', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
