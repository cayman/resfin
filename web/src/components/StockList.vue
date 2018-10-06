<template>
  <div class="stock-list">
    <div class="stock-list__item" :class="{active: currentStock.id === stock.id}" v-for="(stock, idx) in stocks" :key="idx" @click="select(stock.id)">
      <a class="stock-list__code" :title="stock.desc + ' ' + stock.type" >{{ stock.code }}</a>
      <a class="stock-list__name" :title="stock.desc + ' ' + stock.type">{{ stock.name }} {{ stock.type }}</a>
      <span v-if="page !== 'f' && stock.favorite && (!stock.portfolio || page === 'p')" class="stock-list__icon">
        <i class="fa fa-bookmark-o" aria-hidden="true"></i>
      </span>
      <span v-if="page !== 'p' && stock.portfolio" class="stock-list__icon">
        <i class="fa fa-briefcase" aria-hidden="true"></i>
      </span>
    </div>
    <a v-if="page !== 'p'" class="stock-list__action" @click="addStock">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
  import StockLinks from './StockLinks';
  export default {
    name: 'stock-list',
    components: {
      StockLinks
    },
    computed: {
      stocks () {
        return this.$store.state.stocks.list;
      },
      page () {
        return this.$store.state.page;
      },
      currentStock () {
        return this.$store.state.stock.model;
      }
    },
    methods: {
      select (stockId) {
        this.$store.dispatch('fetchStockInfo', stockId);
      },
      addStock() {
        this.$store.dispatch('newStock', this.page);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .stock-list {
    text-align: left;
    background: lightsteelblue;
    border: darkblue;
    padding: 5px;
    &__action {
      padding: 0 5px;
      border: 1px solid cornflowerblue;
      cursor: pointer;
      margin-right: 5px;
      border-radius: 2px;
      &:hover {
        background-color: cornflowerblue;
        color: white;
      }
    }
    &__item {
      line-height: 20px;
      cursor: pointer;
    }
    .active {
      font-weight: bold;
      .stock-list__name {
        background-color: #c1dce6;
        border: 1px solid powderblue;
        border-radius: 2px;
        font-weight: normal;
      }
    }
    &__code {
      float: left;
      width: 50px;
    }
    &__name {
      font-stretch: condensed;
    }
    &__icon {
      float: right;
      padding: 0 5px;
      text-align: center;
      width: 10px;
    }
  }

</style>