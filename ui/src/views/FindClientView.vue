<script setup>
import { ref, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
const clients = ref(null)
const input = ref('')
//Getting all users
const getClients = async () => {
  const { data } = await axios.get('http://localhost:3000/clients')
  clients.value = data
}
//To trigger the function
watchEffect(() =>getClients())

function filteredList() {
  //First 10 names will be initially presented,
  if (!input.value) {
    return clients.value.slice(0, 10)
  }
  return clients.value
    .filter((item) =>
      `${item.first_name} ${item.last_name} ${item.origin}`
        .toLowerCase()
        .includes(input.value.toLowerCase())
    )
    .slice(0, 10)
}
</script>

<template>
  <main>
    <div class="wrapper">
      <h2>Find the clients</h2>
      <input type="text" v-model="input" placeholder="Search clients..." />
      <div class="item" v-for="item in filteredList()" :key="item">
        <!-- Navigate to the detail page -->
        <RouterLink :to="`/detail/${item.id}`" style="text-decoration: none; color: inherit"
          ><p>
            {{ `${item.first_name} ${item.last_name}(${item.origin})` }}
          </p>
        </RouterLink>
      </div>

      <!-- If searched name is not available in DB, this message will be presented -->
      <div class="item error" v-if="input && !filteredList().length">
        <p>No results found!</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  /* background-color: rgb(234, 242, 255); */
  padding: 40px;
}

input {
  width: 50%;
  padding: 10px 45px;
  background: white;
  font-size: 16px;
  border: 2px solid #e7e7e7;
  border-radius: 5px;
  margin-top: 10px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  color: black;
  border-radius: 5px;
  background-color: #e7e7e7;
  cursor: pointer;
  height: auto;
  width: 50%;
}
.wrapper {
  padding-top: 10vh;
  width: 500px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;

  .error {
    background-color: tomato;
  }
}
</style>
