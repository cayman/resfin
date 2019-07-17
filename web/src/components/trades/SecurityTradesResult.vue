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
        <profit :expense="account.avg" :income="securityPrice" :small="!$root.gt370"></profit>
      </td>
      <td class="footer__tax" v-if="$root.gt600">
        -{{ account.tax | currency }}
      </td>

      <td class="footer__sum" v-if="$root.gt600">
        {{ calcNet | currency  }}
      </td>
      <td class="footer__sum" v-else-if="$root.gt370">
        <profit :expense="calcExpense" :income="calcIncome" ></profit>
      </td>

      <td class="footer__commission" v-if="$root.gt430">
        {{ account.commission | currency }}
      </td>
      <td class="footer__result">
        {{ calcProfit | currency }}
      </td>
      <td class="footer__balance" v-if="$root.gt600">
        <profit :expense="calcExpense" :income="calcIncome"/>
      </td>
    </tr>
    <tr class="footer__detail" :class="{ expanded }" v-if="expanded">
      <td :colspan="$root.column">
        <div class="footer__field">
          <span class="footer__label">
            Сумма покупок:
          </span>
          <span class="footer__value">
            -{{ account.expense | currency }}
          </span>
        </div>
        <div class="footer__field">
          <span class="footer__label">
            Комиссия:
          </span>
          <span class="footer__value footer__comment">
            -{{ account.commission | currency }}
          </span>
        </div>

        <div class="footer__field">
          <span class="footer__label">
            Начисления:
          </span>
          <span class="footer__value">
            {{ account.interest | currency }}
            <span v-if="account.interest">(<profit :expense="calcExpense" :income="account.interest"/>)</span>
          </span>
        </div>
        <div class="footer__field">
          <span class="footer__label">
            Сумма продаж:
          </span>
          <span class="footer__value">
            {{ account.income | currency }}
            <span v-if="account.income">(<profit :expense="calcExpense" :income="account.income"/>)</span>
          </span>
        </div>

        <div class="footer__field" v-if="securityPrice">
          <span class="footer__label">
            Рыночная.цена:
          </span>
          <span class="footer__addition">
              ({{ securityPrice | currency }} x {{ account.volume | count }})
              = {{ securityPrice * account.volume | currency }}
          </span>
        </div>

        <div class="footer__field">
          <span class="footer__label">
            Средневзв.цена:
          </span>
          <span class="footer__addition">
              ({{ account.avg | currency }} x {{ account.volume | count }})
              = {{ account.avg * account.volume | currency }}
            <span v-if="securityPrice">(<profit :expense="account.avg" :income="securityPrice"/>)</span>
          </span>
        </div>

        <div class="footer__field">
          <span class="footer__label">
            Общий баланс:
          </span>
          <span class="footer__value">
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
  import Profit from '../common/Profit.vue'
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
      calcNet () {
        return this.calcIncome - this.account.expense;
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
  @import "../../assets/var.scss";

  .footer {

    td {
      padding: $px2 0 $px2 $px5;
      &:first-child {
        padding-left: $px10;
      }
      &:last-child {
        padding-right: $px10;
      }
    }

    tr.expanded td {
      background-color: $bg-color-row-expanded;
    }
    tr:hover td {
      background-color: $bg-color-row-hover;
    }

    // Строка таблицы
    &__row {
      font-weight: $font-weight-bold;
      background-color: $bg-color-row-result;
      td {
        font-family: $font-family-condensed;
        font-size: $font-size-smaller;
        line-height: $px20;
      }
    }

    &__row:hover {
      td {
        background-color: $bg-color-row-hover;
      }
    }

    &__type {
      font-weight: $font-weight-regular;
      text-align: right;
      color: $text-color-date;
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
    &__tax {
      font-weight: $font-weight-lite;
      text-align: right;
      width: auto;
    }
    &__sum {
      font-weight: $font-weight-bold;
      text-align: right;
      width: auto;
    }
    &__commission {
      font-weight: $font-weight-regular;
      text-align: right;
      width: auto;
    }
    &__result {
      font-weight: $font-weight-boldest;
      text-align: right;
      width: auto;
    }

    &__balance {
      font-weight: $font-weight-regular;
      text-align: right;
    }
    &__action {
      width: auto;

    }

    &__detail {
      line-height: $px25;
      td {
        font-family: $font-family-condensed;
        font-weight: $font-weight-regular;
        font-size: $font-size-smaller;
        border-top: 2px solid $line-color-white;
        border-bottom: 1px solid $line-color-dark;
      }
    }

    &__field {
      width: 100%;
      td {
        line-height: 15px;
      }
    }

    &__label {
      font-family: $font-family-condensed;
      font-weight: $font-weight-bold;
      color: $text-color-label;
      line-height: $px20;
      float: left;
      width: 100px;
    }

    &__value {
    }

    &__comment {
      color: $text-color-label;
    }

    &__addition {
      font-weight: $font-weight-lite;
    }

    &__result {
      font-weight: $font-weight-regular;
    }

  }
</style>