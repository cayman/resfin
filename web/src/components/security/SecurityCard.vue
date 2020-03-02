<template>
  <div class="security-card">
    <template v-if="security.id">
      <div class="security-card__header">
      <span class="security-card__expander" @click="expanded = !expanded">
        <i class="fa fa-compress" v-if="expanded" aria-hidden="true"></i>
        <i class="fa fa-expand" v-else aria-hidden="true"></i>
        <span class="security-card__code">{{ security.code }}</span>
        <span class="security-card__title">{{ security.desc }}</span>
      </span>
        <template v-if="expanded">
          <a class="security-card__action" @click="editSecurity">
            <i class="fa fa fa-pencil" aria-hidden="true" title="Редактировать"></i>
          </a>
        </template>
      </div>
      <template v-if="expanded">
        <security-info class="security-card__info"/>
        <security-chart class="security-card__chart"/>
        <security-price class="security-card__price"/>
        <div class="security-card__portfolio">
          <security-interest class="security-card__interest"/>
          <security-account-price  v-for="(account, code, index) in tradesAccounts"
                                  :key="code" :index="index" :account="account">
          </security-account-price >
        </div>
      </template>
      <security-comments class="security-card__comments"/>
      <security-trades  class="security-card__trades"/>
    </template>
  </div>
</template>

<script>
import SecurityInfo from './SecurityInfo.vue'
import SecurityChart from '../chart/SecurityChart.vue'
import SecurityPrice from './SecurityPrice.vue'
import SecurityAccountPrice from './SecurityAccountPrice.vue'
import SecurityTrades from '../trades/SecurityTrades.vue'
import SecurityComments from '../comments/SecurityComments';
import SecurityInterest from "./SecurityInterest";

export default {
  name: 'security-card',
  components: {
    SecurityInterest,
    SecurityInfo,
    SecurityChart,
    SecurityPrice,
    SecurityAccountPrice,
    SecurityTrades,
    SecurityComments
  },
  data () {
    return {
      expanded: true
    }
  },
  computed: {
    security () {
      return this.$store.state.security.model;
    },
    securityLoaded () {
      return !this.$store.state.security.loading;
    },
    tradesAccounts () {
      return this.$store.getters.tradeAccounts || [];
    },
    tradeAccountsExist () {
      return this.$store.state.trades.list.length > 0;
    },
    tradeAccountsLoaded () {
      return this.securityLoaded && !this.$store.state.trades.loading;
    },
    sectors () {
      return this.security.sectorName.split('/');
    },
    sector () {
      return this.sectors[this.sectors.length - 1];
    }
  },
  methods: {
    editSecurity() {
      this.$store.commit('editingSecurity', true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var";

  .security-card {
    background-color: $bg-color-white;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-regular;
    color: $text-color-base;
    padding: 0 $px5 $px5 $px5;

    &__header {
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

    &__chart {
      margin: 0;
      font-size: $font-size-base;
    }
    &__price {
      margin: 0 $px10;
      font-size: $font-size-base;
    }
    &__portfolio {
      line-height: $px20;
      margin: 0 $px10;
      font-family: $font-family-condensed;
      font-size: $font-size-smaller;
      border-bottom: 1px solid $line-color-base;
    }
    &__comments {
      margin: 0;
      font-size: $font-size-base;
    }
    &__trades {
      margin: 0;
      font-size: $font-size-base;
    }
  }
</style>
