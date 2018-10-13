<template>
  <nav class="menu-bar">
    <ul>
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
            }else {
              this.$store.dispatch('newSecurity', code);
            }
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu-bar {
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #333333;
    }

    li {
      float: left;
      color: white;
      &.active {
        background-color: lightsteelblue;
        color: black;
      }
    }

    li a {
      display: block;

      text-align: center;
      padding: 5px;
      text-decoration: none;
      cursor: pointer;
    }

    li a:hover {
      background-color: darkslategray;
    }
  }
</style>