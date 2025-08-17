import { createApp } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
  state () { //state-ben tároljuk el az adatokat
    return {
         user: null
    }
  },

  getters: {
       user: (state) => {
            return state.user
       }
  },

  mutations: { //a mutation-ben lévő metódusokkal változtatjuk meg az adatokat
               //adatváltoztatás triggereléssel vagy committolással (a folyamat neve dispatch-elés)
       setUser(state, user) {
            state.user = user
       }
  },

  actions: {
       user(context, user) {
            context.commit('setUser', user) //a setUser mutation-t hívja meg, a bejövő user adattal teszi egyenlővé
       }
  }
})

export default store