<template style="background-color: gray">
  <div id="app">
    <v-app
        dark
    >
      <v-app-bar app
                 color="black"
                 dark
                 id="nav" class="d-flex align-center"
      >
        <router-link to="/">Player</router-link>
        <v-spacer>|</v-spacer>
        <router-link to="/detail/1"> Artiste</router-link>
      </v-app-bar>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: whitesmoke;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
