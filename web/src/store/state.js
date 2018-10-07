import {getAppStorageItem} from "../utils";

export default {
  page: getAppStorageItem('page') || 'p',
  user: getAppStorageItem('user') || {},
  loading: false,
  message: {
    type: null,
    title: null,
    error: null
  },
  sectors : {
    list: []
  },
  links : {
    list: []
  },
  accounts : {
    list: []
  },
  securities : {
    list: []
  },
  security : {
    editing: false,
    expanded: [],
    url: 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities/',
    moex: {
      columns: [],
      data: []
    },
    model: {
      code: null
    },
    types: [
      { code:'ап', label:'ап', name: 'Превилигированная акция'},
      { code:'ао', label:'ао', name: 'Обыкновенная акция'}
    ],
    favorites: [
      { code:5, icon:'fa fa-star-o', name: 'Избранная'},
      { code:1, icon:'fa fa-thumbs-o-down', name: 'Плохая'},
      { code:0, icon:'fa', name: 'Обычная'},
    ],
  },
  trades : {
    list: []
  },
  trade : {
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
      accountCode: null
    }
  },
  comments : {
    list: []
  },
  comment : {
    editing: false,
    model: {
      securityCode: null
    }
  }
}