<script setup>
import { RouterLink } from 'vue-router'
import Button from '../components/Button.vue'
</script>

<template>
  <main>
    <h1>Welcome to the clients page</h1>
    <div>
      <RouterLink to="/create/:"><Button>Create Clients</Button></RouterLink>
      <RouterLink to="/find"><Button>Find Clients </Button></RouterLink>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
}
div {
  display: flex;
  justify-content: center;
  flex-direction: row;
  min-width: 100%;
  min-height: 50vh;
  gap:5%;
  margin-top: 40px;
}
h1 {
  margin-top: 75px;
  font-size: 1.75em;
}
</style>
