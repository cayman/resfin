<template>
  <nav class="menu-bar">
    <ul>
      <li>
        <a @click="toggleExpand()">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </a>
      </li>
      <template v-for="page in pages" >
        <li :key="page.id" :class="{active: currentPage === page.code}" >
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
        main: [
          {id:'f', code:'f',  icon: 'fa fa-bookmark-o'},
          {id:'p', code:'p', icon: 'fa fa-briefcase'}
        ]
      }
    },
    computed: {
      currentPage () {
        return this.$store.state.page;
      },
      sectors () {
        return this.$store.state.sectors.list;
      },
      pages () {
        return this.main.concat(this.sectors);
      }
    },
    methods: {
      setPage (code) {
        console.log('setPage', code);
        this.$store.commit('setPage', code);
        this.$store.dispatch('fetchSecurities', code)
          .then(securities => {
            if(securities.length) {
              this.$store.dispatch('fetchSecurityInfo', securities[0].id);
              // this.$store.dispatch('fetchSecuritiesComments', securities.map(s => s.code));
              // не запрашиваем, так как уже имеем весь список, в релации будем
            }else {
              this.$store.dispatch('newSecurity', code);
            }
          });
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
      overflow: hidden;
    }

    li {
      margin-top: $px5;
      line-height: 20px;
      float: left;
      padding: 0;
      min-width: 30px;
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