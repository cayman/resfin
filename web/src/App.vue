<template>
  <div id="app">
    <template v-if="isAuthenticated">
      <div  class="header">
        <menu-bar></menu-bar>
      </div>
      <securities-content class="main"/>
    </template>
    <!--<login v-else class="main"/>-->
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
    if (this.isAuthenticated) {
      this.$store.dispatch('authenticated');
    } else {
      this.$store.dispatch('signInPopup', this.params).then(user => {
        if (user && user.id) {
          this.$store.dispatch('authenticated');
        }
      });
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated;
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

  button, input, select, textarea {
    font-family : inherit;
    font-size   : 100%;

    -webkit-box-sizing: border-box; /* For legacy WebKit based browsers */
    -moz-box-sizing: border-box; /* For legacy (Firefox <29) Gecko based browsers */
    box-sizing: border-box;
  }
</style>
