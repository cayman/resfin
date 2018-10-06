<template>
  <div class="form">
    <div class="form__field">
      <input type="text" v-model="fieldTitle" placeholder="Заголовок" size="44"/>
    </div>
    <div class="form__field">
        <textarea v-model="fieldText" placeholder="Комментарий" rows="4" cols="44"></textarea>
    </div>
    <div class="form__field">
      <input type="text" v-model="fieldSource" placeholder="Источник" size="44"/>
    </div>
    <div class="form__field">
       <span class="form__label" @click="setFieldPrice">
          Цена:
      </span>
      <span class="form__input">
        <input type="number" v-model="fieldPrice" style="width: 5em"/>
      </span>
      <span class="form__label">
          Дивиденд:
      </span>
      <span class="form__input">
        <input type="number" v-model="fieldDividend" :disabled="!fieldPrice" style="width: 5em">
      </span>
      <dividend class="form__label" :price="fieldPrice" :dividend="fieldDividend"></dividend>
    </div>
    <div class="form__field">
      <span class="form__label">
        &nbsp;
      </span>
      <span class="form__input">
        <button @click="saveComment" :disabled="!fieldText">Сохранить</button>&nbsp;
        <button @click="cancelComment">Отмена</button>
      </span>
    </div>
  </div>
</template>

<script>
import form from './form'
import {percent} from '../utils';
import Dividend from './Dividend'
export default {
  name: 'stock-comment-form',
  mixins: [form],
  components: { Dividend },
  computed: {
    stock () {
      return this.$store.state.stock.model;
    },
    stockPrice () {
      return this.$store.getters.stockPrice;
    },
    comment () {
      return this.$store.state.comment.model;
    },
    fieldTitle: {
      get () {
        return this.comment.title;
      },
      set (title) {
        this.setCommentField('title', title);
      }
    },
    fieldText: {
      get () {
        return this.comment.text;
      },
      set (text) {
        this.setCommentField('text', text);
      }
    },
    fieldSource: {
      get () {
        return this.comment.source;
      },
      set (source) {
        this.setCommentField('source', source);
      }
    },
    fieldPrice: {
      get () {
        return this.comment.price;
      },
      set (price) {
        this.setCommentField('price', price, Number);
      }
    },
    fieldDividend: {
      get () {
        return this.comment.dividend;
      },
      set (dividend) {
        this.setCommentField('dividend', dividend, Number);
      }
    },
    percent () {
      return percent(this.fieldDividend, this.fieldPrice);
    }
  },
  methods: {
    setFieldPrice () {
      this.fieldPrice = this.stockPrice;
    },
    saveComment() {
      this.$store.dispatch('saveComment', this.comment).then((commentId) =>{
        this.$store.commit('editingComment', false);
        this.$store.dispatch('fetchComments', this.stock.code);
        this.$store.commit('setExpandComments', [commentId]);
      });
    },
    cancelComment() {
      this.$store.commit('editingComment', false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .form {
    padding: 10px;
    box-sizing: border-box;
    background-color: white;
    &__field {
      padding-bottom: 10px;
    }
    &__label {
      font-weight: 400;
      font-stretch: condensed;
      line-height: 25px;
    }
    &__input {
      padding-left: 5px;
      padding-right: 5px;
    }
  }
</style>
