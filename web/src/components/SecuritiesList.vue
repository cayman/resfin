<template>
  <div class="security-list">

    <securities-list-item v-for="(security, idx) in securities" :key="idx" :security="security" ></securities-list-item>
    <div  class="security-list__actions">
      <a class="security-list__action" @click="addSecurity">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </a>

      <!--{{ $root.contentWidth }}-->
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
  @import "../assets/var.scss";

  .security-list {
    text-align: left;

    &__actions {
      text-align: left;
      /*background: lightsteelblue;*/
      padding: 2px 2px 2px 5px;
      border-radius: 2px;
      line-height: $px20;
    }
    &__action {
      color: $icon-color;
      float: right;
      margin: 0;
      // padding: 2px 2px;
      text-align: center;
      line-height: $px20;
      width: $px20;
      cursor: pointer;
      border-radius: $px2;
      &:hover {
        background-color: $button-color-hover;
        color: $icon-color-hover;
      }
    }
  }

</style>