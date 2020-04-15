<template>
  <div class="container">
    <h1>Shop Items</h1>
    <app-item v-for="item in items" :key="item.id" :item="item"></app-item>
  </div>
</template>

<script>
import Item from "./item.vue";
export default {
  components: {
    appItem: Item
  },
  computed: {
    items() {
      return this.$store.getters.items;
    }
  }
};
</script>