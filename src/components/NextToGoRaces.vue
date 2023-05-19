<script setup>
import Filter from './Filter.vue'
import Races from './Races.vue'
</script>

<template>
  <div class="center">
    <Filter/>
    <Races/>
  </div>
</template>

<style scoped>
  .center {
    margin: auto;
    width: 500px;
    padding: 10px;
    margin-top: 20px;
  }
</style>
