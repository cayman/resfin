<template>
  <span class="liquidity">
    <a class="liquidity__label" title="Листинг котировки">L</a>
    <span class="liquidity__value" :class="{up: securityLevel === 1, down: securityLevel > 2}">{{ securityLevel }}</span>
    <a class="liquidity__label" title="Объем дневных торгов">V</a>
    <span class="liquidity__value" :class="{up: securityVolume > 100000000, down: securityVolume <= 500000 }">{{securityVolume | volume}}</span>
  </span>
</template>

<script>
export default {
  name: 'security-liquidity',
  computed: {
    securityLevel () {
      return this.$store.getters.securityLevel;
    },
    securityVolume () {
      return this.$store.getters.securityVolume;
    },
    securityStatus () {
      return this.$store.getters.securityStatus;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var";

  .liquidity {
    font-family: $font-family-condensed;
    padding-left: $px5;

    .up {
      color: $text-color-up;
    }
    .down {
      color: $text-color-down;
    }

    &__label {
      cursor: pointer;
      color: $text-color-label;
      padding-right: $px2;
    }

    &__value {
      font-weight: $font-weight-lite;
      padding-right: $px5;
      color: $text-color-normal;
      font-size: $font-size-smaller;
    }
  }



</style>
