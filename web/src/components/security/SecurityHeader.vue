<template>
  <div class="security-header">
    <span class="security-header__title">{{ security.desc }}</span>
    <span class="security-header__sector">{{ sector }}</span>
  </div>
</template>

<script>
export default {
  name: 'security-header',
  computed: {
    loaded () {
      return !this.$store.state.security.loading;
    },
    security () {
      return this.$store.state.security.model;
    },
    sectors () {
      return this.security.sectorName.split('/');
    },
    sector () {
      return this.sectors[this.sectors.length - 1];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var";

  .security-header {
    min-height: 20px;

    &__title {
      display: inline-block;
      font-family: $font-family-base;
      white-space: nowrap;
      padding: $px2;
      margin-right: $px10;
    }
    &__sector {
      display: inline-block;
      font-family: $font-family-condensed;
      font-weight: $font-weight-lite;
      color: $text-color-sector;
      white-space: nowrap;
      padding: $px2;
    }

  }
</style>
