<template>
  <div class="security-info">
    <span class="security-info__code">{{ security.code }}</span>
    <span class="security-info__title">{{ security.desc }}</span>
    <br/><span class="security-info__sector">{{ sector }}</span>
  </div>
</template>

<script>
export default {
  name: 'security-info',
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
      return this.sectors.join(' / ');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/var";

  .security-info {
    min-height: 20px;
    padding: $px10 $px10 0 $px10;

    &__code {
      display: inline-block;
      font-family: $font-family-base;
      font-weight: $font-weight-boldest;
      white-space: nowrap;
      color: $text-color-link;
      padding: $px2;
      margin-right: $px10;
    }
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
      font-weight: $font-weight-regular;
      color: $text-color-sector;
      white-space: nowrap;
      padding: $px2;
    }

  }
</style>
