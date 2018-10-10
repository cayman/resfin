<template>
  <div class="chart">

    <template v-for="link in links">
      <img v-if="link.src && link.chartType === 'img'" :key="link.code"  :src="link.src"/>
    </template>
    <!--<trading-view :options="options" />-->
    <!--http://mfd.ru/marketdata/chart/?id=41369&timeframe=1440&intervalMode=closedRay&count=-60&width=400&height=200&lineColor=#ff660a-->
    <!--http://mfd.ru/marketdata/chart/?id=41369&timeframe=1440&intervalMode=closedRay&count=-60&width=400&height=200&lineColor=#ff660a-->

    <!--<trading-view :options="options" />-->
  </div>
</template>

<script>
  import {replaceUrl} from '../../utils';
  import TradingView from './TradingView';
  export default {
    name: 'security-chart',
    components: { TradingView },
    computed: {
      security () {
        return this.$store.state.security.model;
      },
      options () {
        return {
          'symbol': 'MOEX:' + this.security.code,
          'width': 400,
          'height': 280,
          // 'timezone': 'Europe/Moscow',
          'theme': 'Light',
          'style': '1',
          // 'locale': 'ru',
          'toolbar_bg': 'white',
          'enable_publishing': false,
          'hide_top_toolbar': false,
          'hide_legend': false,
          'range': 'ytd',
          'save_image': false,
          'show_popup_button': true,
          'popup_width': '1000',
          'popup_height': '650'
        }
      },
      links () {
        return this.$store.getters.chartLinks.map(link => ({
          ...link,
          src: replaceUrl(link.chartUrl, 'var', this.security[link.var], link.varLowerCase)
        }));
      },
    }
  }
</script>

<style lang="scss" scoped>
  .chart {
    border: lightsteelblue;
    font-size: 10px;
  }
</style>