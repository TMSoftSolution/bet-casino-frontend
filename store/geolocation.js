export const actions = {
  getGeoLocation (ctx, { $axios }) {
    return new Promise((resolve, reject) => {
      $axios.get('geolocation')
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
