<template>
  <tbody class="trade">
    <tr class="trade__row" :class="{ expanded, editing }" @click="toggleExpandTrade">
      <td class="trade__type">
        <a v-if="type" :title="type.name">
          <i :class="type.icon" aria-hidden="true"></i>
        </a>
      </td>
      <td class="trade__date">
        {{ date }}
      </td>
      <td class="trade__count">
        {{ trade.count | count(false) }}
      </td>

      <template v-if="isDividendType">
        <td class="trade__interest">
          <interest-percent :price="trade.calc.avg" :interest="trade.price" :percent-visible="false"/>
        </td>

        <td class="trade__percent">
          <interest-percent :price="trade.calc.avg" :interest="trade.price" :interest-visible="false"/>
        </td>

        <td class="trade__sum">
          {{ trade.sum - trade.tax | currency }}
        </td>

        <!--<td class="trade__commission">-->
        <!--</td>-->

        <td class="trade__result" >
          {{ resultSumSign }}{{ resultSum | currency  }}
        </td>
      </template>

      <template v-else>
        <td class="trade__price">
          {{ trade.price | currency }}
        </td>

        <td class="trade__percent">
        </td>

        <td class="trade__sum">
          {{ trade.sum | currency }}
        </td>

        <!--<td class="trade__commission">-->
          <!--&lt;!&ndash;{{ commissionSum | currency }}&ndash;&gt;-->
        <!--</td>-->

        <td class="trade__result" >
          {{ resultSumSign }}{{ resultSum | currency }}
        </td>
      </template>

    </tr>
    <tr class="trade__detail" :class="{ expanded }" v-if="expanded">
      <td colspan="8">

        <div class="trade__field">
          <span class="trade__label">
           Номер (код):
          </span>
          <span class="trade__value trade__comment">
              {{ trade.code || '-' }}
          </span>

          <span class="trade__action">
            <a @click="editTrade" title="Редактировать">
              <i class="fa fa-pencil" aria-hidden="true" ></i>
            </a>
            <a @click="copyTrade" title="Копировать">
              <i class="fa fa-copy" aria-hidden="true" ></i>
            </a>
            <a @click="deleteTrade" title="Удалить">
              <i class="fa fa-trash" aria-hidden="true" ></i>
            </a>
          </span>

        </div>

        <template v-if="isDividendType">
          <div class="trade__field">
            <span class="trade__label">
              Дивиденды:
            </span>
            <span class="trade__value">
               <interest-percent :price="trade.calc.avg" :interest="trade.price"/>
            </span>
          </div>
          <div class="trade__field">
            <span class="trade__label">
              Начисление:
            </span>
            <span class="trade__value">
              {{ trade.price | currency }} x {{ trade.count | count }} = {{ trade.sum | currency }}
            </span>
          </div>
          <div class="trade__field">
            <span class="trade__label">
              Налог:
            </span>
            <span class="trade__value trade__comment">
              {{ trade.tax }}
            </span>
          </div>
          <div class="trade__field">
            <span class="trade__label">
               Итоговая сумма:
            </span>
            <span class="trade__value">
              ({{ trade.price | currency }} x {{ trade.count | count }})
              -
              {{ trade.tax | currency }} = {{ trade.sum - trade.tax | currency }}
            </span>
          </div>
        </template>
        <template v-else>
          <div class="trade__field">
            <span class="trade__label">
              Сумма {{ isBuyType ? 'покупки': 'продажи' }}:
            </span>
            <span class="trade__value">
              {{ trade.price | currency }} x {{ trade.count | count }} = {{ trade.sum | currency }}
            </span>
          </div>
          <div class="trade__field">
            <span class="trade__label">
              Комиссия:
            </span>
            <span class="trade__value trade__comment">
              <span v-if=" trade.commission.length > 1">
                {{ trade.commission.join(' + ') }} = {{ commissionSum | currency }}
              </span>
              <span v-else>
                {{ commissionSum | currency }}
              </span>
            </span>
          </div>
          <div class="trade__field">
            <span class="trade__label">
              Итоговая сумма:
            </span>
            <span class="trade__value">
              ({{ trade.price | currency }} x {{ trade.count | count }})
              {{ trade.type === 'buy' ? '+' : ' - '}}
              {{ commissionSum | currency }} = {{ resultSum | currency }}
            </span>
          </div>
        </template>

        <div class="trade__field">
            <span class="trade__label">
              Средневзвешенная цена:
            </span>
          <span class="trade__value trade__comment">
              ({{ trade.calc.avg | currency }} x {{ trade.calc.volume | count }})
              = {{ trade.calc.avg * trade.calc.volume | currency }}
              <!--(<profit :expense="calcExpense" :income="calcIncome"/>)-->
            </span>
        </div>

        <div class="trade__field">
          <span class="trade__label">
            Общий баланс:
          </span>
          <span class="trade__value trade__comment">
              {{ calcIncome | currency }} - ({{ calcExpense | currency }})
               = {{ calcProfit | currency }}
              (<profit :expense="calcExpense" :income="calcIncome"/>)
            </span>
        </div>

        <div class="trade__field">
            <span class="trade__value">
              <!--IRKT: 1200x76 + 100x76,05 + 1400x76,1 + 700x76,2 + 500x76,25 = 304 395,00-->
              <!--Комиссия 12,02 + 12,02 + 4,29 + 138,50 = 166,83 ,-->
              <!--АО "Корпорация "Иркут" ОАО, выпуск 03 RU0006752979-->
            </span>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import InterestPercent from './InterestPercent'
import Profit from './Profit.vue'
import form from './form'
import {getCurrency, getLocalDate, percent} from '../utils';
export default {
  name: 'security-trade',
  mixins: [form],
  components: { InterestPercent, Profit },
  props: {
    trade: {
      type: Object,
      required: true
    }
  },
  computed: {
    date() {
      return getLocalDate(this.trade.date);
    },
    security () {
      return this.$store.state.security.model;
    },
    types () {
      return this.$store.state.trade.types;
    },
    editing () {
      return this.$store.state.trade.editing && this.$store.state.trade.model.id === this.trade.id;
    },
    expanded () {
      return this.$store.state.trades.expanded.includes(this.trade.id);
    },
    isDividendType () {
      return this.trade.typeCode === 'dividend';
    },
    isBuyType () {
      return this.trade.typeCode === 'buy';
    },
    type() {
      return this.types.find(type => type.code === this.trade.typeCode);
    },
    commissionSum () {
      return getCurrency(this.trade.commission ? this.trade.commission.reduce((sum, value) => sum + value, 0 ) : 0);
    },
    resultSum () {
      return this.trade.sum - (this.isDividendType ? this.trade.tax : 0)
        + (this.isBuyType ? this.commissionSum : - this.commissionSum);
    },
    resultSumSign () {
      return this.isBuyType ? '-' : '+';
    },
    calcIncome () {
      return this.trade.calc.income + this.trade.calc.interest;
    },
    calcExpense () {
      return this.trade.calc.expense + this.trade.calc.commission;
    },
    calcProfit () {
      return this.calcIncome - this.calcExpense;
    },
    calcProfitPercent () {
      return percent(this.calcProfit, this.calcExpense);
    },
  },
  methods: {
    editTrade() {
      this.$store.dispatch('editTrade', this.trade);
    },
    copyTrade() {
      this.$store.dispatch('copyTrade', this.trade);
    },
    deleteTrade() {
      this.$store.dispatch('deleteTrade', this.trade.id).then(() =>{
        this.$store.commit('editingTrade', false);
        this.$store.dispatch('fetchTrades', this.security.code);
        this.$store.commit('setExpandTrades', []);
      });
    },
    toggleExpandTrade() {
      this.$store.commit('toggleExpandTrade', this.trade.id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .trade {
    font-size: 11px;
    padding: 0 5px;
    border-bottom: 0.5px solid lavender;

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

    tr.editing {
      td {
        background-color: aliceblue;
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

    &:first-child {
      border-top: 0.5px solid lavender;
    }

    &__detail {
      line-height: 20px;
      td {
        border-top: 2px solid white;
      }
    }

    &__field {
      width: 100%;
      td {
        line-height: 15px;
      }
    }

    &__date {
      color: grey;
      width: 50px;
      font-stretch: condensed;
    }
    &__type {
      font-stretch: condensed;
      width: 10px;
      color: darkcyan;
    }
    &__count {
      text-align: right;
    }
    &__price {
      font-weight: 600;
      text-align: right;
    }
    &__interest {
      text-align: right;
    }
    &__percent {
      text-align: right;
    }
    &__sum {
      color: grey;
      text-align: right;
    }
    &__commission {
      color: grey;
      text-align: right;
    }
    &__result {
      text-align: right;
    }

    &__row {
      padding-bottom: 1px;
    }
    &__label {
      font-weight: 400;
      font-stretch: condensed;
      line-height: 20px;
      float: left;
      width: 150px;
      color: #727272;
    }

    &__action {
      line-height: 20px;
      float: right;
      width: auto;
      padding: 0;
      color: lightslategrey;
      a {
        cursor: pointer;
        border-radius: 2px;
        padding: 5px;
        &:hover {
          background-color: cornflowerblue;
          color: white;
        }
      }
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
