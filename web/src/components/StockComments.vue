<template>
  <div v-if="comments.length">
    <stock-comment-form v-if="editing && !commentId"></stock-comment-form>
    <template v-for="_comment in comments" >
      <stock-comment :key="_comment.id" :comment="_comment"></stock-comment>
      <stock-comment-form :key="_comment.id + 'form'" v-if="editing && _comment.id === commentId" ></stock-comment-form>
    </template>
  </div>
</template>

<script>
  import StockComment from './StockComment.vue'
  import StockCommentForm from './StockCommentForm.vue'
  export default {
    name: 'stock-comments',
    components: { StockComment, StockCommentForm },
    computed: {
      comments () {
        return this.$store.state.comments.list;
      },
      editing () {
        return this.$store.state.comment.editing;
      },
      commentId () {
        return this.$store.state.comment.model.id;
      }
    },
  }
</script>

<style scoped>

</style>