export const actions = {
  getGameGroupList (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_game_group_list', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
