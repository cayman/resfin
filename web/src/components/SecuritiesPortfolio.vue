<template>
  <div class="content">
    <div class="content__right">
      <table class="content__table" v-if="loaded">
      <template v-for="(_account, accountСode) in accounts" >
        <security-trades-head :name="_account.name" :key="accountСode + '_head'" code-column/>
        <template v-for="_trade in _account.trades" >
          <security-trade-card :key="_trade.id" :trade="_trade" code-column></security-trade-card>
        </template>
      </template>
      </table>
    </div>
  </div>
</template>

<script>
  import SecurityTradesHead from './trades/SecurityTradesHead.vue'
  import SecurityTradeCard from './trades/SecurityTradeCard.vue'
  import SecurityTradesResult from './trades/SecurityTradesResult';
  export default {
    name: 'securities-portfolio',
    components: {SecurityTradesHead, SecurityTradeCard, SecurityTradesResult},
    computed: {
      loaded() {
        return !this.$store.state.trades.loading;
      },
      accounts() {
        return this.$store.getters.securityTradeAccounts;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/var.scss";
  .content {
    background: $bg-color-sidebar;
    padding: $px5;
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;
    &__left {
      flex: 0 0 50px;
      height: 100%;
    }
    .expanded {
      flex: 0 0 190px;
    }
    &__right {
      background-color: white;
      min-width: 310px;
      flex: 1 1 200px;;
      display: flex;
      display: -webkit-flex;
      flex-wrap: nowrap;
      flex-direction: column;
      overflow: scroll;
      padding-bottom: 40px;
    }
    &__links {
      font-size: $font-size-smaller;
      flex: 0 0 35px;
    }
    &__body {
      // border: 1px solid red;
      flex: 1 1 auto;
      overflow: auto;
      margin-bottom: 35px;
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
