<template>
  <div class="comment">
    <div class="comment__top">
      <a class="comment__action" @click="editComment">
        <i class="fa fa fa-pencil" aria-hidden="true" ></i>
      </a>
      <span class="comment__date">{{ created }}</span>
      <span class="comment__price" v-if="comment.price">{{ comment.price }} &#8381;</span>
      <span v-if="comment.interest >= 0 " class="comment__interest">Интерес:
         <interest-percent :price="comment.price" :interest="comment.interest"></interest-percent>
      </span>
    </div>
    <div class="comment__title">
      {{ comment.title }}
      <a v-if="comment.source" :href="comment.source" class="comment__link" target="_info" title="Источник">
        <i class="fa fa-external-link" aria-hidden="true"></i>
      </a>
    </div>
    <div v-html="comment.text">
    </div>
  </div>
</template>

<script>
import InterestPercent from '../common/InterestPercent'
import {getLocalDate} from '../../utils';
export default {
  name: 'security-comment',
  components: { InterestPercent },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    created() {
      return getLocalDate(this.comment.created)
    }
  },
  methods: {
    editComment() {
      this.$store.dispatch('editComment', this.comment);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .comment {
    border-bottom: 0.5px solid lavender;
    padding: 5px 10px;
    &:last-child {
      // border-bottom: none;
    }
    &__top {
      line-height: 20px;
    }
    &__action {
      cursor: pointer;
      float: right;
      width: auto;
      padding: 0 3px 0 3px;
      border-radius: 2px;
      color: lightslategrey;
      &:hover {
        background-color: cornflowerblue;
        color: white;
      }
    }

    &__link {
      color: lightsteelblue;
      vertical-align: bottom;
    }
    &__date {
      color: lightsteelblue;
      font-stretch: condensed;
    }
    &__price {
      margin-left: 5px;
    }
    &__interest {
      margin-left: 5px;
    }
    &__title {
      font-weight: bold;
    }
  }
</style>
