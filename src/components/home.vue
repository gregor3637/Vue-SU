<template>
    <div>
        <h1>Trade or View your portfolio</h1>
        <h6>You may save and load your data</h6>
        <h6>click on 'End day'To begin a new Day</h6>
        <hr>
        <!-- <p>Your Funds: {{funds | currency}}</p> -->
    </div>
</template>

<script>
export default {
    computed:{
        funds() {
            return this.$store.getters.funds;
        }
    }
}
</script>