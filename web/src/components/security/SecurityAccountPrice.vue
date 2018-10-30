<template>
  <span class="portfolio">
    <span class="portfolio__label">{{ account.name }}: </span>
    <template v-if="price">
       <span class="portfolio__value">{{ price * account.volume | currency}}</span>
       <span class="portfolio__percent" :class="{zero: !change, up: change > 0, down: change < 0}">
         <span v-if="$root.gt470">{{changeSign}}{{change | currency}}</span>
         <span v-if="true">({{changeSign}}{{percent}}%)</span>
       </span>
    </template>
   <template v-else>
     <span class="portfolio__value">{{ account.avg * account.volume | currency}}</span>
   </template>
  </span>
</template>

<script>
import SecurityLinks from '../links/SecurityLinks.vue'
import SecurityChart from '../chart/SecurityChart.vue'
import {percent} from '../../utils';
export default {
  name: 'security-account-price',
  components: { SecurityLinks, SecurityChart },
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  computed: {
    price () {
      return this.$store.getters.securityPrice;
    },
    change () {
      return (this.price - this.account.avg) * this.account.volume;
    },
    changeSign () {
      return this.change > 0 ? '+' : '';
    },
    percent () {
      return percent(this.price - this.account.avg, this.account.avg);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var";

  .portfolio {
    font-family: $font-family-condensed;
    .up {
      color: $text-color-up;
    }
    .down {
      color: $text-color-down;
    }
    .zero {
      color: $text-color-zero;
    }

    .bg_up {
      background-color: $bg-color-up;
    }
    .bg_down {
      background-color: $bg-color-down;
    }
    .bg_zero {
      background-color: $bg-color-zero;
    }

    &__value {
      font-weight: $font-weight-regular;
    }

    &__percent {
      font-weight: $font-weight-lite;
      span {
        padding-left: $px3;
      }
    }

    &__label {
      color: $text-color-label;
    }
  }
</style>
