<script setup>
import { reactive,ref,watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
//To get id by params 
const route = useRoute()
//id is used for editing
const id = route.params.id
//Initial states of variables
const state = reactive({
  name: '',
  lastName: '',
  email: '',
  gender: '',
  country: ''
})

//This function creates an client.
const uploadData = async () => {
  let result = await axios.post('http://localhost:3000/clients', {
    first_name: state.name,
    email: state.email,
    last_name: state.lastName,
    gender: state.gender,
    origin: state.country
  })
}

//This function edits the client.
const editData = async () => {
  let result = await axios.put(`http://localhost:3000/clients/${id}`, {
    first_name: state.name,
    email: state.email,
    last_name: state.lastName,
    gender: state.gender,
    origin: state.country
  })
}
//Data of the client to be edited can be used.
const client=ref(null)
const getClient = async () => {
  const { data } = await axios.get(`http://localhost:3000/clients/${id}`)
  client.value = data
}
watchEffect(()=>getClient())
</script>

<template>
  <div class="container">
    <h1 v-if="id.length > 1">{{`Edit ${client.first_name}`}}</h1>
    <h1 v-else>Register an new client</h1>
    <p v-if="id.length > 1">Please fill in this form to edit the client.</p>
    <p v-else>Please fill in this form to create an client.</p>
    <hr />
    <label for="name"><b>Name</b></label>
    <input v-if="id.length > 1" type="text" :placeholder="`${client.first_name}`" name="name" v-model="state.name" />
    <input v-else type="text" placeholder="Enter Name" name="name" v-model="state.name" />
    
    <label for="lastName"><b>Last Name</b></label>
    <input v-if="id.length > 1"  type="text" :placeholder="`${client.last_name}`" name="lastName" v-model="state.lastName" />
    <input v-else type="text" placeholder="Enter Last Name" name="lastName" v-model="state.lastName" />
    
    <label for="email"><b>Email</b></label>
    <input v-if="id.length > 1" type="text" :placeholder="`${client.email}`" name="email" v-model="state.email" />
    <input v-else type="text" placeholder="Enter Email" name="email" v-model="state.email" />
    
    <label for="psw-repeat"><b>Country</b></label>
    <input v-if="id.length > 1" type="text" :placeholder="`${client.origin}`" name="country" v-model="state.country" />
    <input v-else type="text" placeholder="Enter Country" name="country" v-model="state.country" />
    
    <label for="psw"><b>Gender</b></label
    ><br />
    <input type="radio" id="male" v-model="state.gender" value="Male" /> Male<br />
    <input type="radio" id="female" v-model="state.gender" value="Female" /> Female<br />

    <button v-if="id.length > 1" @click="editData()">Edit</button>
    <button v-else @click="uploadData()">Create</button>
  </div>
</template>

<style scoped>
input[type='text'] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type='text']:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

.container {
  width: 50%;
  padding: 16px;
  margin-left: 25%;
}
</style>
