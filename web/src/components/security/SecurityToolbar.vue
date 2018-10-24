<template>
  <div class="security-toolbar">
    <a class="security-toolbar__action" @click="editSecurity">
      <i class="fa fa fa-pencil" aria-hidden="true" title="Редактировать"></i>
    </a>
    <a class="security-toolbar__action" @click="addComment">
      <i class="fa fa-commenting-o" aria-hidden="true" title="Добавить комментарий"></i>
    </a>
    <a class="security-toolbar__action" @click="addTrade('dividend')" title="Добавить дивиденд">
      <i class="fa fa-money" aria-hidden="true"></i>
    </a>
    <a class="security-toolbar__action" @click="addTrade('buy')" title="Купить">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </a>
    <a class="security-toolbar__action" @click="addTrade('sell')" title="Продать">
      <i class="fa fa-minus" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'security-toolbar',
  computed: {
    loaded () {
      return !this.$store.state.security.loading;
    },
    security () {
      return this.$store.state.security.model;
    },
    trades () {
      return this.$store.state.trades.list;
    },
    lastTrade () {
      return this.trades.length > 0 ? this.trades[this.trades.length - 1] : null;
    },
    securityPrice () {
      return this.$store.getters.securityPrice;
    },
    accounts () {
      return this.$store.state.accounts.list ;
    }
  },
  methods: {
    editSecurity() {
      this.$store.commit('editingSecurity', true);
    },
    addComment() {
      this.$store.dispatch('newComment', {securityCode: this.security.code, price: this.securityPrice});
    },
    addTrade(typeCode) {
      this.$store.dispatch('newTrade', this.lastTrade ? {...this.lastTrade, typeCode}
        : { securityCode: this.security.code, accountCode: this.accounts[0].code, typeCode});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var";

  .security-toolbar {
    background-color: $bg-color-toolbar;
    margin: $px5 $px2 $px2 $px2;
    padding: $px2 $px5 $px2 $px5;
    border-top: $px1 solid $line-color-dark;

    &__action {
      display: inline-block;
      background-color: $button-color;
      color: $icon-color;
      cursor: pointer;
      margin-left: $px5;
      margin-right: $px5;
      padding: $px7;
      border-radius: $px2;
      line-height: normal;
      &:hover {
        background-color: $button-color-hover;
        color: $icon-color-hover;
      }
    }

  }
</style>
