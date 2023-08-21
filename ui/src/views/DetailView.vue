<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref,watchEffect} from 'vue'
import axios from 'axios'
//useRouter() is used for navigation
const router = useRouter()
const route = useRoute()
const id = route.params.id
const client = ref(null)
//Fetching specific client for detail page
const getClient = async () => {
  const { data } = await axios.get(`http://localhost:3000/clients/${id}`)
  client.value = data
}
watchEffect(()=>getClient())

//Function for deleting client
const deleteClient = async () => {
  let result = await axios.delete(`http://localhost:3000/clients/${id}`)
  router.push({ name: 'home' })
}

//Function for editing client
const editClient = async () => {
  router.push(`/create/${id}`)
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Client Details</h1>
      <hr />
      <img v-if="client.photo" :src="`${client.photo}`" />
      <h2>{{ `${client.first_name} ${client.last_name}` }}</h2>
      <h2>{{ client.gender }}</h2>
      <h2>{{ client.email }}</h2>
      <h2>From:{{ client.origin }}</h2>

      <div class="buttons">
        <button class="edit" @click="editClient()">Edit</button>
        <button class="delete" @click="deleteClient()">Delete</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
* {
  margin: 0%;
  padding: 0;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
button {
  padding: 14px 20px;
  height: 40px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
  opacity: 0.9;
}
.edit {
  background-color: greenyellow;
}
.delete {
  background-color: red;
}
main {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.container {
  /* background-color: #eee; */
  min-height: 100vh;
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  gap: 10px;
}

hr {
  border: 1px solid #eee;
  width: 30%;
}

img {
  width: 200px;
  height: 200px;
}
</style>
