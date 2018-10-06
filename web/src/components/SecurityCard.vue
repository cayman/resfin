<template>
  <div class="info">
    <template v-if="security.id">
      <security-links></security-links>
      <h3>
        <a class="info__action" @click="editSecurity">
          <i class="fa fa fa-pencil" aria-hidden="true" ></i>
        </a>
        <span class="info__title">{{ security.desc }}</span>&nbsp;
        <span class="info__sector">{{ security.sectorName }}</span>
      </h3>
      <security-chart/>
      <security-price/>
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
      <security-comments/>
      <security-trades/>
    </template>
  </div>
</template>

<script>
import SecurityLinks from './SecurityLinks.vue'
import SecurityChart from './SecurityChart.vue'
import SecurityPrice from './SecurityPrice.vue'
import SecurityTrades from './SecurityTrades.vue'
import SecurityComments from './SecurityComments';
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
