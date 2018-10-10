<template>
  <a v-if="href" target="_info" @click.stop="open" :title="link.desc || link.code">
    <img v-if="link.iconSrc" :src="link.iconSrc" height="16px" width="16px">
    {{ link.label }}
  </a>
</template>

<script>
  import {replaceUrl} from '../../utils';
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
    },
    methods: {
      open () {
        window.open(this.href,'_info','menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes').focus();
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
<!--https://ru.investing.com/equities/alrosa-ao-commentary-->
<!--https://ru.investing.com/equities/alrosa-ao-commentary-->