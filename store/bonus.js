export const actions = {
  validatePromoCode (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/validate_promo_code', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
