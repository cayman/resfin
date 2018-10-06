<template>
  <span :class="{good: percent >= 9, bad: percent <= 3, normal: percent > 3 && percent < 9 }">
    <span v-if="dividend && dividendVisible">{{Number(dividend.toFixed(4))}}
      <span v-if="percent && percentVisible"> ({{percent}} &#37;)</span>
    </span>
    <span v-else>{{percent}} &#37;</span>
  </span>
</template>

<script>
  import {percent} from '../utils';
  export default {
    name: 'dividend',
    props: {
      dividend: {
        type: Number,
        required: false
      },
      dividendVisible: {
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
    },
    computed: {
      percent () {
        return percent(this.dividend, this.price);
      }
    }
  }
</script>

<style scoped>

</style>