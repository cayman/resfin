<template>
  <tbody>
    <tr class="footer">
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
        <profit :expense="account.avg" :income="stockPrice" ></profit>
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
  </tbody>
</template>

<script>
  import Profit from './Profit.vue'
  export default {
    name: 'stock-trades-result',
    components: { Profit },
    props: {
      account: {
        type: Object,
        required: true,
      }
    },
    computed: {
      stockPrice () {
        return this.$store.getters.stockPrice;
      },
      calcIncome () {
        return this.account.income + this.account.dividend;
      },
      calcExpense () {
        return this.account.expense + this.account.commission;
      },
      calcProfit () {
        return this.calcIncome - this.calcExpense;
      }
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