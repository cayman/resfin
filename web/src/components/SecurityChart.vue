<template>
  <div class="chart" v-if="src">
    <img :src="src">
    <!-- http://mfd.ru/marketdata/chart/?id={$var}&timeframe=1440&intervalMode=closedRay&count=-60&width=320&height=200&lineColor=%234169E1-->
    <!-- http://mfd.ru/marketdata/chart/?id={$var}&timeframe=1440&count=-120&width=400&height=180&lineColor=%234169E1-->
    <!-- http://mfd.ru/marketdata/chart/?id={$var}&timeframe=1440&count=-60&intervalMode=closedRay&width=400&height=170&lineColor=%234169E1-->
    <!-- http://mfd.ru/marketdata/chart/?id={$var}&timeframe=1440&intervalMode=closedRay&count=-60&width=255&height=150&lineColor=%23ff660a-->
  </div>
</template>

<script>
  import {replaceUrl} from '../utils';
  export default {
    name: 'security-chart',
    computed: {
      link () {
        return this.$store.getters.chartLink;
      },
      security () {
        return this.$store.state.security.model;
      },
      varValue () {
        return this.security[this.link.var];
      },
      src () {
        return this.link ? replaceUrl(this.link.chart, 'var', this.varValue, this.link.varLowerCase) : null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chart {
    border: lightsteelblue;
  }
</style>