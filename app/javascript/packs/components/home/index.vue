<template>
  <div>
    <h4>{{message}}</h4>
    <Card/>
  </div>
</template>

<script>
  import Card from '../card/index.vue' ;

  export default {
    data () {
      return {
        message: "Wellcome to Component Home Page!"
      }
    },
    components: {
      'Card': Card
    }
  }
</script>

<style scoped>
</style>
