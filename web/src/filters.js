import {getLocalDate, currency} from './utils';

const filters = {};

filters.install = function (Vue) {

    Vue.filter('currency', function (value = null, fixed = null, local = true) {
        if (value === null) return '';
        if (Array.isArray(value)) {
            return value.map(val => currency(val, fixed, local)).join('+');
        } else {
            return currency(value, fixed, local);
        }
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

};

export default filters;
