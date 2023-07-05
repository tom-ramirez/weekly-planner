<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/global">Global</router-link>

  </div>
  <router-view/>
  <HelloWorld msg="Vite + Vue" />
</template>
