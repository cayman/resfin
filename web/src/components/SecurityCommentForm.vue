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
        <input type="number" v-model="fieldPrice" step="any"  style="width: 5em"/>
      </span>
      <span class="form__label">
          Начисление:
      </span>
      <span class="form__input">
        <input type="number" v-model="fieldInterest" step="any" :disabled="!fieldPrice" style="width: 5em">
      </span>
      <interest-percent class="form__label" :price="fieldPrice" :interest="fieldInterest"></interest-percent>
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
import InterestPercent from './InterestPercent'
export default {
  name: 'security-comment-form',
  mixins: [form],
  components: { InterestPercent },
  computed: {
    security () {
      return this.$store.state.security.model;
    },
    securityPrice () {
      return this.$store.getters.securityPrice;
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
    fieldInterest: {
      get () {
        return this.comment.interest;
      },
      set (interest) {
        this.setCommentField('interest', interest, Number);
      }
    },
    percent () {
      return percent(this.fieldInterest, this.fieldPrice);
    }
  },
  methods: {
    setFieldPrice () {
      this.fieldPrice = this.securityPrice;
    },
    saveComment() {
      this.$store.dispatch('saveComment', this.comment).then((commentId) =>{
        this.$store.commit('editingComment', false);
        this.$store.dispatch('fetchComments', this.security.code);
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
