<script setup>
import {ref, onMounted, watch} from "vue";
const text = ref("hello world")
const changeText=()=>{
  text.value = "Goodbye World"
}
onMounted(()=>{
  text.value = "on mount hook"
})

watch(text, ()=>{
  console.log("text changed")
})
</script>

<template>
  <h1> about </h1>
  {{text}}
  <button @click="changeText"> change text</button>
</template>

<style scoped>
</style>