<template>
  <div class="price">
    <span>
      <span class="price__value" >{{price | currency}}</span>
      <span class="price__percent" :class="{zero: !change, up: change > 0, down: change < 0}">
        <span v-if="$root.gt430">{{changeSign}}{{change}}</span>
        <span v-if="true">({{changeSign}}{{percent}}%)</span>
      </span>
      <security-liquidity class="price__liquidity"/>
    </span>
    <security-account-price v-if="loaded" class="price__portfolio" v-for="(account, code) in tradesAccounts"
                            :key="code" :account="account">
    </security-account-price >
  </div>
</template>

<script>
import SecurityLinks from '../links/SecurityLinks.vue'
import SecurityAccountPrice from './SecurityAccountPrice.vue'
import SecurityLiquidity from './SecurityLiquidity.vue'
export default {
  name: 'security-price',
  components: { SecurityLinks, SecurityAccountPrice, SecurityLiquidity },
  computed: {
    securityLoaded () {
      return !this.$store.state.security.loading;
    },
    loaded () {
      return this.securityLoaded && !this.$store.state.trades.loading;
    },
    price () {
      return this.$store.getters.securityPrice;
    },
    securityLevel () {
      return this.$store.getters.securityLevel;
    },
    securityVolume () {
      return this.$store.getters.securityVolume;
    },
    securityStatus () {
      return this.$store.getters.securityStatus;
    },
    change () {
      return this.$store.getters.securityPriceChange;
    },
    changeSign () {
      return this.change > 0 ? '+' : '';
    },
    percent () {
      return this.$store.getters.securityPriceChangePercent;
    },
    tradesAccounts () {
      return this.$store.getters.tradeAccounts;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var";

  .price {
    height: 20px;
    overflow: hidden;

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
      font-family: $font-family-condensed;
      font-weight: $font-weight-bold;
    }

    &__percent {
      font-family: $font-family-condensed;
      span {
        padding-left: $px3;
      }
    }

    &__liquidity {
      font-family: $font-family-condensed;
      padding-left: $px5;
    }

    &__portfolio {
      float: right;
      margin-left: $px5;
      font-family: $font-family-condensed;
    }
  }
</style>
