<template>
  <ul>
    <li v-for="link in links" :key="link.id">
      <security-link :link="link"/>
    </li>
  </ul>
</template>

<script>
  import SecurityLink from './SecurityLink.vue'
  export default {
    name: 'security-links',
    components: { SecurityLink },
    computed: {
      links () {
        return this.$store.state.links.list;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var.scss";
  ul {
    list-style-type: none;
    padding: $px5;
    background-color: $bg-color-toolbar;
    li {
      float: left;
      padding: $px2;
      a {
        display: block;
      }
    }
  }

</style>