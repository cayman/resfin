<template>
  <span :class="{small, good: percent >= 8, bad: percent <= 4, normal: percent > 4 && percent < 8 }">
    <span v-if="interest && interestVisible">{{Number(interest.toFixed(4))}}
      <span v-if="percent && percentVisible"> ({{percent}}<span v-if="!small">&nbsp;&#37;</span>)</span>
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
      }
    }
  }
</script>

<style scoped>
  .good {
    color: green;
  }
  .bad {
    color: red;
  }
  .normal {
    color: blue;
  }
  .small {
    font-size: 8px;
  }
</style>