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
      <interest-percent v-if="fieldInterest" class="form__label" :price="fieldPrice" :interest="fieldInterest"></interest-percent>
    </div>
    <div v-for="(fieldIndicator, index) in fieldIndicators" :key="index + 1">
      <security-comment-form-indicator :index="index"></security-comment-form-indicator>
    </div>
    <security-comment-form-indicator :index="fieldIndicators.length"></security-comment-form-indicator>
    <div class="form__field">
      <span class="form__label">
        &nbsp;
      </span>
      <span class="form__input">
        <button @click="saveComment" :disabled="!allow">Сохранить</button>&nbsp;
        <button @click="cancelComment">Отмена</button>
      </span>
    </div>
  </div>
</template>

<script>
import form from '../form'
import {percent} from '../../utils';
import InterestPercent from '../common/InterestPercent'
import SecurityCommentFormIndicator from './SecurityCommentFormIndicator'
export default {
  name: 'security-comment-form',
  mixins: [form],
  components: { InterestPercent, SecurityCommentFormIndicator },
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
        this.setField('title', title);
      }
    },
    fieldText: {
      get () {
        return this.comment.text;
      },
      set (text) {
        this.setField('text', text);
      }
    },
    fieldSource: {
      get () {
        return this.comment.source;
      },
      set (source) {
        this.setField('source', source);
      }
    },
    fieldPrice: {
      get () {
        return this.comment.price;
      },
      set (price) {
        this.setField('price', price, Number);
      }
    },
    fieldInterest: {
      get () {
        return this.comment.interest;
      },
      set (interest) {
        this.setField('interest', interest, Number);
      }
    },
    fieldIndicators () {
      return this.comment.indicators || [];
    },
    fieldIndicatorsWrong () {
      return this.fieldIndicators.some(indicator => !indicator.code || indicator.value === null)
    },
    allow () {
      return (this.fieldTitle || this.fieldText) && !this.fieldIndicatorsWrong;
    },
    percent () {
      return percent(this.fieldInterest, this.fieldPrice);
    }
  },
  methods: {
    setFieldPrice () {
      this.fieldPrice = this.securityPrice;
    },
    setField(name, value, type) {
      console.log('setField', name, value, typeof value);
      this.$store.commit('setCommentField', {name, value, type});
    },
    saveComment() {
      const code = this.security.code;
      this.$store.dispatch('saveComment', this.comment).then((commentId) =>{
        this.$store.commit('editingComment', false);
        this.$store.dispatch('fetchComments', code).then(comments => {
          this.$store.commit('updateSecuritiesComments', { code, list: comments.filter(c => c.interest >= 0) });
        });

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
