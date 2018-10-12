<template>
  <span class="indicator">
    <a :title="_indicator.desc" class="indicator__label">
      {{ _indicator.name || _indicator.code  }}:
    </a>
    <span class="indicator__value" :class="{bad, good}">
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
  .indicator {
    &__label {
      color: #637384;
      font-weight: bold;
    }
    &__value {
      color: blue;
    }
  }
  .good {
    color: green;
  }
  .bad {
    color: red;
  }
</style>
