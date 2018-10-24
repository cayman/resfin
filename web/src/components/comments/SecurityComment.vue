<template>
  <div class="comment">
    <div class="comment__top">
      <a class="comment__action" @click="editComment">
        <i class="fa fa fa-pencil" aria-hidden="true" ></i>
      </a>
      <span class="comment__date">{{ created }}</span>
      <span class="comment__price" v-if="comment.price">
        <span class="comment__label">Цена:</span>
        <span>{{ comment.price | currency }} &#8381;</span>
      </span>
      <br v-if="comment.interest >= 0 && $root.tight" />
      <span v-if="comment.interest >= 0 " class="comment__interest">
        <span class="comment__label">Интерес:</span>
        <interest-percent :price="comment.price" :interest="comment.interest"></interest-percent>
      </span>
    </div>
    <div class="comment__title">
      {{ comment.title }}
      <a v-if="comment.source" :href="comment.source" class="comment__link" target="_info" title="Источник">
        <i class="fa fa-external-link" aria-hidden="true"></i>
      </a>
    </div>
    <div class="comment__text" v-html="comment.text">
    </div>
    <div class="comment__indicators" v-if="comment.indicators && comment.indicators.length">
      <security-indicator v-for="(indicator, index) in comment.indicators"
                                  :key="index" :indicator="indicator"></security-indicator>
    </div>
  </div>
</template>

<script>
import InterestPercent from '../common/InterestPercent';
import SecurityIndicator from '../common/SecurityIndicator';
import {getLocalDate} from '../../utils';
export default {
  name: 'security-comment',
  components: { InterestPercent, SecurityIndicator },
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
  @import "../../assets/var.scss";
  .comment {
    border-bottom: $px1 solid $line-color-base;
    padding: $px10 $px10;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-regular;
    &:last-child {
      border-bottom: none;
    }
    &__top {
      line-height: 20px;
    }
    &__action {
      cursor: pointer;
      float: right;
      width: auto;
      padding: 0 3px 0 3px;
      border-radius: $px2;
      background-color: $button-color;
      color: $icon-color;
      &:hover {
        background-color: $button-color-hover;
        color: $icon-color-hover;
      }
    }

    &__link {
      color: $text-color-link;
      vertical-align: bottom;
    }
    &__date {
      color: $text-color-date;
      font-size: $font-size-base;
      font-family: $font-family-condensed;
      margin-right: $px5;
    }
    &__price {
      font-size: $font-size-base;
      margin-right: $px5;
    }
    &__interest {
      font-size: $font-size-base;
    }
    &__label {
      margin-right: $px2;
      font-size: $font-size-base;
      color: $text-color-label;
    }
    &__title {
      font-weight: $font-weight-bold;
      font-size: $font-size-base;
    }
    &__text {
      font-family: $font-family-condensed;
      font-weight: $font-weight-regular;
      font-size: $font-size-base;
    }
    &__indicators{
      padding-top: $px10;
      font-weight: $font-weight-bold;
      font-size: $font-size-smaller;
    }
  }
</style>
