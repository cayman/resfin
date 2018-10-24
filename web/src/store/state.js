import {getAppStorageItem} from "../utils";

export default {
  page: getAppStorageItem('page') || 'p',
  user: getAppStorageItem('user') || {},
  signIn: getAppStorageItem('signIn') || null,
  message: {
    type: null,
    title: null,
    error: null
  },
  sectors : {
    loading: false,
    list: []
  },
  links : {
    loading: false,
    list: []
  },
  indicators : {
    loading: false,
    list: []
  },
  accounts : {
    loading: false,
    list: []
  },
  securities : {
    loading: false,
    list: [],
    comments: []
  },
  security : {
    id: getAppStorageItem('securityId') || null,
    loading: false,
    editing: false,
    expanded: [],
    url: 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities/',
    url1: 'https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities/LNZL/candles.html?till=2018-10-07&interval=24&start=0',
    market: {
    },
    price: {
    },
    model: {
      code: null
    },
    types: [
      { code:'ап', label:'ап', name: 'Превилигированная акция'},
      { code:'ао', label:'ао', name: 'Обыкновенная акция'},
      { code:'др', label:'др', name: 'Депозитарные расписки'}
    ],
    favorites: [
      { code:5, icon:'fa fa-star-o', name: 'Избранная'},
      { code:1, icon:'fa fa-thumbs-o-down', name: 'Плохая'},
      { code:0, icon:'fa', name: 'Обычная'},
    ],
  },
  trades : {
    loading: false,
    list: []
  },
  trade : {
    loading: false,
    editing: false,
    expanded: [],
    types: [
      { code:'dividend', name: 'Дивиденд', icon: 'fa fa-money' },
      { code:'buy', name: 'Покупка', icon: 'fa fa-plus'},
      { code:'sell', name: 'Продажа', icon: 'fa fa-minus'}
    ],
    model: {
      code: null,
      securityCode: null,
      accountCode: null,
      commission: null,
    }
  },
  comments : {
    loading: false,
    list: []
  },
  comment : {
    loading: false,
    editing: false,
    model: {
      securityCode: null,
      indicators: null,
    }
  }
}