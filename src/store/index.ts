import { createStore, Store, useStore as useVuexStore } from "vuex"

import { IRootState, IStoreType } from "./types"

const store = createStore<IRootState>({
  state() {
    return {}
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {},
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
