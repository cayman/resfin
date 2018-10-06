<template>
  <div id="app">
    <div v-if="page" class="header">
      <menu-bar @change="fetchSecurities"></menu-bar>
    </div>
    <login v-if="!page" class="main"/>
    <securities-content v-else class="main"/>
  </div>
</template>

<script>
import SecuritiesContent from './components/SecuritiesContent.vue'
import MenuBar from './components/MenuBar.vue'
import Login from './components/Login.vue'

export default {
  name: 'app',
  components: { Login, MenuBar, SecuritiesContent },
  created() {
    if (this.page) {
      this.$store.dispatch('authenticated');
    }
  },
  computed: {
    page () {
      return this.$store.getters.page;
    }
  },
  methods: {
    fetchSecurities (page) {
      this.$store.dispatch('fetchSecuritiesInfo', page)
    }
  }
}
</script>

<style>
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: whitesmoke;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 12px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin: 0;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    max-width: 600px;
    min-width: 400px;
  }
  .header {
    background: gainsboro;
    flex: 0 0 10px;
  }
  .main {
     flex: 1 1 300px;
   }
  .good {
    color: green;
  }
  .bad {
    color: red;
  }
  .normal {
    color: blue;
  }
</style>
