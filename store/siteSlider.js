export const actions = {
  getSliders (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_slider', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
