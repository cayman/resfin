<template>
  <div class="field">
    <span class="field__label">
      <a :href="hrefSearch" target="_search" :title="link.desc || link.name">
        {{ link.varName || link.name }}:
      </a>
    </span>
    <span class="field__input">
      <input type="text" v-model="filedRef" style="width: 250px"/>
    </span>
    <a v-if="hrefTest || hrefSearch" :href="hrefTest || hrefSearch" class="field__link" target="_test" :title="link.desc || link.code">
      <i class="fa fa-external-link" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
import {replaceUrl} from '../../utils';
import form from '../form'
export default {
  name: 'security-form-var',
  mixins: [form],
  props: {
    link: {
      type: Object,
      require: true
    }
  },
  computed: {
    security () {
      return this.$store.state.security.model;
    },
    filedRef: {
      get () {
        return this.security[this.link.var];
      },
      set (value) {
        this.$store.commit('setSecurityField', {name: this.link.var, value});
      }
    },
    hrefSearch () {
      return replaceUrl(this.link.search, 'name', this.security.name);
    },
    hrefTest () {
      return replaceUrl(this.link.url, 'var', this.filedRef, this.link.varLowerCase);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var";
  .field {
    padding-bottom: 10px;
    &__label {
      float: left;
      width: 100px;
      font-weight: $font-weight-bold;
      font-family: $font-family-condensed;
      font-size: $font-size-smaller;
      color: $text-color-label;
      line-height: $px25;
      a {
        cursor: pointer;
        color: $text-color-link;
        text-decoration: none;
      }
    }
    &__input {
      line-height: $px25;
    }
    &__link {
      padding: $px5;
      line-height: $px25;
      cursor: pointer;
      color: $text-color-link;
      text-decoration: none;
    }
  }
</style>
