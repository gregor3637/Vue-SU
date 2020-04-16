<template>
  <div id="history">
    <h1>That's the history purchases history!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p v-if="email">Email address: {{email}}</p>

    <hr />
    <hr />
    <hr />
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