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
          <security-trade :key="_trade.id" :trade="_trade"></security-trade>
          <security-trade-form v-if="editing && tradeId===_trade.id" :key="_trade.id + '_edit'"></security-trade-form>
        </template>
        <security-trades-result :account="account" :key="code + '_footer'"></security-trades-result>
        <security-trade-form v-if="editing && !tradeId && tradeAccountCode === code" :key="code + '_add'"></security-trade-form>
      </template>
      <security-trade-form v-if="editing && emptyTrades" key="trade_add"></security-trade-form>
    </table>

  </div>
</template>

<script>
  import SecurityTrade from './SecurityTrade.vue'
  import SecurityTradeForm from './SecurityTradeForm.vue'
  import SecurityTradesResult from "./SecurityTradesResult";
  export default {
    name: 'security-trades',
    components: {SecurityTrade, SecurityTradeForm, SecurityTradesResult },
    computed: {
      accounts () {
        return this.$store.getters.tradeAccounts;
      },
      editing () {
        return this.$store.state.trade.editing;
      },
      tradeAccountCode () {
        return this.$store.state.trade.model.accountCode;
      },
      tradeId () {
        return this.$store.state.trade.model.id;
      },
      emptyTrades () {
        return !this.accounts[this.tradeAccountCode];
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