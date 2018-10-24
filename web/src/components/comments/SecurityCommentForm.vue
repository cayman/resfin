<template>
  <div class="form">
    <div class="form__field">
      <input type="text" v-model="fieldTitle" placeholder="Заголовок" :style="{width}"/>
    </div>
    <div class="form__field">
        <textarea v-model="fieldText" placeholder="Комментарий" rows="5" :style="{width}"></textarea>
    </div>
    <div class="form__field">
      <input type="text" v-model="fieldSource" placeholder="Источник" :style="{width}"/>
    </div>
    <div class="form__field">
       <span class="form__label" @click="setFieldPrice">
          Цена:
      </span>
      <span class="form__input">
        <input type="number" v-model="fieldPrice" step="any"  style="width: 90px"/>
      </span>
    </div>
    <div class="form__field">
      <span class="form__label">
          Начисление:
      </span>
      <span class="form__input">
        <input type="number" v-model="fieldInterest" step="any" :disabled="!fieldPrice" style="width: 90px">
      </span>
      <span class="form__comment" v-if="fieldInterest" >
         <interest-percent :price="fieldPrice" :interest="fieldInterest"></interest-percent>
      </span>
   </div>
    <div v-for="(fieldIndicator, index) in fieldIndicators" :key="index + 1">
      <security-comment-form-indicator :index="index"></security-comment-form-indicator>
    </div>
    <security-comment-form-indicator :index="fieldIndicators.length"></security-comment-form-indicator>
    <div class="form__field">
      <span class="form__label">
        <button @click="saveComment" :disabled="!allow">Сохранить</button>
      </span>
      <span class="form__input">
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
    width() {
      return (this.$root.contentWidth > 500 ? 470 : this.$root.contentWidth < 230 ? 200 : this.$root.contentWidth - 30) + 'px';
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
  @import "../../assets/var.scss";
  .form {
    padding: $px10;
    background-color: $bg-color-form;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-regular;
    color: $text-color-base;

    &__field {
      padding-bottom: $px10;
    }
    &__label {
      float: left;
      width: 110px;
      font-weight: $font-weight-bold;
      font-family: $font-family-condensed;
      font-size: $font-size-smaller;
      color: $text-color-label;
      line-height: $px25;
      padding-right: $px5;
    }
    &__input {
      padding-right: $px5;
    }
    &__comment {
      font-family: $font-family-condensed;
    }
    textarea {
      max-height:1000000px;
      font-size: $font-size-base;
      font-max-size: $font-size-middle;
      -webkit-text-size-adjust: none;
      -moz-text-size-adjust: none;
      -ms-text-size-adjust: none;
      text-size-adjust: none;
    }
  }
</style>
