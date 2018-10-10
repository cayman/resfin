<template>
  <div class="price" :class="{bg_up: change > 0, bg_down: change < 0}">
    <strong>{{price}}</strong> <!--&#8381;-->
    <span :class="{zero: change === 0, up: change > 0, down: change < 0}">
      {{changeSign}}{{change}} ({{changeSign}}{{percent}}%)
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
    moex () {
      return this.$store.state.security.moex;
    },
    price () {
      return this.$store.getters.securityPrice;
    },
    change () {
      return this.$store.getters.securityPriceChange;
    },
    changeSign () {
      return this.change > 0 ? '+' : '';
    },
    percent () {
      return this.$store.getters.securityPriceChangePercent;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .price {
    margin: 0 10px 0 10px;
    & + .bg_up {
      background-color: honeydew;
    }
    & + .bg_down {
      background-color: lavenderblush;
    }
    & + .bg_zero {
      background-color: azure;
    }
    .up {
      color: green;
    }
    .down {
      color: red;
    }
    .zero {
      color: blue;
    }
  }

</style>
