<template>
  <div class="trades">
  <div class="trades__header">
    <span class="trades__expander" @click="expanded = !expanded">
      <i class="fa fa-compress" v-if="expanded" aria-hidden="true"></i>
      <i class="fa fa-expand" v-else aria-hidden="true"></i>
      <span class="trades__code">{{ security.code }}</span>
      <span class="trades__title">Операции</span>
    </span>
    <template v-if="expanded">
      <a class="trades__action" @click="addTrade('dividend')" title="Добавить дивиденд">
        <i class="fa fa-money" aria-hidden="true"></i>
      </a>
      <a class="trades__action" @click="addTrade('buy')" title="Купить">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </a>
      <a class="trades__action" @click="addTrade('sell')" title="Продать">
        <i class="fa fa-minus" aria-hidden="true"></i>
      </a>
    </template>
  </div>
  <table v-show="expanded" class="trades__table" v-if="loaded">
    <template v-for="(account, code) in accounts" >
      <security-trades-head :name="account.name" :key="code + '_head'"/>
      <template v-for="_trade in account.trades" >
        <security-trade-card :key="_trade.id" :trade="_trade"></security-trade-card>
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
  import SecurityTradesHead from './SecurityTradesHead.vue'
  import SecurityTradeCard from './SecurityTradeCard.vue'
  import SecurityTradeForm from './SecurityTradeForm.vue'
  import SecurityTradesResult from './SecurityTradesResult';
  export default {
    name: 'security-trades',
    components: {SecurityTradesHead, SecurityTradeCard, SecurityTradeForm, SecurityTradesResult},
    data() {
      return {
        expanded: true
      }
    },
    computed: {
      loaded() {
        return !this.$store.state.trades.loading;
      },
      accounts() {
        return this.$store.getters.tradeAccounts;
      },
      editing() {
        return this.$store.state.trade.editing;
      },
      tradeAccountCode() {
        return this.$store.state.trade.model.accountCode;
      },
      tradeId() {
        return this.$store.state.trade.model.id;
      },
      emptyTrades() {
        return !this.accounts[this.tradeAccountCode];
      },
      security () {
        return this.$store.state.security.model;
      },
      trades () {
        return this.$store.state.trades.list;
      },
      lastTrade () {
        return this.trades.length > 0 ? this.trades[this.trades.length - 1] : null;
      }
    },
    methods: {
      addTrade(typeCode) {
        this.$store.dispatch('newTrade', this.lastTrade ? {...this.lastTrade, date: null, typeCode}
          : {securityCode: this.security.code, accountCode: null, typeCode});

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var.scss";
  .trades {
    width: 100%;
    margin-bottom: 20px;
    &__header {
      margin-top: 5px;
      padding: $px5;
      color: $text-color-date;
      background-color: $bg-color-row-header;
      border-bottom: 1px solid $bg-color-sidebar;
      font-family: $font-family-base;
      font-weight: $font-weight-bold;
      font-size: $font-size-middle;
      line-height: 20px;
    }
    &__expander {
      cursor: pointer;
    }
    &__code {
      padding: $px5 0 $px5 $px10;
    }
    &__title {
      padding: $px5 $px10;
    }
    &__action {
      display: inline-block;
      background-color: $button-color;
      color: $icon-color;
      cursor: pointer;
      margin-left: $px5;
      margin-right: $px5;
      padding: 0 $px3;
      border-radius: $px1;
      line-height: normal;
      &:hover {
        background-color: $button-color-hover;
        color: $icon-color-hover;
      }
    }
    &__table {
      width: 100%;
      max-width: 100%;
      overflow: scroll;
      border-collapse: collapse;
      // border: 1px solid lightsteelblue;
    }

  }

</style>