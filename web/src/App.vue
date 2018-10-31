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
    } else if (this.$store.getters.isAuthentication) {
      // ждем callback от сервера
      this.$store.dispatch('signRedirectResult').then(user => {
        if (user && user.id) {
          this.$store.dispatch('authenticated');
        }
      });
    } else {
      // отправляем редирект
      this.$store.dispatch('signInWithRedirect');
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

  html {
    font-size: 15px;
  }

  * {
    max-height:1000000px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
  }

  html, body {
    height: 100vh;
  }

  body {
    margin: 0;
    background-color: $bg-color-white;
    color: $text-color-base;
    overflow: hidden;
  }

  body, textarea, input, select, button {
    font-family: $font-family-base;
    font-weight: $font-weight-regular;
    font-size: $font-size-base;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: $bg-scrollbar-track;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $bg-scrollbar-thumb;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: $bg-scrollbar-thumb-hover;
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

  #app {
    text-align: left;
    margin: 0;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    max-width: 1024px;
    // min-width: 360px;
  }
  .header {
    flex: 0 0 30px;
    flex-wrap: nowrap;
   // height: 35px;
    width: 100%;
  }
  .main {
    margin: 0;
    width: 100%;
    height: 100%;
    flex: 1 1 auto;
   }

  button, input, select, textarea {
    max-height:1000000px;
    font-family : inherit;
    font-size   : 100%;
    -webkit-box-sizing: border-box; /* For legacy WebKit based browsers */
    -moz-box-sizing: border-box; /* For legacy (Firefox <29) Gecko based browsers */
    box-sizing: border-box;
  }
</style>
