<template>
  <div class="content">
    <div class="content__left" :class="{expanded}">
      <securities-list/>
    </div>
    <div class="content__right">
      <template>
        <security-form v-if="editing"></security-form>
        <security-card v-else></security-card>
      </template>
    </div>
  </div>
</template>

<script>
import SecuritiesList from './SecuritiesList.vue'
import SecurityCard from './SecurityCard.vue'
import SecurityForm from './SecurityForm.vue'
export default {
  name: 'securities-content',
  components: { SecuritiesList, SecurityCard, SecurityForm },
  computed: {
    editing () {
      return this.$store.state.security.editing === true;
    },
    expanded () {
      return this.$root.expanded;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/var.scss";
  .content {
    background: $bg-color-base;
    padding: 5px;
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;
    &__left {
      flex: 0 0 40px;
    }
    .expanded {
      flex: 0 0 190px;
    }
    &__right {
      flex: 1 1 200px;
    }
  }
</style>
