export default function ({ store, redirect }) {
  if (store.getters.getCountryBlackList !== null && store.getters.getCountryBlackList.includes(store.getters.getCountryCode)) {
    return redirect('/restriction')
  }
}
