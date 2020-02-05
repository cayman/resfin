<template>
  <div class="content">
    <div class="content__left" :class="{expanded}">
      <securities-list/>
    </div>
    <div class="content__right">
      <security-links class="content__links"/>
      <security-form class="content__body" v-if="editing"/>
      <security-card class="content__body" v-else/>
    </div>
  </div>
</template>

<script>
import SecuritiesList from './SecuritiesList.vue'
import SecurityLinks from './links/SecurityLinks.vue'
import SecurityCard from './security/SecurityCard.vue'
import SecurityForm from './security/SecurityForm.vue'
export default {
  name: 'securities-content',
  components: { SecuritiesList, SecurityLinks, SecurityCard, SecurityForm },
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
    background: $bg-color-sidebar;
    padding: $px5;
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;
    &__left {
      flex: 0 0 50px;
      height: 100%;
    }
    .expanded {
      flex: 0 0 190px;
    }
    &__right {
      min-width: 310px;
      flex: 1 1 200px;;
      display: flex;
      display: -webkit-flex;
      flex-wrap: nowrap;
      flex-direction: column;
    }
    &__links {
      font-size: $font-size-smaller;
      flex: 0 0 35px;
    }
    &__body {
      // border: 1px solid red;
      flex: 1 1 auto;
      overflow: auto;
      margin-bottom: 35px;
    }
  }
</style>
