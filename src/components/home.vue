<template>
    <div>
        <h1>Past purcases: </h1>
        <hr>
        <p>Your Order cost: --{{orderCost | currency}} --</p>
    </div>
</template>

<script>
export default {
    computed:{
        orderCost() {

            let a = this.$store.getters.orderCost;
            console.log('z) components> home> computed> orderCost', a);
            
            return this.$store.getters.orderCost;
        }
    }
}
</script>

<style scoped>
h1,
p {
  text-align: center;
}
</style>