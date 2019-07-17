import Vue from 'vue';
import 'font-awesome/css/font-awesome.css';
import App from './components/App.vue'
import store from './store';
import filters from './filters';

Vue.config.productionTip = false;

Vue.use(filters);

new Vue({
  render: h => h(App),
  store,
  data: {
    expanded: window.innerWidth > 640,
    window: { width: window.innerWidth, height: window.innerHeight }
  },
  computed: {
    contentWidth () {
      return this.window.width - (this.expanded ? 190 : 50);
    },
    gt350 () {
      return this.contentWidth > 350;
    },
    gt370 () {
      return this.contentWidth > 370;
    },
    gt400 () {
      return this.contentWidth > 400;
    },
    gt430 () {
      return this.contentWidth > 430;
    },
    gt470 () {
      return this.contentWidth > 470;
    },
    gt500 () {
      return this.contentWidth > 500;
    },
    gt530 () {
      return this.contentWidth > 530;
    },
    gt600 () {
      return this.contentWidth > 600;
    },
    gt850 () {
      return this.contentWidth > 850;
    },
    column () {
      return this.gt600 ? 10 : this.gt430 ? 8 : this.gt370 ? 7 : 6;
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
}).$mount('#app');
