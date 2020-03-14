<template>
  <tr class="trade">
    <td class="form" :colspan="$root.column">
      <div class="form__field">
        <span class="form__label">
           Вид сделки:
        </span>
        <span class="form__input--wide">
          <select v-model="fieldTypeCode" placeholder="Выберите" :style="{width}">
            <option disabled value="">Выберите вид сделки</option>
            <option v-for="type in types" :key="type.code" :value="type.code" :label="type.name"></option>
          </select>
        </span>
      </div>
      <div class="form__field">
        <span class="form__label">
           Счет:
        </span>
        <span class="form__input--wide">
          <select v-model="fieldAccountCode" placeholder="Выберите" :style="{width}">
            <option disabled value="">Выберите счет</option>
            <option v-for="account in accounts" :key="account.code" :value="account.code" :label="account.name"></option>
          </select>
        </span>
      </div>
      <div class="form__field">
        <span class="form__label">
           ПСБ:
        </span>
        <span class="form__input--wide">
          <textarea v-model="fieldRaw" rows="2" :style="{width}"/>
        </span>
      </div>
      <div class="form__field">
        <span class="form__label">
           Дата:
        </span>
        <span class="form__input">
          <input type="date" v-model="fieldDate" style="width: 120px"/>
        </span>
      </div>
      <div class="form__field">
        <span class="form__label">
           Код сделки:
        </span>
        <span class="form__input">
          <input type="text" v-model="fieldCode" style="width: 120px"/>
        </span>
      </div>
      <div class="form__field">
        <span class="form__label">
           Количество:
        </span>
        <span class="form__input">
          <input type="number" v-model="fieldCount" style="width: 120px"/>
        </span>
      </div>

      <!--Дивиденды -->
      <template  v-if="isDividendType">

        <div class="form__field">
          <span class="form__label" @click="setFieldPrice">
             На одну:
          </span>
          <span class="form__input">
            <input type="number" step="any" v-model="fieldPrice" style="width: 120px"/>
          </span>
        </div>

        <div class="form__field">
          <span class="form__label">
            Сумма:
          </span>
          <span class="form__input">
           <input type="number" step="any" v-model="fieldSum" style="width: 120px"/>
          </span>
          <span class="form__comment">
            {{ fieldSum / fieldCount | currency(4)  }}
          </span>
        </div>

        <div class="form__field">
          <span class="form__label">
            Налог:
          </span>
          <span class="form__input">
            <input type="number" v-model="fieldTax" style="width: 120px"/>
          </span>
          <span class="form__comment">
            {{(fieldSum * 0.13) | currency(0)}}
          </span>
        </div>

        <div class="form__field" >
          <span class="form__label">
             Итого:
          </span>
          <span class="form__result">
            {{ fieldSum | currency }} -
            {{ fieldTax | currency }} =
            {{ fieldSum  - fieldTax | currency }}
          </span>
        </div>

      </template>

      <!--Покупка или продажа-->
      <template  v-else>
        <div class="form__field">
          <span class="form__label" @click="setFieldPrice">
             Цена:
          </span>
          <span class="form__input">
           <input type="number" v-model="fieldPrice" step="any" style="width: 120px"/>
          </span>
        </div>

        <div class="form__field" >
          <span class="form__label">
             Сумма:
          </span>
          <span class="form__input">
             <input type="number" v-model="fieldSum" step="any" readonly style="width: 120px"/>
          </span>
        </div>

        <div class="form__field">
          <span class="form__label">
             Комиссия:
          </span>
          <span class="form__input--wide">
            <input type="number" v-model="fieldCommission0" step="any" style="width: 60px"/>
            <input v-if="fieldCommission0" type="number" v-model="fieldCommission1" step="any" style="width: 60px"/>
            <template v-if="$root.contentWidth > 400">
              <input v-if="fieldCommission1" type="number" v-model="fieldCommission2" step="any" style="width: 60px"/>
              <input v-if="fieldCommission2" type="number" v-model="fieldCommission3" step="any" style="width: 60px"/>
            </template>
          </span>
          <span class="form__comment" v-if="$root.contentWidth > 440">
              {{ commissionSum }}
            </span>
        </div>
        <div class="form__field" v-if="$root.contentWidth <= 400">
          <span class="form__label">
            &nbsp;
          </span>
          <span class="form__input--wide">
            <input v-if="fieldCommission1" type="number" v-model="fieldCommission2" step="any" style="width: 60px"/>
            <input v-if="fieldCommission2" type="number" v-model="fieldCommission3" step="any" style="width: 60px"/>
          </span>
          <span class="form__comment">
            {{ commissionSum }}
          </span>
        </div>

        <div class="form__field" >
          <span class="form__label">
             Итого:
          </span>
          <span class="form__result">
              {{ fieldSum | currency }} {{ this.fieldTypeCode === 'buy' ? '+' : ' - '}} {{ commissionSum | currency }} =
              {{ resultSum | currency }}
          </span>
        </div>
      </template>

      <div class="form__field">
        <span class="form__label">
          &nbsp;
        </span>
        <span class="form__input">
          <!--fieldCode = {{ fieldCode }}-->
          <!--AccountCode = {{ fieldAccountCode }} -->
          <!--Type = {{ fieldTypeCode }}-->
          <!--price = {{ fieldCount }} * {{ fieldPrice }}-->
          <button @click="saveTrade" :disabled="!allow">Сохранить</button>&nbsp;
          <button @click="cancelTrade">Отмена</button>
        </span>
      </div>

    </td>
  </tr>
</template>

<script>
import form from '../form'
import InterestPercent from '../common/InterestPercent'
import {getCurrency, getIsoDate} from '../../utils';
export default {
  name: 'security-trade-form',
  mixins: [form],
  components: { InterestPercent },
  computed: {
    security () {
      return this.$store.state.security.model;
    },
    securityPrice () {
      return this.$store.getters.securityPrice;
    },
    types () {
      return this.$store.state.trade.types;
    },
    accounts () {
      return this.$store.state.accounts.list;
    },
    trade () {
      return this.$store.state.trade.model;
    },
    width() {
      return (this.$root.contentWidth > 385 ? 240 : this.$root.contentWidth < 265 ? 120 : this.$root.contentWidth - 145) + 'px';
    },
    fieldRaw: {
      get () {
        return this.trade.raw;
      },
      set (raw) {
        this.setField('raw', raw);
        this.updateTradePSB(this.trade.typeCode, raw);
      }
    },
    fieldDate: {
      get () {
        return getIsoDate(this.trade.date);
      },
      set (date) {
        this.setField('date', date, Date);
      }
    },
    fieldAccountCode: {
      get () {
        return this.trade.accountCode;
      },
      set (accountCode) {
        this.setField('accountCode', accountCode);
      }
    },
    fieldTypeCode: {
      get () {
        return this.trade.typeCode;
      },
      set (typeCode) {
        this.setField('typeCode', typeCode);
      }
    },
    isDividendType () {
      return this.fieldTypeCode === 'dividend';
    },
    fieldCode: {
      get () {
        return this.trade.code;
      },
      set (code) {
        this.setField('code', code);
      }
    },
    fieldCount: {
      get () {
        return this.trade.count;
      },
      set (count) {
        this.setField('count', count, Number);
        this.fieldSum = getCurrency(this.fieldCount * this.fieldPrice);
      }
    },
    fieldPrice: {
      get () {
        return this.trade.price;
      },
      set (price) {
        this.setField('price', price, Number);
        this.fieldSum = getCurrency(this.fieldCount * this.fieldPrice);
      }
    },
    fieldSum: {
      get () {
        return this.trade.sum;
      },
      set (sum) {
        this.setField('sum', sum, Number);
      }
    },
    fieldTax: {
      get () {
        return this.trade.tax;
      },
      set (tax) {
        this.setField('tax', tax, Number);
      }
    },
    fieldCommission () {
      return this.trade.commission || [];
    },
    fieldCommission0: {
      get () {
        return this.fieldCommission[0];
      },
      set (value) {
        this.setCommissionField(0, value);
      }
    },
    fieldCommission1: {
      get () {
        return this.fieldCommission[1];
      },
      set (value) {
        this.setCommissionField(1, value);
      }
    },
    fieldCommission2: {
      get () {
        return this.fieldCommission[2];
      },
      set (value) {
        this.setCommissionField(2, value);
      }
    },
    fieldCommission3: {
      get () {
        return this.fieldCommission[3];
      },
      set (value) {
        this.setCommissionField(3, value);
      }
    },
    commissionSum () {
      return getCurrency(this.fieldCommission ? this.fieldCommission.reduce((sum,value) => sum + value, 0 ) : 0);
    },
    resultSum () {
      return getCurrency(this.fieldSum + (this.fieldTypeCode === 'buy' ? this.commissionSum : - this.commissionSum));
    },
    allow () {
      return this.fieldAccountCode && this.fieldTypeCode && this.fieldCode && this.fieldCount && this.fieldPrice;
    }
  },
  methods: {
    setFieldPrice () {
      this.fieldPrice = this.securityPrice;
    },
    setField(name, value, type) {
      this.$store.commit('setTradeField', {name, value, type});
    },
    setCommissionField(index, value) {
      this.$store.commit('spliceTradeField', {name:'commission', index, value, type: Number});
    },
    saveTrade() {
      this.$store.dispatch('saveTrade', this.trade).then((tradeId) => {
        this.$store.commit('editingTrade', false);
        this.$store.dispatch('fetchTrades', { securityCode: this.security.code });
        this.$store.commit('setExpandTrades', [tradeId]);
      });
    },
    cancelTrade() {
      this.$store.commit('editingTrade', false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var.scss";

  .trade {
    padding: 5px;
    border-bottom: 0.5px solid lavender;
    background-color: lavender;
    &:first-child {
      border-top: 0.5px solid lavender;
    }

    td {
      padding: 3px 0 3px 5px;
      &:first-child {
        padding-left: 10px;
      }
      &:last-child {
        padding-right: 10px;
      }
    }
  }

  .form {
    padding: $px10;
    box-sizing: border-box;
    background-color: $bg-color-form;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-regular;
    color: $text-color-base;

    &__field {
      padding-bottom: $px5;
    }
    &__label {
      float: left;
      width: 100px;
      font-weight: $font-weight-bold;
      font-family: $font-family-condensed;
      font-size: $font-size-smaller;
      color: $text-color-label;
      padding-right: $px5;
      line-height: $px20;
    }
    &__input {
      padding-right: $px5;
      line-height: $px20;
      &--wide {
        width: 100%;
      }
    }
    &__comment {
      line-height: $px20;
      font-family: $font-family-condensed;
      font-weight: $font-weight-lite;
    }

    &__result {
      line-height: $px20;
      font-family: $font-family-condensed;
    }

  }


  input[type="date"]::-webkit-input-placeholder{
    visibility: hidden !important;
  }

  input::-webkit-calendar-picker-indicator{
    display: none;
  }

  textarea {
    margin: 0;
  }

</style>
