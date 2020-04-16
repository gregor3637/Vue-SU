const state = {
    orderCost: 0,
    items: []
};

const mutations = {
    'BUY_ITEM'(state, { itemId, quantity, itemPrice }) {
        const record = state.items.find(element => element.id == itemId);
        console.log('3) store> modules> order.js> BUY_ITEM');

        if (record) {
            record.quantity += quantity;
        }
        else {
            state.items.push({
                id: itemId,
                quantity: quantity,
            });
        }

        state.orderCost += itemPrice * quantity;
    },



    'REMOVE_ITEM'(state, { itemId, quantity, itemPrice }) {
        console.log(`iii) store> modules> order.js> mutations> REMOVE_ITEM`);

        const record = state.items.find(element => {
            let isSame = element.id == itemId;
            return isSame;
        });

        console.log('iii)', record);



        if (record.quantity > quantity) {
            record.quantity -= quantity;
        }
        else {
            state.items.splice(state.items.indexOf(record), 1);
        }

        state.orderCost -= itemPrice * quantity;
    }
}


const actions = {
    removeItem({ commit }, order) {
        console.log('ii) store> modules> order.js> actions> removeItem !', order);
        commit('REMOVE_ITEM', order);
    }
}

const getters = {
    itemsOrder(state, getters) {
        let allOrderItems = state.items.map(item => {
            const record = getters.items.find(element => element.id == item.id);

            let itemObj = {
                id: item.id,
                quantity: item.quantity,
                name: record.name,
                price: record.price
            };


            return itemObj;
        });

        console.log('-) store> modules> order.js> getters> itemsOrder', allOrderItems);
        return allOrderItems;
    },
    orderCost(state) {
        return state.orderCost;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}