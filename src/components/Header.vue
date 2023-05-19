<template>
  <div class="header">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
  </div> 
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: false,
      },
    },
  }
</script>

<style>
  .header {
    text-align: center;
    background: #1abc9c;
    color: white;
    font-size: 30px;
    margin-top: 30px;
  }
</style>
