<template>
  <span :class="{good: percent >= 8, bad: percent <= 4, normal: percent > 4 && percent < 8 }">
    <span v-if="interestVal && interestVisible">{{ interestVal | currency }}
      <span v-if="percent && percentVisible">({{percent}}<span v-if="!small">&nbsp;&#37;</span>)</span>
    </span>
    <span v-else>{{percent}}<span v-if="!small">&nbsp;&#37;</span></span>
  </span>
</template>

<script>
  import {percent} from '../../utils';
  export default {
    name: 'interest-percent',
    props: {
      interest: {
        type: Number,
        required: false
      },
      interestVisible: {
        type: Boolean,
        required: false,
        default: true
      },
      price: {
        type: Number,
        required: false
      },
      percentVisible: {
        type: Boolean,
        required: false,
        default: true
      },
      small: {
        type: Boolean,
        required: false,
        default: false
      },
    },
    computed: {
      percent () {
        return percent(this.interest, this.price);
      },
      interestVal () {
        return this.interest !== null && this.interest !== undefined  && this.interest >=0
          ? Number(this.interest.toFixed(4)) : null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var.scss";
  .good {
    color: $text-color-good;
  }
  .bad {
    color: $text-color-bad;
  }
  .normal {
    color: $text-color-normal
  }
</style>