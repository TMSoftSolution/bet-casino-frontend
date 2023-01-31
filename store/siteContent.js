export const actions = {
  getSitecontents (ctx, { $axios }) {
    return new Promise((resolve, reject) => {
      $axios.post('admin/get_site_content')
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  createSiteContent (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('admin/create_site_content', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getContentTemplates (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_content_template', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getFaqTemplates (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_faq_template', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  updateTemplate (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('admin/update_template', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  removeSiteContent (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('admin/remove_site_content', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
