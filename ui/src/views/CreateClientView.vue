<script setup>
import { reactive, ref, watchEffect, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import UploadImage from '../components/CloudinaryImage.vue'
//To get id by params
const route = useRoute()
//id is used for editing
const id = route.params.id
const router = useRouter()
//Initial states of variables
const state = reactive({
  name: '',
  lastName: '',
  email: '',
  gender: '',
  country: '',
  url: ''
})

//This function creates an client.
const statusCreate = ref('')
const errorCreate = ref('')
const uploadData = async () => {
  try {
    const result = await axios.post('http://localhost:3000/clients', {
      first_name: state.name,
      email: state.email,
      last_name: state.lastName,
      gender: state.gender,
      origin: state.country,
      photo: state.url
    })
    statusCreate.value = result.status
    setTimeout(() => {
      router.push({ path: '/' })
    }, '2000')
  } catch (error) {
    errorCreate.value = error.name
  }
}

//Getting url of img from cloudinary
const getUrl = ({ result }) => {
  state.url = result?.info.secure_url
}

//Data of the client can be used.
const client = ref('')
const getClient = async () => {
  const { data } = await axios.get(`http://localhost:3000/clients/${id}`)
  client.value = data
  state.name = data.first_name
  state.lastName = data.last_name
  state.email = data.email
  state.country = data.origin
  state.gender = data.gender
}
watchEffect(() => getClient())

//This function edits the client.
const statusEdit = ref('')
const errorEdit = ref('')
const editData = async () => {
  try {
    const result = await axios.put(`http://localhost:3000/clients/${id}`, {
      first_name: state.name,
      email: state.email,
      last_name: state.lastName,
      gender: state.gender,
      origin: state.country,
      photo: state.url.length > 0 ? state.url : client.value.photo
    })
    statusEdit.value = result.status
    setTimeout(() => {
      router.push({ path: `/detail/${id}` })
    }, '2000')
  } catch (error) {
    errorEdit.value = error.name
  }
}
</script>

<template>
  <div class="container">
    <h1 v-if="id.length > 1">
      Edit
      <span v-if="client.gender == 'Male'">Mr.</span>
      <span v-else>Ms.</span>{{ ` ${client.first_name}` }}
    </h1>
    <h1 v-else>Register an new client</h1>
    <p v-if="id.length > 1">Please fill in this form to edit the client.</p>
    <p v-else>Please fill in this form to create an client.</p>
    <hr />
    <label for="name"><b>Name</b></label>

    <input type="text" placeholder="Enter Name" name="name" v-model="state.name" />

    <label for="lastName"><b>Last Name</b></label>
    <input type="text" placeholder="Enter Last Name" name="lastName" v-model="state.lastName" />

    <label for="email"><b>Email</b></label>

    <input type="text" placeholder="Enter Email" name="email" v-model="state.email" />

    <label><b>Country</b></label>

    <input type="text" placeholder="Enter Country" name="country" v-model="state.country" />

    <label><b>Gender</b></label
    ><br />
    <input type="radio" id="male" v-model="state.gender" value="Male" /> Male<br />
    <input type="radio" id="female" v-model="state.gender" value="Female" /> Female<br /><br />

    <label><b>Photo</b></label
    ><br />
    <UploadImage @on-upload="getUrl" />

    <button v-if="id.length > 1" @click="editData()">Edit</button>
    <button v-else @click="uploadData()">Create</button>
    <div class="status" v-if="statusEdit">
      <p style="margin-left: 25%">The client is successfully edited</p>
    </div>
    <div class="status" v-if="statusCreate">
      <p style="margin-left: 25%">The client is successfully created</p>
    </div>
    <div class="status" style="background-color: red" v-if="errorEdit || errorCreate">
      <p style="margin-left: 25%">Something went wrong</p>
    </div>
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
.status {
  margin-left: 25%;
  background-color: green;
  width: 50%;
  height: auto;
  display: inline-block;
  word-break: break-word;
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
  background-color: #797777;
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
