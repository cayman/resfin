<template>
  <div class="field" v-if="remainingIndicators.length > 0">
    <span class="field__label">
      <select v-model="fieldIndicatorCode">
        <option disabled value="">Индикатор</option>
        <option v-for="indicator in remainingIndicators" :key="indicator.code" :value="indicator.code" :label="indicator.name"></option>
      </select>
    </span>
    <span class="field__input">
      <input type="number" v-model="fieldIndicatorValue" step="any"  style="width: 80px"/>
    </span>
  </div>
</template>

<script>
import form from '../form'
import {parseValue} from '../../utils';
export default {
  name: 'security-comment-form-indicator',
  mixins: [form],
  props: {
    index: {
      type: Number,
      required: 0
    }
  },
  computed: {
    comment () {
      return this.$store.state.comment.model;
    },
    indicators () {
      return this.$store.state.indicators.list;
    },
    fieldIndicators () {
      return this.comment.indicators || [];
    },
    remainingIndicators () {
      return this.indicators.filter(indicator => !this.fieldIndicators.slice(0, this.index).some(selected => selected.code === indicator.code));
    },
    fieldIndicator () {
      return this.fieldIndicators[this.index] || { code: null, value: null};
    },
    fieldIndicatorCode: {
      get () {
        return this.fieldIndicator.code;
      },
      set (code) {
        this.setIndicatorField(this.index, code, this.fieldIndicator.value);
      }
    },
    fieldIndicatorValue: {
      get () {
        return this.fieldIndicator.value;
      },
      set (value) {
        this.setIndicatorField(this.index, this.fieldIndicator.code, value);
      }
    },
  },
  methods: {
    setIndicatorField(index, code, value) {
      console.log('setIndicatorField:', code, value);
      const item = {code: parseValue(code), value: parseValue(value, Number)};
      this.$store.commit('spliceCommentField', {name:'indicators', index, value: item, type: Object});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var.scss";
  .field {
    padding-bottom: $px10;
    &__label {
      float: left;
      width: 100px;
      font-weight: $font-weight-regular;
      font-family: $font-family-condensed;
      color: $text-color-label;
      line-height: $px25;
    }
    &__input {
      padding-right: $px5;
    }
  }
</style>
