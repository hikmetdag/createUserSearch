<template>
  <button>
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  width:300px;
  height: 60px;
  border-radius: 5%;

}

button:hover {
  background-color: #e7e7e7;
}
</style>
