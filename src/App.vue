<script setup>
import Header from './components/Header.vue'
import Filter from './components/Filter.vue'

import NextToGoRaces from './components/NextToGoRaces.vue'

</script>

<template>
  <div>
    <Header :title="title" :subtitle="subtitle"/> 
    <NextToGoRaces/> 
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Entain FrontEnd Technical Task',
        subtitle: 'Next to go races',
      };
    },
  };
</script>

<style>
body {
  font-family: sans-serif;
}
</style>