<template>
  <ul>
    <li v-for="link in links" :key="link.id">
      <stock-link :link="link"/>
    </li>
  </ul>
</template>

<script>
  import StockLink from './StockLink.vue'
  export default {
    name: 'stock-links',
    components: { StockLink },
    computed: {
      links () {
        return this.$store.state.links.list;
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: aliceblue;
  }

  li {
    float: left;
    color: royalblue;
    a {
      display: block;
      text-align: center;
      padding: 5px 0 5px 5px;
      text-decoration: none;
      cursor: pointer;
    }

  }

</style>