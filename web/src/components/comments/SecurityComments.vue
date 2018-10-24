<template>
  <div v-if="comments.length || editing">
    <security-comment-form v-if="editing && !commentId"></security-comment-form>
    <template v-for="_comment in comments" >
      <security-comment :key="_comment.id" :comment="_comment"></security-comment>
      <security-comment-form :key="_comment.id + 'form'" v-if="editing && _comment.id === commentId" ></security-comment-form>
    </template>
  </div>
</template>

<script>
  import SecurityComment from './SecurityComment.vue'
  import SecurityCommentForm from './SecurityCommentForm.vue'
  export default {
    name: 'security-comments',
    components: { SecurityComment, SecurityCommentForm },
    computed: {
      loaded () {
        return !this.$store.state.comments.loading;
      },
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