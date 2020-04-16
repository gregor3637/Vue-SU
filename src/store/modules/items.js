import items from '../../data/items.js'

const state = {
    items: []
};

const mutations = {
    'SET_ITEMS'(state, items) {
        state.items = items;
    },
}

const actions = {
    buyItem: ({ commit }, order) => {
        console.log('2) store> modules> items.js', order);
        commit('BUY_ITEM', order);
    },
    initItems: ({commit}) => {
        commit('SET_ITEMS', items)
    },

}

const getters = {
    items: state => {
        return state.items;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}