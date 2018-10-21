<template>
  <div class="security" :class="{active, portfolio}">
    <a class="security__code" :title="security.desc + ' ' + securityType.label" @click="select(security.id)">
      <div class="security__text">{{ security.code }}</div>
      <div class="security__indicator" >
        <interest-percent v-if="interestComment" :interest="interestComment.interest" :interest-visible="false" :price="interestComment.price" :small="true"></interest-percent>
        <span v-else> - </span>
      </div>
    </a>
    <a class="security__name" v-if="expanded" :title="security.desc + ' ' + securityType.label" @click="select(security.id)">
      <div class="security__text">{{ security.name }} {{ securityType.label  }}</div>
      <div class="security__indicator" v-if="indicatorsComment">
        <template v-for="(indicator, index) in indicators">
          <security-comment-indicator :key="index" :indicator="indicator" :small="true"></security-comment-indicator>
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
      interestComment () {
        return this.comments.find(comment => comment.interest >= 0);
      },
      indicatorsComment () {
        return this.comments.find(comment => comment.indicators && comment.indicators.length);
      },
      indicators () {
        return this.indicatorsComment ? this.indicatorsComment.indicators.slice(0,4) : null;
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
          // комментарии не запрашиваем, так как поменялся только объект
        );
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/var.scss";

  .security {
    text-align: left;
    margin-bottom: $px2;
    padding: $px2 $px3 $px2 $px3;
    border-top-left-radius: $px2;
    border-bottom-left-radius: $px2;
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;

    &:hover {
      background-color: $bg-color-sidebar-hover;
      cursor: pointer;
    }

    // поле кода с индикатором цены
    &__code {
      display: inline-block;
      flex: 0 0 45px;
    }
    // поле имени с мультипликторами
    &__name {
      display: inline-block;
      flex: 0 0 115px;
      overflow: hidden;
    }
    // строка текста
    &__text {
      font-family: $font-family-condensed;
      font-weight: $font-weight-regular;
      font-size: $font-size-base;
      color: $text-color-base;
      height: $px20;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    // строка индикаторов
    &__indicator {
      font-family: $font-family-base;
      font-weight: $font-weight-regular;
      font-size: $font-size-small;
      // line-height: $px10;
      margin: 0;
      padding: 0 $px2 0 $px2;
    }
    // иконка избранного
    &__icon {
      margin: $px2;
      padding: $px3;
      flex: 0 0 20px;
      background-color: $button-color;
      color: $icon-color;
      // line-height: $px20;
      text-align: center;
      cursor: pointer;
      border-radius: $px2;
      &:hover {
        background-color: $button-color-hover;
        color: $icon-color-hover;
      }
    }
  }

  .active {
    background-color: $bg-color-sidebar-active;
  }

  .portfolio {
    .security__text {
      color: $text-color-portfolio;
    }
  }


</style>