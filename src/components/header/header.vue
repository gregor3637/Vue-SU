<template>
  <header id="header">
    <div class="logo navbar-header">
      <router-link :to="getActiveLogoRoute()" class="navbar-brand">Veggie Shop</router-link>
    </div>
    <strong class="navbar-text navbar-right order-cost">Order Cost: {{orderCost}}</strong>
    <nav>
      <ul class="">
        <li v-if="!auth">
          <router-link to="/signup">Sign Upp</router-link>
        </li>
        <li v-if="!auth">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="auth">
          <router-link to="/shop">Shop</router-link>
        </li>
        <li v-if="auth">
          <router-link to="/order">Purchase Order</router-link>
        </li>
        <li v-if="auth">
          <a class="logout" @click="onLogout">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    orderCost() {
      return this.$store.getters.orderCost;
    },
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
    getActiveLogoRoute() {
      let urlRes =  this.auth? "/userHome" : "/" ;
      return urlRes;
    },
  }
};
</script>

<style scoped>
#header {
  height: 56px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: #1700eb;
  padding: 0 20px;
}

.logo {
  font-weight: bold;
  color: white;
}

.logo a {
  text-decoration: none;
  color: white;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
}

li {
  margin: 0 16px;
}

li a {
  text-decoration: none;
  color: white;
  background-color: transparent;
}

li a:hover,
li a:active,
li a.router-link-active {
  color: red;
}


.order-cost{
  color: white;
}
.logout {
  background-color: transparent;
  border: none;
  font: inherit;
  color: white;
  cursor: pointer;
}
</style>