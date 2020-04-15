<template>
  <div class="container">
    <h1>Shop Items</h1>
    <app-item v-for="item in items" :key="item.id" :item="item"></app-item>
  </div>
</template>

<script>
import Item from "./item.vue";
export default {
  data() {
    return {
      items: [
        { id: 1, name: "Apple", price: 1.5 },
        { id: 2, name: "Banana", price: 3 },
        { id: 3, name: "Potato", price: 0.2 },
        { id: 4, name: "Cheese", price: 5 }
      ]
    };
  },
  components: {
    appItem: Item
  }
};
</script>