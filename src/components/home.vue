<template>
    <div>
        <h1>Past purcases: </h1>
        <hr>
        <p>total Orders Cost: --{{totalOrderCost}} --</p>
    </div>
</template>

<script>
export default {
    computed:{
        totalOrderCost() {

            let a = this.$store.getters.orderCost;
            console.log('z) components> home> computed> orderCost', a);
            
            return this.$store.getters.totalOrderCost;
        },
    },


    created() {
        console.log('$$$$$$ home.vue> getAllItems>');
        this.$store.dispatch("getAllItems");
    },
    
}
</script>

<style scoped>
h1,
p {
  text-align: center;
}
</style>