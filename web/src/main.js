import Vue from 'vue';
import 'font-awesome/css/font-awesome.css';
import App from './App.vue'
import store from './store';
import {getLocalDate} from "./utils";

Vue.config.productionTip = false;

Vue.filter('currency', function (value = null, fixed = null) {
  if (value === null) return '';
  return fixed === null ? value.toLocaleString() : Number(value.toFixed(fixed)).toLocaleString();
});

Vue.filter('count', function (value = null, prefix = true) {
  if (value === null) return '';
  return value.toLocaleString() + (prefix ? ' шт.' : '');
});

Vue.filter('date', function (value) {
  if (!value) return '';
  return getLocalDate(value)
});

new Vue({
  render: h => h(App),
  store,
  data: {  }
}).$mount('#app');
