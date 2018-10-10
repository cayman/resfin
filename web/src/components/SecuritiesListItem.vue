<template>
  <div class="security" :class="{active, portfolio}">
    <a class="security__code" :title="security.desc + ' ' + securityType.label" @click="select(security.id)">{{ security.code }}</a>
    <a class="security__name" :title="security.desc + ' ' + securityType.label" @click="select(security.id)">
      {{ security.name }}
      {{ securityType.label  }}
      <span v-if="lastComment">
        <interest-percent :interest="lastComment.interest" :interest-visible="false" :price="lastComment.price" :small="true"></interest-percent>
      </span>
    </a>
    <a class="security__icon" @click="toggleFavorite" title="Избранное">
      <i :class="favorites[security.favorite || 0].icon" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
  import InterestPercent from './common/InterestPercent'
  import form from './form'
  export default {
    name: 'securities-list-item',
    mixins: [form],
      components: { InterestPercent },
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

  .security {
    text-align: left;
    padding: 2px 2px 2px 5px;
    border-radius: 2px;
    line-height: 20px;

    &:hover {
      background-color: whitesmoke;
      cursor: pointer;
     // border: 1px solid powderblue;
     // border-radius: 2px;
    }
    &__code {
      float: left;
      width: 45px;
      font-stretch: condensed;
    }
    &__name {
      font-stretch: condensed;
    }
    &__icon {
      color: darkslategray;
      float: right;
      margin: 0;
      // padding: 2px 2px;
      text-align: center;
      line-height: 20px;
      width: 20px;
      cursor: pointer;
      border-radius: 2px;
      &:hover {
        background-color: cornflowerblue;
        color: white;
      }
    }
  }

  .active {
    background-color: white;
  }

  .portfolio {
    color: green;
  }


</style>