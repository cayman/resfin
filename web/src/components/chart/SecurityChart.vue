<template>
  <div class="security-chart">
    <template v-for="link in links">
      <img v-if="link.src && link.chartType === 'img'" :key="link.code" class="security-chart__image"  :src="link.src"/>
    </template>
    <!--<trading-view :options="options" />-->
    <!--http://mfd.ru/marketdata/chart/?id={$var}&timeframe=1440&intervalMode=closedRay&count=-120&width=450&height=250&lineColor=#ff660a-->
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
      loaded () {
        return !this.$store.state.security.loading;
      },
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
  .security-chart {
    min-height: 160px;
    max-height: 280px;
    max-width: 500px;
    &__image {
      // border: 1px solid firebrick;
      width: 100%;
      height: 100%;
    }
  }
</style>