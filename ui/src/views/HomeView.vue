<script setup>
import { RouterLink } from 'vue-router'
import Button from '../components/Button.vue'
</script>

<template>
  <main>
    <h1>Welcome to clients page</h1>
    <div>
      <RouterLink to="/create"><Button>Create Clients</Button></RouterLink>
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
}
div {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 50px;
  width: 50%;
  height: 200px;
}
h1{
  margin-top: 100px;
}
</style>
