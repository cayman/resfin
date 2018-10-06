<template>
  <div class="price" :class="{bg_up: change > 0, bg_down: change < 0}">
    <strong>{{price}}</strong> <!--&#8381;-->
    <span :class="{zero: change === 0, up: change > 0, down: change < 0}">
      {{changeSign}}{{change}} ({{changeSign}}{{percent}}%)
    </span>
  </div>
</template>

<script>
import StockLinks from './StockLinks.vue'
import StockChart from './StockChart.vue'
export default {
  name: 'stock-price',
  components: { StockLinks, StockChart },
  computed: {
    micex () {
      return this.$store.state.stock.micex;
    },
    price () {
      return this.$store.getters.stockPrice;
    },
    change () {
      return this.$store.getters.stockPriceChange;
    },
    changeSign () {
      return this.change > 0 ? '+' : '';
    },
    percent () {
      return this.$store.getters.stockPriceChangePercent;
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
