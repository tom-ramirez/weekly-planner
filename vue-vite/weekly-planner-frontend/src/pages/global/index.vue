<script setup>
import {useCounterStore} from "../../stores/counter";
const store = useCounterStore()
</script>

<template>
  <h1> global </h1>
  <h2> count is: {{store.count}}  !!</h2>
  <h1 v-if="store.count>1">counter greater than 1 </h1>
  <button @click="store.increment()"> increment </button>
  <button @click="store.decrement()"> decrement </button>
</template>
