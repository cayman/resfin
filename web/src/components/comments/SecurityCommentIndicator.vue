<template>
  <span class="indicator">
    <a v-if="!small" :title="_indicator.desc" class="indicator__label">
      {{ _indicator.name || _indicator.code  }}:
    </a>
    <span class="indicator__value" :title="_indicator.desc" :class="{bad, good}">
       {{ indicator.value }}&nbsp;
    </span>
  </span>
</template>

<script>
import {evalCriterion} from '../../utils';

export default {
  name: 'security-comment-indicator',
  props: {
    indicator: {
      type: Object,
      required: true
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    indicators() {
      return this.$store.state.indicators.list
    },
    _indicator() {
      return this.indicators.find(indicator => indicator.code === this.indicator.code) || this.indicator;
    },
    bad() {
      return evalCriterion(this._indicator.bad, this.indicator.value);
    },
    good() {
      return evalCriterion(this._indicator.good, this.indicator.value);
    }
  },
  methods: {
    editComment() {
      this.$store.dispatch('editComment', this.comment);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var.scss";

  .indicator {
    &__label {
      font-style: $font-family-condensed;
      color: $text-color-label;
      font-weight: $font-weight-bold;
    }
    &__value {
      color: blue;
      font-weight: $font-weight-lite;
    }
  }
  .good {
    color: green;
  }
  .bad {
    color: red;
  }
</style>
