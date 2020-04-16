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
          <p>Price: {{item.price}} | Quantity: {{item.quantity}}</p>
        </div>
        <div class="pull-right">
          <button 
            class="btn btn-success"
            @click="removeItem"
            :disabled="!isInputValid"
            >Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions} from 'vuex';

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
        ...mapActions([
            'removeItem'
        ]),
        getImgUrl(pic) {
            return require('../../assets/' + pic + ".jpg")
        },
        removeItem() {
            const order = {
                itemId: this.item.id,
                itemPrice: this.item.price,
                quantity: this.quantity,
            };

            console.log(`i) components > order> item.vue> methods> removeItem`, order);
        
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