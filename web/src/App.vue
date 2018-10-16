<template>
  <div id="app">
    <template v-if="isAuthenticated">
      <div class="header">
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

<style lang="scss">
  @import "./assets/var.scss";

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
    font-family: $font-family-base;
    font-weight: $font-weight-regular;
    font-size: $font-size-base;
  }

  * {
    box-sizing: border-box;
  }

  textarea, input, select, button  {
    font-family: $font-family-base;
    font-weight: $font-weight-regular;
    font-size: $font-size-base;
  }
  a {
    color: $text-color-link;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      color: $text-color-link-hover;
    }
    a:hover, a:visited, a:link, a:active
    {
      text-decoration: none;
    }
  }

  body {
    background-color: $bg-color-white;
    color: $text-color-base;
  }
  #app {
    text-align: left;
    margin: 0;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    width: 640px;
  }
  .header {
    flex: 0 0 30px;
  }
  .main {
     flex: 1 1 auto;
   }

  button, input, select, textarea {
    font-family : inherit;
    font-size   : 100%;

    -webkit-box-sizing: border-box; /* For legacy WebKit based browsers */
    -moz-box-sizing: border-box; /* For legacy (Firefox <29) Gecko based browsers */
    box-sizing: border-box;
  }
</style>
