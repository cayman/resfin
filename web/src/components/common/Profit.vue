<template>
  <span :class="{zero: profit === 0, up: profit > 0, down: profit < 0}">
    <span v-if="valueVisible">{{profitSign}}{{profit | currency}}({{profitSign}}{{percent | currency}}<span v-if="!small">&nbsp;&#37;</span>)
    </span><span v-else>{{profitSign}}{{percent | currency}}<span v-if="!small">&nbsp;&#37;</span></span>
  </span>
</template>

<script>
  import {percent} from '../../utils';
  export default {
    name: 'profit',
    props: {
      expense: {
        type: Number,
        required: true
      },
      income: {
        type: Number,
        required: true
      },
      valueVisible: {
        type: Boolean,
        required: false,
        default: false
      },
      small: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    computed: {
      profit () {
        return this.income - this.expense;
      },
      profitSign () {
        return this.profit > 0 ? '+' : '';
      },
      percent () {
        return percent(this.profit, this.expense);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var.scss";
  .up {
    color: $text-color-profit;
  }
  .down {
    // color: red;
    color: $text-color-loss;
  }
  .zero {
    color: $text-color-normal;
  }
</style>