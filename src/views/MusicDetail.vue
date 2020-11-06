<template>
  <div>
    <h3>PortfolioGang {{$route.params.test}}</h3>
    <v-btn @click="goLoad">Load</v-btn>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
name: "Portfolio",
  methods: {
  goLoad() {
    this.$router.push({name: 'comments',
    params: {prenom: this.$route.params.prenom}})
  }
  }
}
</script>

<style scoped>

</style>