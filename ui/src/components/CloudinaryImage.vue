<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['on-upload'])
// const props = defineProps({
//   getUrl: Function
// })

const widget = window.cloudinary.createUploadWidget(
  { cloud_name: 'deal8actc', upload_preset: 'qwmj9sa0' },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log(result.info)
      emit('on-upload', { result })
    }
  }
)

function onClick() {
  widget.open()
}
</script>

<template>
  <button @click="onClick()" class="button">Upload</button>
</template>
<style scoped>
.button {
  background-color: #f1f1f1;
  width: 10%;
  height: 5vh;
  border-radius: 10%;
  padding: 0px;
  color: black;
}
</style>
