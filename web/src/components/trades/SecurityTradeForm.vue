<template>
  <tr class="trade">
    <td class="form" colspan="9">
      <div class="form__field">
        <span class="form__label">
           Вид сделки:
        </span>
        <span class="form__input">
          <select v-model="fieldTypeCode" placeholder="Выберите">
            <option disabled value="">Выберите вид сделки</option>
            <option v-for="type in types" :key="type.code" :value="type.code" :label="type.name"></option>
          </select>
        </span>
      </div>
      <div class="form__field">
        <span class="form__label">
           Счет:
        </span>
        <span class="form__input">
          <select v-model="fieldAccountCode" placeholder="Выберите">
            <option disabled value="">Выберите счет</option>
            <option v-for="account in accounts" :key="account.code" :value="account.code" :label="account.name"></option>
          </select>
        </span>
      </div>
      <div class="form__field">
        <span class="form__label">
           ПСБ:
        </span>
        <span class="form__input">
          <textarea v-model="fieldRaw" rows="2" cols="16"/>
        </span>
      </div>
      <div class="form__field">
        <span class="form__label">
           Дата:
        </span>
        <span class="form__input">
          <input type="date" v-model="fieldDate"/>
        </span>
      </div>
      <div class="form__field">
        <span class="form__label">
           Номер (Код):
        </span>
        <span class="form__input">
          <input type="text" v-model="fieldCode" style="width: 10em"/>
        </span>
      </div>
      <div class="form__field">
        <span class="form__label">
           Количество:
        </span>
        <span class="form__input">
          <input type="number" v-model="fieldCount" style="width: 10em"/>
        </span>
      </div>

      <!--Дивиденды -->
      <template  v-if="isDividendType">

        <div class="form__field">
          <span class="form__label" @click="setFieldPrice">
             На одну:
          </span>
          <span class="form__input">
            <input type="number" step="any" v-model="fieldPrice" style="width: 10em"/>
          </span>
        </div>

        <div class="form__field">
          <span class="form__label">
            Сумма:
          </span>
          <span class="form__input">
           <input type="number" step="any" v-model="fieldSum" style="width: 10em"/>
            {{ fieldSum / fieldCount  }}
          </span>
        </div>

        <div class="form__field">
          <span class="form__label">
            Налог:
          </span>
          <span class="form__input">
           <input type="number" v-model="fieldTax" style="width: 10em"/>
             {{(fieldSum * 0.13) | currency(0)   }}
          </span>
        </div>

        <div class="form__field" >
          <span class="form__label">
             Итого:
          </span>
          <span class="form__input">
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
           <input type="number" v-model="fieldPrice" step="any" style="width: 10em"/>
          </span>
        </div>

        <div class="form__field" >
          <span class="form__label">
             Сумма:
          </span>
          <span class="form__input">
             <input type="number" v-model="fieldSum" step="any" readonly style="width: 10em"/>
          </span>
        </div>

        <div class="form__field">
          <span class="form__label">
             Комиссия:
          </span>
            <span class="form__input">
            <input type="number" v-model="fieldCommission0" step="any" style="width: 4em"/>
            <input v-if="fieldCommission0" type="number" v-model="fieldCommission1" step="any" style="width: 4em"/>
            <input v-if="fieldCommission1" type="number" v-model="fieldCommission2" step="any" style="width: 4em"/>
            <input v-if="fieldCommission2" type="number" v-model="fieldCommission3" step="any" style="width: 4em"/>
          </span>
        </div>

        <div class="form__field" >
          <span class="form__label">
             Итого:
          </span>
          <span class="form__input">
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
    fieldRaw: {
      get () {
        return this.trade.raw;
      },
      set (raw) {
        this.setTradeField('raw', raw);
        this.updateTradePSB(this.trade.typeCode, raw);
      }
    },
    fieldDate: {
      get () {
        return getIsoDate(this.trade.date);
      },
      set (date) {
        this.setTradeField('date', date, Date);
      }
    },
    fieldAccountCode: {
      get () {
        return this.trade.accountCode;
      },
      set (accountCode) {
        this.setTradeField('accountCode', accountCode);
      }
    },
    fieldTypeCode: {
      get () {
        return this.trade.typeCode;
      },
      set (typeCode) {
        this.setTradeField('typeCode', typeCode);
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
        this.setTradeField('code', code);
      }
    },
    fieldCount: {
      get () {
        return this.trade.count;
      },
      set (count) {
        this.setTradeField('count', count, Number);
        this.fieldSum = getCurrency(this.fieldCount * this.fieldPrice);
      }
    },
    fieldPrice: {
      get () {
        return this.trade.price;
      },
      set (price) {
        this.setTradeField('price', price, Number);
        this.fieldSum = getCurrency(this.fieldCount * this.fieldPrice);
      }
    },
    fieldSum: {
      get () {
        return this.trade.sum;
      },
      set (sum) {
        this.setTradeField('sum', sum, Number);
      }
    },
    fieldTax: {
      get () {
        return this.trade.tax;
      },
      set (tax) {
        this.setTradeField('tax', tax, Number);
      }
    },
    fieldCommission () {
      return this.trade.commission || [];
    },
    fieldCommission0: {
      get () {
        return this.fieldCommission[0];
      },
      set (commission) {
        this.setTradeCommissionField(0, commission);
      }
    },
    fieldCommission1: {
      get () {
        return this.fieldCommission[1];
      },
      set (commission) {
        this.setTradeCommissionField(1, commission);
      }
    },
    fieldCommission2: {
      get () {
        return this.fieldCommission[2];
      },
      set (commission) {
        this.setTradeCommissionField(2, commission);
      }
    },
    fieldCommission3: {
      get () {
        return this.fieldCommission[3];
      },
      set (commission) {
        this.setTradeCommissionField(3, commission);
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
    saveTrade() {
      this.$store.dispatch('saveTrade', this.trade).then((tradeId) =>{
        this.$store.commit('editingTrade', false);
        this.$store.dispatch('fetchTrades', this.security.code);
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
    padding: 10px;
    box-sizing: border-box;
    background-color: aliceblue;
    &__field {
      padding-bottom: 5px;
      line-height: 20px;
    }
    &__label {
      font-weight: 400;
      font-stretch: condensed;
      float: left;
      width: 100px;
    }
    &__input {
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
