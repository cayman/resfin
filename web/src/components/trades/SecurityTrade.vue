<template>
  <tbody class="trade">
    <tr class="trade__row" :class="{ expanded, editing, warning }" @click="toggleExpandTrade">

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
        <td class="trade__price">
          <interest-percent :price="trade.calc.avg" :interest="trade.price" :percent-visible="false"/>
        </td>

        <td class="trade__percent">
          <interest-percent :price="trade.calc.avg" :interest="trade.price" :interest-visible="false" :small="!$root.gt370"/>
        </td>

        <td class="trade__tax" v-if="$root.gt600">
          -{{trade.tax | currency}}
        </td>

        <td class="trade__sum" v-if="$root.gt370">
          {{ trade.sum - trade.tax | currency }}
        </td>

        <td class="trade__commission" v-if="$root.gt600">
        </td>
        <td class="trade__tax" v-else-if="$root.gt430">
          ({{trade.tax | currency}})
        </td>
      </template>

      <template v-else>
        <td class="trade__price">
          {{ trade.price | currency }}
        </td>

        <td class="trade__percent">
        </td>

        <td class="trade__tax" v-if="$root.gt600">
        </td>

        <td class="trade__sum" v-if="$root.gt370">
          {{ trade.sum | currency }}
        </td>

        <td class="trade__commission" v-if="$root.gt430">
          {{ commissionSum | currency }}
        </td>

      </template>

      <td class="trade__result" >
        {{ resultSumSign }}{{ resultSum | currency  }}
      </td>

      <td class="trade__balance"  v-if="$root.gt600">
        <profit v-if="calcIncome" :expense="calcExpense" :income="calcIncome"/>
      </td>

    </tr>
    <tr class="trade__detail" :class="{ expanded }" v-if="expanded">
      <td :colspan="$root.column">

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

        <!--Дивиденды-->
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
            <span class="trade__comment">
              {{ trade.tax }}
            </span>
          </div>
          <div class="trade__field">
            <span class="trade__label">
               Итоговая сумма:
            </span>
            <span class="trade__result">
              ({{ trade.price | currency }} x {{ trade.count | count }})
              -
              {{ trade.tax | currency }} = {{ trade.sum - trade.tax | currency }}
            </span>
          </div>
          <div class="trade__field">
            <span class="trade__label">
              Total amount:
            </span>
            <span class="trade__comment">
              ({{ trade.price | currency(null, false) }} x {{ trade.count | count }})
              -
              {{ trade.tax | currency(null, false) }} = {{ trade.sum - trade.tax | currency(null, false) }}
            </span>
          </div>
        </template>

        <!--Покупка или продажа-->
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
            <span class="trade__comment">
              <span v-if=" trade.commission.length > 1">
                {{ trade.commission | currency }} = {{ commissionSum | currency }}
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
            <span class="trade__result">
              ({{ trade.price | currency }} x {{ trade.count | count }})
              {{ trade.type === 'buy' ? '+' : ' - '}}
              {{ commissionSum | currency }} = {{ resultSum | currency }}
            </span>
          </div>
          <div class="trade__field">
            <span class="trade__label">
              Total amount:
            </span>
            <span class="trade__comment">
              ({{ trade.price | currency(null, false) }} x {{ trade.count | count }})
              {{ trade.type === 'buy' ? '+' : ' - '}}
              {{ commissionSum | currency(null, false) }} = {{ resultSum | currency(null, false) }}
            </span>
          </div>
        </template>

        <!--Общие итоги-->
        <div class="trade__field">
            <span class="trade__label">
              Средневзв.цена:
            </span>
          <span class="trade__addition">
              ({{ trade.calc.avg | currency }} x {{ trade.calc.volume | count }})
              = {{ trade.calc.avg * trade.calc.volume | currency }}
              <!--(<profit :expense="calcExpense" :income="calcIncome"/>)-->
            </span>
        </div>

        <div class="trade__field">
          <span class="trade__label">
            Общий баланс:
          </span>
          <span class="trade__addition">
              {{ calcIncome | currency }} - {{ calcExpense | currency }}
               = {{ calcProfit | currency }}
              (<profit :expense="calcExpense" :income="calcIncome"/>)
            </span>
        </div>

        <!--<div class="trade__field">-->
            <!--<span class="trade__value">-->
              <!--IRKT: 1200x76 + 100x76,05 + 1400x76,1 + 700x76,2 + 500x76,25 = 304 395,00-->
              <!--Комиссия 12,02 + 12,02 + 4,29 + 138,50 = 166,83 ,-->
              <!--АО "Корпорация "Иркут" ОАО, выпуск 03 RU0006752979-->
            <!--</span>-->
        <!--</div>-->

        <div v-if="isDividendType" class="trade__field trade__export" >
          <pre @click="copyText">{{ security.code }}: {{ trade.count | count(false) }}x{{ trade.price | currency }}={{ trade.sum | currency }}
Налог: {{ trade.tax | currency }}, Итого: {{ resultSum | currency }}
{{ securityName }} <br v-if="!$root.gt370"/>({{ securityIsin}}), {{ securityReg }}</pre>
        </div>

        <div v-else class="trade__field trade__export">
          <pre @click="copyText">{{ security.code }}: {{ trade.count | count(false) }}x{{ trade.price | currency }}={{ trade.sum | currency }}
Комиссия: {{ trade.commission | currency }}={{ commissionSum | currency }}
{{ securityName }} <br v-if="!$root.gt370"/>({{ securityIsin}}), {{ securityReg }}</pre>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import InterestPercent from '../common/InterestPercent'
import Profit from '../common/Profit.vue'
import form from '../form'
import {getCurrency, getLocalDate} from '../../utils';
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
    securityCode () {
      return this.$store.getters.securityCode;
    },
    securityName () {
      return this.$store.getters.securityName;
    },
    securityIsin () {
      return this.$store.getters.securityIsin;
    },
    securityReg() {
      return this.$store.getters.securityReg;
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
    warning () {
      return !this.trade.code || this.trade.code.length < 3;
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
    }
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
    },
    copyText (event) {
      const div = event.target;
      const el = document.createElement('textarea');
      document.body.appendChild(el);
      el.value = div.textContent;
      console.log('copy', el.value);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var.scss";
  .trade {
    padding: 0 $px5;
    border-bottom: $px1 solid $line-color-base;

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
    tr.editing td {
      background-color: $bg-color-form;
    }
    tr.warning td {
      background-color: $bg-color-row-warning;
    }
    tr:hover td {
      background-color: $bg-color-row-hover;
    }

    // Строка таблицы
    &__row {
      padding-bottom: 1px;
      td {
        font-family: $font-family-condensed;
        font-size: $font-size-smaller;
        line-height: $px20;
      }
    }
    &:first-child {
      border-top: $px1 solid $line-color-base;
    }

    &__date {
      width: 50px;
      font-weight: $font-weight-lite;
      color: $text-color-date;
    }
    &__type {
      width: 10px;
    }
    &__count {
      font-weight: $font-weight-regular;
      text-align: right;
    }
    &__price {
      font-weight: $font-weight-bold;
      text-align: right;
    }
    &__percent {
      font-weight: $font-weight-regular;
      text-align: right;
    }
    &__sum {
      font-weight: $font-weight-bold;
      text-align: right;
    }
    &__commission {
      font-weight: $font-weight-lite;
      text-align: right;
    }
    &__tax {
      font-weight: $font-weight-lite;
      text-align: right;
      color: $text-color-label;
    }
    &__result {
      font-weight: $font-weight-bold;
      text-align: right;
    }

    &__balance {
      font-weight: $font-weight-lite;
      text-align: right;
    }

    &__detail {
      line-height: $px25;
      td {
        font-family: $font-family-condensed;
        font-weight: $font-weight-regular;
        font-size: $font-size-smaller;
        border-top: $px2 solid $line-color-white;
      }
    }

    &__field {
      width: 100%;
      td {
        line-height: 15px;
      }
    }
    &__export {
      border-top: $px1 solid $line-color-base;
      line-height: $px20;
      padding-top: $px5;
      pre {
        padding: 0;
        margin: 0;
        font-family: $font-family-condensed;
        font-weight: $font-weight-lite;
        font-size: $font-size-smaller;
        color: $text-color-label;
      }
    }

    &__label {
      font-weight: $font-weight-bold;
      color: $text-color-label;
      line-height: $px20;
      float: left;
      width: 100px;
    }

    &__action {
      line-height: 20px;
      float: right;
      width: auto;
      padding: 0;
      a {
        cursor: pointer;
        padding: 5px;
        margin-left: 5px;
        border-radius: $px2;
        background-color: $button-color;
        color: $icon-color;
        &:hover {
          background-color: $button-color-hover;
          color: $icon-color-hover;
        }
      }
    }

    &__value {
    }

    &__result {
      font-weight: $font-weight-bold;
    }

    &__comment {
      color: $text-color-label;
    }

    &__addition {
      font-weight: $font-weight-lite;
      color: $text-color-label;
    }

  }
</style>
