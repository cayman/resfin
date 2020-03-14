<template>
  <nav class="menu-bar">
    <ul>
      <li>
        <a @click="toggleExpand()">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </a>
      </li>
      <template v-for="page in pages" >
        <li :key="page.id" :class="{active: pageCode === page.code}" >
          <a @click="setPage(page.code)" :title="page.code + ' - ' + page.name">
            <i v-if="page.icon" :class="page.icon" aria-hidden="true"></i>
            <span v-if="page.label">{{ page.label }}</span>
          </a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'menu-bar',
    props: {
      pageCode: {
        type: String,
        require: true
      }
    },
    data() {
      return {
        prefix: [
          {id:'f', code:'f',  icon: 'fa fa-bookmark-o'},
          {id:'p', code:'p', icon: 'fa fa-briefcase'}
        ],
        suffix: [
          {id:'t', code:'t',  icon: 'fa fa-shopping-cart'},
        ]
      }
    },
    computed: {
      sectors () {
        return this.$store.state.sectors.list;
      },
      pages () {
        return this.prefix.concat(this.sectors).concat(this.suffix);
      }
    },
    methods: {
      setPage (code) {
        this.$store.dispatch('setPage', code);
      },
      toggleExpand() {
        this.$root.expanded = !this.$root.expanded;
        console.log('expanded', this.$root.expanded);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/var.scss";
  .menu-bar {
    background-color: $bg-color-menu;
    font-family:  $font-family-condensed;
    font-weight:  $font-weight-regular;
    font-size: $font-size-middle;
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: auto;
      display: flex;
      display: -webkit-flex;
      flex-wrap: nowrap;
    }
    li {
      margin-top: $px5;
      line-height: 28px;
      flex: 0 0 auto;
      padding: 0;
      min-width: 45px;
      a {
        display: block;
        text-align: center;
        padding: $px3;
        color: $text-color-white;
        &:hover {
          color: $text-color-base;
          border-top-left-radius: $px2;
          border-top-right-radius: $px2;
          background-color: $bg-color-menu-hover;
        }
      }

      &.active {
        border-top-left-radius: $px2;
        border-top-right-radius: $px2;
        background-color: $bg-color-menu-active;
        a {
          color: $text-color-base;
        }
      }

    }
  }
</style>