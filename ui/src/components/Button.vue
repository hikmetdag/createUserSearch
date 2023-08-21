<template>
  <button>
    <!-- slot is used to named button component differently -->
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  background-color: #e7e7e7;
  color: black;
  border: 2px solid #e7e7e7;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  transition-duration: 0.4s;
  cursor: pointer;
  width:100%;
  height: auto;
  overflow: hidden;
  border-radius: 5%;

}

button:hover {
  background-color:white;
}
</style>
