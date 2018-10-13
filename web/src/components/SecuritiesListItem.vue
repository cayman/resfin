<template>
  <div class="security" :class="{active, portfolio}">
    <a class="security__code" :title="security.desc + ' ' + securityType.label" @click="select(security.id)">
      <div class="security__text">{{ security.code }}</div>
      <div class="security__indicator" >
        <interest-percent v-if="lastComment" :interest="lastComment.interest" :interest-visible="false" :price="lastComment.price" :small="true"></interest-percent>
        <span v-else> - </span>
      </div>
    </a>
    <a class="security__name" v-if="expanded" :title="security.desc + ' ' + securityType.label" @click="select(security.id)">
      <div class="security__text">{{ security.name }} {{ securityType.label  }}</div>
      <div class="security__indicator" v-if="indicators.length">
        <template v-for="(indicator, index) in indicators">
          <security-comment-indicator :key="index" :indicator="indicator" :small="true"></security-comment-indicator>
          <span>&nbsp;</span>
        </template>
      </div>
    </a>
    <a class="security__icon" v-if="expanded" @click="toggleFavorite" title="Избранное">
      <i :class="favorites[security.favorite || 0].icon" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
  import InterestPercent from './common/InterestPercent'
  import SecurityCommentIndicator from './comments/SecurityCommentIndicator';
  import form from './form'
  export default {
    name: 'securities-list-item',
    mixins: [form],
      components: { InterestPercent, SecurityCommentIndicator  },
    props: {
      security: {
        type: Object,
        required: true
      }
    },
    computed: {
      securityType () {
        return this.$store.getters.securityTypes[this.security.typeCode] || { label: this.security.typeCode};
      },
      page () {
        return this.$store.state.page;
      },
      favorites () {
        return this.$store.getters.securityFavorites;
      },
      portfolio () {
        return this.page !== 'p' && this.security.portfolio;
      },
      active () {
        return this.$store.state.security.model.id === this.security.id;
      },
      comments () {
        return this.$store.state.securities.comments
          .filter(comment => comment.securityCode === this.security.code);
      },
      lastComment () {
        return this.comments[0];
      },
      indicators () {
        return this.lastComment.indicators ? this.lastComment.indicators.slice(0,4) : [];
      },
      expanded () {
        return this.$root.expanded;
      }
    },
    methods: {
      select (securityId) {
        this.$store.dispatch('fetchSecurityInfo', securityId);
      },
      toggleFavorite() {
        this.$store.dispatch('favoriteSecurity', this.security).then(() =>
          this.$store.dispatch('fetchSecurities', this.page)
        );
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/var.scss";

  .security {
    text-align: left;
    padding: 1px 5px 1px 5px;
    border-radius: 2px;
    height: 25px;
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;

    &__text {
      font-style: $font-family-condensed;
      font-weight: $font-weight-bold;
      color: $text-color-dark;
      line-height: normal;
      margin: 0;
      padding: 0;
    }
    &__indicator {
      font-style: $font-family-base;
      font-weight: $font-weight-regular;
      font-size: $font-size-small;
      line-height: 10px;
      margin: 0;
      padding: 0 2px;
    }

    &:hover {
      background-color: whitesmoke;
      cursor: pointer;
     // border: 1px solid powderblue;
     // border-radius: 2px;
    }
    &__code {
      flex: 0 0 42px;

    }
    &__name {
      flex: 0 0 110px;
      line-height: 20px;
      font-stretch: condensed;
      overflow: hidden;
    }
    &__icon {
      flex: 0 0 20px;
      line-height: 20px;
      color: $icon-color;
      // padding: 2px 2px;
      text-align: center;
      cursor: pointer;
      border-radius: 2px;
      &:hover {
        background-color: $bg-color-hover;
        color: $icon-color-hover;
      }
    }
  }

  .active {
    background-color: $bg-color-white;
  }

  .portfolio {
    color: green;
  }


</style>