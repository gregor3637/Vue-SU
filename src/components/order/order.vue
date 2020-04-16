<template>
  <div id="history">
    <h1>Order Items</h1>

    <div class="col-md-12 text-center">
      <button class="btn btn-danger" @click="buyItems">Buy Listed Items</button>
    </div>
    <hr />
    <app-item v-for="(item, index) in items" :item="item" :key="index"></app-item>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Item from "./item.vue";

export default {
  computed: {
    ...mapGetters({
      items: "itemsOrder"
    }),
    email() {
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    }
  },

  methods: {
    buyItems() {
      const data = {
        cost: this.$store.getters.orderCost,
        items: this.$store.getters.itemsOrder,
        purchaseTime: Date.now()
      };

      console.log('components > order> order.vue> methods> buyItems', data);
      this.$store.dispatch("buyItems", data);
    }
  },

  components: {
    appItem: Item
  },

  created() {
    this.$store.dispatch("fetchUser");
  }
};
</script>

<style scoped>
h1,
p {
  text-align: center;
}

p {
  color: red;
}
</style>