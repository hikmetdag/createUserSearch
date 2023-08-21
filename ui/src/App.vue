<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <!-- Header component is used for all pages -->
  <Header />
  <RouterView />
</template>
