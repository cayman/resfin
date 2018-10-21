<template>
  <div class="price">
    <span :class="{bg_up: change > 0, bg_down: change < 0, bg_zero: !change}" >
      <span class="price__value" >{{price | currency}}</span> <!--&#8381;-->
      <span class="price__percent" :class="{zero: !change, up: change > 0, down: change < 0}">
        &nbsp;{{changeSign}}{{change}} ({{changeSign}}{{percent}}%)
      </span>
    </span>
    <span><span class="price__label">Листинг:</span>{{ securityLevel }}</span>
    <span class="price__portfolio" v-for="(account, code) in tradesAccounts" :key="code">
      <span class="price__label">{{ account.name }}:</span> {{ account.avg * account.volume | currency }} &#8381;
    </span>
  </div>
</template>

<script>
import SecurityLinks from './links/SecurityLinks.vue'
import SecurityChart from './chart/SecurityChart.vue'
export default {
  name: 'security-price',
  components: { SecurityLinks, SecurityChart },
  computed: {
    price () {
      return this.$store.getters.securityPrice;
    },
    securityLevel () {
      return this.$store.getters.securityLevel;
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
  @import "../assets/var.scss";

  .price {
    font-size: $font-size-base;
    margin: 0 $px10;
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
      font-weight: $font-weight-bold;
    }

    &__percent {
      font-family: $font-family-condensed;
    }

    &__label {
      color: $text-color-label;
      font-family: $font-family-condensed;
      padding-left: $px5;
    }

    &__portfolio {
      float: right;
      font-family: $font-family-condensed;
      // margin-left: 5px;
    }
  }



</style>
