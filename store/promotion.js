export const actions = {
  getPromotionTemplates (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_promotion_template', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
