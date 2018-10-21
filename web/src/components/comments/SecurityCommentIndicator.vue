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
  name: 'security-indicator',
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
    a {
      color: $text-color-label;
    }
    &__label {
      font-weight: $font-weight-bold;
      font-family: $font-family-condensed;
      font-size: $font-size-smaller;
    }
    &__value {
      color: $text-color-normal;
      &:hover {
        font-weight: $font-weight-boldest;
      }
    }
  }
  .good {
    color: $text-color-good;
  }
  .bad {
    color: $text-color-bad;
  }
</style>
