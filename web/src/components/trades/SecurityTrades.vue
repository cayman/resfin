<template>
  <table class="trades" v-if="loaded">
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
          <th class="header__commission">
            Ком.
          </th>
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
</template>

<script>
  import SecurityTrade from './SecurityTrade.vue'
  import SecurityTradeForm from './SecurityTradeForm.vue'
  import SecurityTradesResult from './SecurityTradesResult';
  export default {
    name: 'security-trades',
    components: {SecurityTrade, SecurityTradeForm, SecurityTradesResult },
    computed: {
      loaded () {
        return !this.$store.state.trades.loading;
      },
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
  @import "../../assets/var.scss";
  .trades {
    width: 100%;
    max-width: 100%;
    overflow: scroll;
    border-collapse: collapse;
    // border: 1px solid lightsteelblue;
    margin: $px5 0;
    th, td {
      padding: 3px 0 3px $px5;
      &:first-child {
        padding-left: $px10;
      }
      &:last-child {
        padding-right: $px10;
      }
    }
  }

  .header {
    font-family: $font-family-condensed;
    font-weight: $font-weight-bold;
    background-color: $bg-color-row-header;
    font-size: $font-size-smaller;
    color: $text-color-label;

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
</style>