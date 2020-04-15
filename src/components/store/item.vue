<template>
  <div class="col-sm-12">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{item.name}}
        </h3>
      </div>

      <div class="panel-body">
        <img :src="getImgUrl(item.name)" alt="Italian Trulli" class="pull-left" />
        <div class="pull-left">
          <input 
                type="number"
                class="form-control"
                placeholder="Quantity"
                v-model="quantity"
            />
        </div>
        <div class="pull-left">
          <p>Price: {{item.price}}</p>
        </div>
        <div class="pull-right">
          <button 
            class="btn btn-success"
            @click="buyItem"
            :disabled="!isInputValid"
            >Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
    props: ['item'],
    data() {
        return {
            quantity: 0
        }
    },
    computed: {
         isInputValid() {
            let isAbove = this.quantity > 0;
            return isAbove;
        },
    },
    methods: {
        getImgUrl(pic) {
            return require('../../assets/' + pic + ".jpg")
        },
        buyItem(){
            const order = {
                itemId: this.item.id,
                itemName: this.item.name,
                itemPrice: this.item.price,
                quantity: Number(this.quantity),
            };

            console.log('store> item', order);
            this.quantity = 0;
            
        }
    }
}
</script>

<style scoped>
img {
  height: 42px;
  width: 42px;
}

div.pull-left {
  padding-left: 30px;
}
</style>