<template>
  <div class="field">
    <span class="field__label">
      <a :href="hrefSearch" target="_search" :title="link.desc || link.name">
        {{ link.varName || link.name }}:
      </a>
    </span>
    <span class="field__input">
      <input type="text" v-model="filedRef" size="18"/>
    </span>
    <a v-if="hrefTest" :href="hrefTest" class="field__link" target="_test" :title="link.desc || link.code">
      <i class="fa fa-external-link" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
import {replaceUrl} from '../utils';
import form from './form'
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
      set (ref) {
        this.setSecurityField(this.link.var, ref);
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
  .field {
    padding-bottom: 10px;
    &__label {
      font-weight: 600;
      float: left;
      width: 100px;
      line-height: 25px;
      a {
        cursor: pointer;
        color: royalblue;
        text-decoration: none;
      }
    }
    &__input {
      line-height: 25px;
    }
    &__link {
      padding: 5px 5px 5px 5px;
      line-height: 25px;
      cursor: pointer;
      color: royalblue;
      text-decoration: none;
    }
  }
</style>
