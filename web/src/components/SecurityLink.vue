<template>
  <a v-if="href" :href="href" target="_info" :title="link.desc || link.code">
    <img v-if="link.icon" :src="link.icon" height="16px" width="16px">
    {{ link.name || link.code }}
  </a>
</template>

<script>
  import {replaceUrl} from '../utils';
  export default {
    name: 'security-link',
    props: {
      link: {
        type: Object,
        required: true
      }
    },
    computed: {
      security () {
        return this.$store.state.security.model;
      },
      varValue () {
        return this.security[this.link.var];
      },
      href () {
        return replaceUrl(this.link.url, 'var', this.varValue, this.link.varLowerCase);
      }
    }
  }
</script>

<style lang="scss" scoped>
  a {
    line-height: 20px;
    cursor: pointer;
    color: royalblue;
    text-decoration: none;
    font-stretch: condensed;
    font-size: 10px;
    img {
      margin: auto;
      vertical-align: middle;
      display: inline-block;
    }
  }

</style>