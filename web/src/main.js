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

Vue.filter('volume', function (volume = null) {
  if (volume === null) return '';
  if(volume === 0) return 0;

  const del = (val,name) => (volume/val).toFixed(2) + ' '+ name;

  return volume>=1000000000000 ? del(1000000000000,'трлн')
    : volume>=1000000000 ? del(1000000000,'млрд')
    : volume>=1000000 ? del(1000000,'млн')
    : volume>=1000 ? del(1000,'тыс'): del(1,'руб');
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
  data: {
    expanded: window.innerWidth > 640
  }
}).$mount('#app');
