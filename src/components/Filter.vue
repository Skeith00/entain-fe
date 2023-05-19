<template>
  <div>
    <label>Filter by Category:</label>
    <select @change="setCategory">
      <option value="">All</option>
      <option v-for="item in filterData" :key="item.value" :value="item.value">{{ item.text }}</option>
    </select>
  </div>
</template>
  
<script>    
  export default {
      data() {
        return {
          filterData :  [
            { "text": "Greyhound Racing", "value": "9daef0d7-bf3c-4f50-921d-8e818c60fe61"},
            { "text": "Harness Racing", "value": "161d9be2-e909-4326-8c2c-35ed71fb460b"},
            { "text": "Horse Racing", "value": "4a2788f8-e825-4d36-9894-efd4baf1cfae"}
          ]
        }
      },
      methods: {
        setCategory(event) {
          // Updates the category vuex state with the value of the new value selected in the Category dropdown
          this.$store.dispatch('updateCategory', event.target.value)
        },
      }
  }
</script>

<style scoped>
label {
  margin-right: 20px;
}
</style>
