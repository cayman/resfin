<template>
  <a :href="href" :target="link.urlTarget || '_info'" :title="link.desc || link.code">
    <img v-if="link.icon" :src="link.iconSrc" height="16px" width="16px">
    <span v-if="$root.gt850">{{ link.name }}</span>
    <span v-else-if="$root.gt600">{{ link.label }}</span>
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
        const win = window.open(this.href,'_info','menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes');
        win.location = this.href;
        win.focus();
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var.scss";
  a {
    padding: $px2;
    line-height: $px20;
    font-family: $font-family-condensed;
    color: $text-color-link;
    text-decoration: none;
    cursor: pointer;
    img {
      margin: auto;
      vertical-align: middle;
      display: inline-block;
      margin-right: $px2;
    }
  }

</style>
<!--https://ru.investing.com/equities/alrosa-ao-commentary-->
<!--https://ru.investing.com/equities/alrosa-ao-commentary-->