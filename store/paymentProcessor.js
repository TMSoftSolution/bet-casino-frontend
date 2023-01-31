export const actions = {
  getPaymentProcessors (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_processors', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getWithdrawalPaymentProcessors (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_withdrawal_processors', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  sendWithdrawalRequest (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('payment/send_withdrawal_request', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
