<template>
  <div class="interest">
      <span class="interest__label">Дивиденды: </span>
      <span v-if="price && interest >= 0 " class="interest__value">
        <interest-percent :price="price" :interest="interest"></interest-percent>
      </span>
  </div>
</template>

<script>
import InterestPercent from '../common/InterestPercent'
export default {
  name: 'security-interest',
  components: { InterestPercent },
  computed: {
    securityLoaded () {
      return !this.$store.state.security.loading;
    },
    price () {
      return this.$store.getters.securityPrice;
    },
    comments () {
      return this.$store.state.comments.list || [];
    },
    comment () {
      return this.comments[0];
    },
    interest () {
      return this.comment ? this.comment.interest : 0;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var";

  .interest {
    height: 20px;
    overflow: hidden;

    &__value {
      font-size: $font-size-base;
    }
    &__label {
      margin-right: $px2;
      font-size: $font-size-base;
      color: $text-color-label;
    }
  }
</style>
