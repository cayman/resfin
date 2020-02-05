<template>
  <ul>
    <li v-for="link in links" :key="link.id" :class="{ wide: $root.gt370, tight: !$root.gt350 }">
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
      security () {
          return this.$store.state.security.model;
      },
      links () {
        return this.$store.state.links.list.filter(link => this.security[link.var]);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var.scss";
  ul {
    list-style-type: none;
    padding: $px5;
    background-color: $bg-color-white;
    border-bottom: 1px solid $bg-color-sidebar;
    li {
      float: left;
      padding: $px2;
      a {
        display: block;
      }
    }
    li.wide {
      padding: $px2 $px3;
    }
    li.tight {
      padding: $px2 $px1;
    }
  }

</style>