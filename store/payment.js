export const actions = {
  generateWalletAddress (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/generate_wallet', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
