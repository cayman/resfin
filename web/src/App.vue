<template>
  <div id="app">
    <div class="header">
      <menu-bar @change="fetchStocks"></menu-bar>
    </div>
    <stocks-content class="main"/>
  </div>
</template>

<script>
import StocksContent from './components/StocksContent.vue'
import MenuBar from './components/MenuBar.vue'

export default {
  name: 'app',
  components: { MenuBar, StocksContent },
  created() {
    this.fetchStocks(this.$store.state.page);
    this.$store.dispatch('fetchLinks');
    this.$store.dispatch('fetchSectors');
    this.$store.dispatch('fetchAccounts');
  },
  methods: {
    fetchStocks (page) {
      this.$store.dispatch('fetchStocks', page)
        .then(stocks => {
           if(stocks.length) {
             this.$store.dispatch('fetchStockInfo', stocks[0].id);
           }else {
             this.$store.dispatch('newStock', page);
           }
        });
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
