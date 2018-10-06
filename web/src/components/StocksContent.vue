<template>
  <div class="content">
    <div class="content__left">
      <stock-list/>
    </div>
    <div class="content__right">
      <template>
        <stock-form v-if="editing"></stock-form>
        <stock-info v-else></stock-info>
      </template>
    </div>
  </div>
</template>

<script>
import StockList from './StockList.vue'
import StockInfo from './StockInfo.vue'
import StockForm from './StockForm.vue'
export default {
  name: 'stocks-content',
  components: { StockList, StockInfo, StockForm },
  computed: {
    editing () {
      return this.$store.state.stock.editing === true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .content {
    background: lightsteelblue;
    padding: 5px;
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;
    &__left {
      flex: 0 0 190px;
    }
    &__right {
      flex: 1 1 200px;
    }
  }
</style>
