<template>
  <tbody class="footer">
    <tr class="footer__row" :class="{ expanded }" @click="toggleExpand">
      <td class="footer__type" colspan="2">
        {{ account.date | date }}
      </td>
      <td class="footer__count">
        {{ account.volume | count(false) }}
      </td>
      <td class="footer__price">
        {{ account.avg | currency }}
      </td>
      <td class="footer__percent">
        <profit :expense="account.avg" :income="securityPrice" ></profit>
      </td>
      <td class="footer__sum">
        <profit :expense="calcExpense" :income="calcIncome" ></profit>
      </td>
      <!--<td class="footer__commission">-->
        <!--{{ account.commission | currency }}-->
      <!--</td>-->
      <td class="footer__result">
        {{ calcProfit | currency}}
      </td>
    </tr>
    <tr class="footer__detail" :class="{ expanded }" v-if="expanded">
      <td colspan="8">
        <div class="footer__field">
          <span class="footer__label">
            Сумма покупок (расход):
          </span>
          <span class="footer__value">
            -{{ account.expense | currency }}
          </span>
        </div>
        <div class="footer__field">
          <span class="footer__label">
            Комиссия (расход):
          </span>
          <span class="footer__value footer__comment">
            -{{ account.commission | currency }}
          </span>
        </div>

        <div class="footer__field">
          <span class="footer__label">
            Сумма начислений:
          </span>
          <span class="footer__value">
            {{ account.interest | currency }}
            <span v-if="account.interest">(<profit :expense="calcExpense" :income="account.interest"/>)</span>
          </span>
        </div>
        <div class="footer__field">
          <span class="footer__label">
            Сумма продаж (приход):
          </span>
          <span class="footer__value">
            {{ account.income | currency }}
            <span v-if="account.income">(<profit :expense="calcExpense" :income="account.income"/>)</span>
          </span>
        </div>

        <div class="footer__field">
          <span class="footer__label">
            Средневзвешенная цена:
          </span>
          <span class="footer__value footer__comment">
              ({{ account.avg | currency }} x {{ account.volume | count }})
              = {{ account.avg * account.volume | currency }}
            <span v-if="securityPrice">(<profit :expense="account.avg" :income="securityPrice"/>)</span>
            </span>
        </div>

        <div class="footer__field">
          <span class="footer__label">
            Общий баланс:
          </span>
          <span class="footer__value footer__comment">
              {{ calcIncome | currency }} - {{ calcExpense | currency }}
               = {{ calcProfit | currency }}
              (<profit :expense="calcExpense" :income="calcIncome"/>)
            </span>
        </div>

      </td>
    </tr>
  </tbody>
</template>

<script>
  import Profit from './Profit.vue'
  export default {
    name: 'security-trades-result',
    components: { Profit },
    data () {
      return {
        expanded: false
      }
    },
    props: {
      account: {
        type: Object,
        required: true,
      }
    },
    computed: {
      securityPrice () {
        return this.$store.getters.securityPrice || 0;
      },
      calcIncome () {
        return this.account.income + this.account.interest;
      },
      calcExpense () {
        return this.account.expense + this.account.commission;
      },
      calcProfit () {
        return this.calcIncome - this.calcExpense;
      }
    },
    methods: {
      toggleExpand() {
        this.expanded = !this.expanded;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    font-size: 11px;
    font-weight: 500;
    font-stretch: condensed;
    background-color: beige;

    td {
      padding: 2px 0 2px 5px;
      &:first-child {
        padding-left: 10px;
      }
      &:last-child {
        padding-right: 10px;
      }
    }

    tr.expanded {
      td {
        background-color: whitesmoke;
      }
    }

    &__row {
      td {
        line-height: 17px;
      }
    }

    &__row:hover {
      td {
        background-color: mintcream;
      }
    }

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

    &__detail {
      line-height: 20px;
      td {
        border-top: 2px solid white;
        border-bottom: 1px solid gray;
      }
    }

    &__field {
      width: 100%;
      td {
        line-height: 15px;
      }
    }

    &__label {
      font-weight: 400;
      font-stretch: condensed;
      line-height: 20px;
      float: left;
      width: 150px;
      color: #727272;
    }

    &__value {
      font-weight: 500;
      font-stretch: normal;
      color: black;
    }

    &__comment {
      color: #637384;
    }


  }
</style>