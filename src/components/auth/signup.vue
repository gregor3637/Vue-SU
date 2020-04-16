<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  @blur="$v.email.$touch()"
                  v-model="email">
                  <p v-if="!$v.email.email">Email is invalid</p>
        </div>
        <div class="input" :class="{invalid: $v.age.$error}">
          <label for="age">Your Age</label>
          <input
                  type="number"
                  id="age"
                  @blur="$v.age.$touch()"
                  v-model.number="age">
                  <p v-if="!$v.age.minVal">Must be above {{$v.age.$params.minVal.min}} years</p>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  @blur="$v.password.$touch()"
                  v-model="password">
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  @blur="$v.confirmPassword.$touch()"
                  v-model="confirmPassword">
        </div>
        <div class="input">
          <label for="city">City</label>
          <select id="city" v-model="city">
            <option value="sofia">Sofia</option>
            <option value="varna">Varna</option>
            <option value="ruse">Ruse</option>
            <option value="pleven">Pleven</option>
          </select>
        </div>
        
        <div class="submit">
          <button type="submit" :disabled="$v.$invalid">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {required, email, numeric, minValue, minLength ,sameAs} from 'vuelidate/lib/validators'
  import axios from 'axios'
  export default {
    data () {
      return {
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        city: 'Sofia',
      }
    },
    validations: {
      email: {
        required: required,
        email: email,
        unique: val => {
          if (val ==='') {
            return true;
          }

          return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"')
            .then(res => {
              console.log("signup email axios", res);
              return Object.keys(res.data).length ===0;
            })
        }
      },
      age: {
        required: required,
        numeric: numeric,
        minVal: minValue(18)
      },
      password: {
        required: required,
        minLen: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          age: this.age,
          password: this.password,
          confirmPassword: this.confirmPassword,
          city: this.city,
          orders:[],
        }
        console.log(formData)

        this.$store.dispatch("signup", formData);
      }
    }
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }

  
  .input.invalid label {
  color:red;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: rgb(255, 134, 134);
  }
</style>