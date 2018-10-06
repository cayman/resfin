<template>
  <div>
    <table class="trades">
      <template v-for="(account, code) in accounts" >
        <thead :key="code + '_header'">
          <tr class="header">
            <th class="header__type" colspan="2">
              {{ account.name }}
            </th>
            <th class="header__count">
              Кол.
            </th>
            <th class="header__price">
              Цена
            </th>
            <th class="header__percent">
              &#37;
            </th>
            <th class="header__sum">
              Сумма
            </th>
            <!--<th class="header__commission">-->
              <!--Ком.-->
            <!--</th>-->
            <th class="header__result">
              Итого
            </th>
          </tr>
        </thead>
        <template v-for="_trade in account.trades" >
          <stock-trade :key="_trade.id" :trade="_trade"></stock-trade>
          <stock-trade-form v-if="editing && tradeId===_trade.id" :key="_trade.id + '_edit'"></stock-trade-form>
        </template>
        <stock-trades-result :account="account" :key="code + '_footer'"></stock-trades-result>
        <stock-trade-form v-if="editing && tradeAccount === code && !tradeId" :key="code + '_add'"></stock-trade-form>
      </template>
      <stock-trade-form v-if="editing && emptyTrades" key="trade_add"></stock-trade-form>
    </table>

  </div>
</template>

<script>
  import StockTrade from './StockTrade.vue'
  import StockTradeForm from './StockTradeForm.vue'
  import StockTradesResult from "./StockTradesResult";
  export default {
    name: 'stock-trades',
    components: {StockTrade, StockTradeForm, StockTradesResult },
    computed: {
      accounts () {
        return this.$store.getters.tradeAccounts;
      },
      editing () {
        return this.$store.state.trade.editing;
      },
      tradeAccount () {
        return this.$store.state.trade.model.account;
      },
      tradeId () {
        return this.$store.state.trade.model.id;
      },
      emptyTrades () {
        return !this.accounts[this.tradeAccount];
      },
    },
  }
</script>

<style lang="scss" scoped>
  .trades {
    width: 100%;
    border-collapse: collapse;
    // border: 1px solid lightsteelblue;
    margin: 5px 0;
    th, td {
      padding: 3px 0 3px 5px;
      &:first-child {
        padding-left: 10px;
      }
      &:last-child {
        padding-right: 10px;
      }
    }
  }

  .header {
    font-size: 11px;
    font-weight: 500;
    font-stretch: condensed;
    background-color: aliceblue;

    &__type {
      width: 40px;
    }
    &__count {
      text-align: right;
      width: auto;
     }
    &__price {
      text-align: right;
      width: auto;
    }
    &__percent {
      text-align: right;
      width: auto;
    }
    &__sum {
      text-align: right;
      width: auto;
    }
    &__commission {
      text-align: right;
      width: auto;
    }
    &__result {
      text-align: right;
      width: auto;
    }
  }

  .footer {
    font-size: 11px;
    font-weight: 500;
    font-stretch: condensed;
    background-color: beige;

    &__type {
      text-align: right;
    }
    &__count {
      text-align: right;
      width: auto;
    }
    &__price {
      text-align: right;
      width: auto;
    }
    &__percent {
      text-align: right;
      width: auto;
    }
    &__sum {
      text-align: right;
      width: auto;
      color: grey;
    }
    &__commission {
      text-align: right;
      width: auto;
      color: grey;
    }
    &__result {
      text-align: right;
      width: auto;
    }
    &__action {
      width: auto;

    }
  }
</style>