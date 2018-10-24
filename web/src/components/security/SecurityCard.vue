<template>
  <div class="security-card">
    <template v-if="security.id">
      <security-header class="security-card__header"/>
      <security-chart class="security-card__chart"/>
      <security-price class="security-card__price"/>
      <security-toolbar class="security-card__toolbar"/>
      <security-comments class="security-card__comments"/>
      <security-trades  class="security-card__trades"/>
    </template>
  </div>
</template>

<script>
import SecurityHeader from './SecurityHeader.vue'
import SecurityPrice from './SecurityPrice.vue'
import SecurityToolbar from './SecurityToolbar.vue'

import SecurityLinks from '../links/SecurityLinks.vue'
import SecurityChart from '../chart/SecurityChart.vue'
import SecurityTrades from '../trades/SecurityTrades.vue'
import SecurityComments from '../comments/SecurityComments';

export default {
  name: 'security-card',
  components: {
    SecurityLinks,
    SecurityHeader,
    SecurityChart,
    SecurityPrice,
    SecurityToolbar,
    SecurityTrades,
    SecurityComments
  },
  computed: {
    loaded () {
      return !this.$store.state.security.loading;
    },
    security () {
      return this.$store.state.security.model;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var";

  .security-card {
    background-color: $bg-color-white;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-regular;
    color: $text-color-base;
    padding: $px5;
    &__links {
      margin: 0;
      font-size: $font-size-smaller;
    }
    &__header {
      margin: 0 $px5;
      font-size: $font-size-middle;
    }
    &__toolbar {
      margin: $px5 $px2 $px2 $px2;;
      font-size: $font-size-middle;
    }
    &__chart {
      margin: 0;
      font-size: $font-size-base;
    }
    &__price {
      margin: 0 $px10;
      font-size: $font-size-base;
    }
    &__comments {
      margin: 0;
      font-size: $font-size-base;
    }
    &__trades {
      margin: 0;
      font-size: $font-size-base;
    }
  }
</style>
