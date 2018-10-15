<template>
  <div class="info">
    <template v-if="security.id">
      <security-links></security-links>
      <div class="info__header">
        <a class="info__action" @click="editSecurity">
          <i class="fa fa fa-pencil" aria-hidden="true" ></i>
        </a>
        <span class="info__title">{{ security.desc }}</span>&nbsp;
        <span class="info__sector">{{ security.sectorName }}</span>
      </div>
      <security-chart/>
      <security-price/>
      <div class="info__toolbar">
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
      <security-comments/>
      <security-trades/>
    </template>
  </div>
</template>

<script>
import SecurityLinks from './links/SecurityLinks.vue'
import SecurityChart from './chart/SecurityChart.vue'
import SecurityPrice from './SecurityPrice.vue'
import SecurityTrades from './trades/SecurityTrades.vue'
import SecurityComments from './comments/SecurityComments';
export default {
  name: 'security-info',
  components: { SecurityLinks, SecurityChart, SecurityPrice, SecurityTrades, SecurityComments },
  computed: {
    security () {
      return this.$store.state.security.model;
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
    securityPrice () {
      return this.$store.getters.securityPrice;
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
      this.$store.dispatch('newTrade', {...this.lastTrade, typeCode} ||
        { securityCode: this.security.code, accountCode: this.accounts[0].code, typeCode});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/var.scss";

  .info {
    height: 100%;
    background-color: $bg-color-white;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-regular;
    color: $text-color-base;

    overflow-y: auto;
    overflow-x: hidden;

    &__header {
      width: 100%;
      margin: 5px 10px 0 10px;
      font-size: $font-size-middle;
    }

    &__action {
      background-color: $button-color;
      color: $icon-color;
      cursor: pointer;
      margin-right: $px5;
      padding: $px5;
      border-radius: $px2;
      &:hover {
        background-color: $button-color-hover;
        color: $icon-color-hover;
      }
    }
    &__title {
      font-family: $font-family-base;
      white-space: nowrap;
      margin-right: $px5;
    }
    &__sector {
      font-family: $font-family-condensed;
      font-weight: $font-weight-lite;
      color: $text-color-sector;
      margin-right: $px5;
      white-space: nowrap;
    }
    &__toolbar {
      font-family: $font-family-condensed;
      font-weight: $font-weight-lite;
      background-color: $bg-color-toolbar;
      margin: $px5 0;
      padding: $px5 $px10 0 $px10;
      border-top: $px1 solid $line-color-dark;
    }
  }
</style>
