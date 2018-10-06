<template>
  <div class="info">
    <template v-if="stock.id">
      <stock-links></stock-links>
      <h3>
        <a class="info__action" @click="editStock">
          <i class="fa fa fa-pencil" aria-hidden="true" ></i>
        </a>
        <span class="info__title">{{ stock.desc }}</span>&nbsp;
        <span class="info__sector">{{ stock.sector }}</span>
      </h3>
      <stock-chart/>
      <stock-price/>
      <div class="info__menu">
        <a class="info__action" @click="addComment">
          <i class="fa fa-commenting-o" aria-hidden="true" title="Добавить комментарий"></i>
        </a>
        <a class="info__action" @click="addTrade('dividend')" title="Добавить дивиденд">
          <i class="fa fa-money" aria-hidden="true"></i>
        </a>
        <a class="info__action" @click="addTrade('buy')" title="Купить">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </a>
        <a class="info__action" @click="addTrade('sell')" title="Продать">
          <i class="fa fa-minus" aria-hidden="true"></i>
        </a>
      </div>
      <stock-comments/>
      <stock-trades/>
    </template>
  </div>
</template>

<script>
import StockLinks from './StockLinks.vue'
import StockChart from './StockChart.vue'
import StockPrice from './StockPrice.vue'
import StockTrades from './StockTrades.vue'
import StockComments from './StockComments';
export default {
  name: 'stock-info',
  components: { StockLinks, StockChart, StockPrice, StockTrades, StockComments },
  computed: {
    stock () {
      return this.$store.state.stock.model;
    },
    accounts () {
      return this.$store.state.accounts.list ;
    },
    trades () {
      return this.$store.state.trades.list;
    },
    lastTrade () {
      return this.trades.length > 0 ? this.trades[this.trades.length - 1] : null;
    },
    stockPrice () {
      return this.$store.getters.stockPrice;
    }
  },
  methods: {
    editStock() {
      this.$store.commit('editingStock', true);
    },
    addComment() {
      this.$store.dispatch('newComment', {stock: this.stock.code, price: this.stockPrice});
    },
    addTrade(type) {
      this.$store.dispatch('newTrade', {...this.lastTrade, type} ||
        { stock: this.stock.code, account: this.accounts[0].code, type});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .info {
    height: 100%;
    background-color: white;
    overflow-y: auto;
    overflow-x: hidden;
    &__title {
      font-weight: 500;
      margin-right: 5px;
    }
    &__menu {
      font-weight: 400;
      margin: 5px 0;
      padding: 5px 10px 0 10px;
      border-top: 1px solid lightsteelblue;
      background-color: aliceblue;
    }
    &__sector {
      color: cornflowerblue;
      margin-right: 5px;
    }
    &__action {
      color: darkblue;
      cursor: pointer;
      margin-right: 5px;
      padding: 5px;
      border-radius: 2px;
      &:hover {
        background-color: cornflowerblue;
        color: white;
      }
    }
    h3 {
      width: 100%;
      margin: 5px 10px 0 10px;
      font-size: 13px;
      font-weight: 400;
      .bg_up {
        background-color: honeydew;
      }
      .bg_down {
        background-color: lavenderblush;
      }
      .bg_zero {
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
  }
</style>
