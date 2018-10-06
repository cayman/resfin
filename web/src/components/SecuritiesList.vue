<template>
  <div class="security-list">

    <securities-list-item v-for="(security, idx) in securities" :key="idx" :security="security" ></securities-list-item>
    <div  class="security-list__actions">
      <a class="security-list__action" @click="addSecurity">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </a>
      <!--<a class="security-list__action" @click="batchAction">-->
      <!--<i class="fa fa-address-book" aria-hidden="true"></i>-->
      <!--</a>-->
    </div>

  </div>
</template>

<script>
  import SecuritiesListItem from './SecuritiesListItem';
  export default {
    name: 'securities-list',
    components: {
      SecuritiesListItem
    },
    computed: {
      securities () {
        return this.$store.state.securities.list;
      },
      page () {
        return this.$store.state.page;
      }
    },
    methods: {
      addSecurity() {
        this.$store.dispatch('newSecurity', this.page);
      },
      batchAction() {
        // this.$store.dispatch('renameCommentsFields');
        // this.$store.dispatch('renameTradesFields');
        this.$store.dispatch('renameSecuritiesFields');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .security-list {
    text-align: left;
    border: darkblue;
    padding-right: 5px;

    &__actions {
      text-align: left;
      background: lightsteelblue;
      padding: 2px 2px 2px 5px;
      border-radius: 2px;
      line-height: 20px;
    }
    &__action {
      color: darkslategray;
      float: right;
      margin: 0;
      // padding: 2px 2px;
      text-align: center;
      line-height: 20px;
      width: 20px;
      cursor: pointer;
      border-radius: 2px;
      &:hover {
        background-color: cornflowerblue;
        color: white;
      }
    }
  }

</style>