import { createStore } from 'vuex'

/* Vuex state
    State gets updated every time a new value is selected in the dropdown in Filter component
    getCurrentCategory getter is used by Races component to filter the displayed races
*/
const store = createStore({
    state: {
        category: '',
    },
    mutations: {
        changeCategory(state, payload) {
            state.category = payload;
        },
    },
    actions: {
        updateCategory(context, payload) {
            context.commit('changeCategory', payload);
        }
    },
    getters: {
        getCurrentCategory(state) {
            return state.category
        }
    }
})

export { store };
