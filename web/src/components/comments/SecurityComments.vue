<template>
  <div class="comments">
    <div class="comments__header">
      <span class="comments__expander" @click="expanded = !expanded">
        <i class="fa fa-compress" v-if="expanded" aria-hidden="true"></i>
        <i class="fa fa-expand" v-else aria-hidden="true"></i>
        <span class="comments__code">{{ security.code }}</span>
        <span class="comments__title">Комментарии</span>
      </span>
      <template v-if="expanded">
        <a class="comments__action" @click="addComment">
          <i class="fa fa-commenting-o" aria-hidden="true" title="Добавить комментарий"></i>
        </a>
      </template>
    </div>
    <template v-if="expanded">
      <security-comment-form v-if="editing && !commentId"></security-comment-form>
      <template v-for="_comment in comments" >
        <security-comment :key="_comment.id" :comment="_comment"></security-comment>
        <security-comment-form :key="_comment.id + 'form'" v-if="editing && _comment.id === commentId" ></security-comment-form>
      </template>
    </template>
  </div>
</template>

<script>
  import SecurityComment from './SecurityComment.vue'
  import SecurityCommentForm from './SecurityCommentForm.vue'
  export default {
    name: 'security-comments',
    components: { SecurityComment, SecurityCommentForm },
    data () {
      return {
        expanded: true
      }
    },
    computed: {
      loaded () {
        return !this.$store.state.comments.loading;
      },
      security () {
        return this.$store.state.security.model;
      },
      securityPrice () {
        return this.$store.getters.securityPrice;
      },
      comments () {
        return this.$store.state.comments.list || [];
      },
      editing () {
        return this.$store.state.comment.editing;
      },
      commentId () {
        return this.$store.state.comment.model.id;
      }
    },
    methods: {
      addComment() {
        this.$store.dispatch('newComment', {securityCode: this.security.code, price: this.securityPrice});
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var.scss";
  .comments {
    width: 100%;
    margin-bottom: 20px;
    &__header {
      margin-top: 5px;
      padding: $px5;
      color: $text-color-date;
      background-color: $bg-color-row-header;
      border-bottom: 1px solid $bg-color-sidebar;
      font-family: $font-family-base;
      font-weight: $font-weight-bold;
      font-size: $font-size-middle;
      line-height: 20px;
    }
    &__expander {
      cursor: pointer;
    }
    &__code {
      padding: $px5 0 $px5 $px10;
    }
    &__title {
      padding: $px5 $px10;
    }
    &__action {
      display: inline-block;
      background-color: $button-color;
      color: $icon-color;
      cursor: pointer;
      margin-left: $px5;
      margin-right: $px5;
      padding: 0 $px3;
      border-radius: $px1;
      line-height: normal;
      &:hover {
        background-color: $button-color-hover;
        color: $icon-color-hover;
      }
    }
  }
</style>