export default {
  page: localStorage.getItem('page') || 'p',
  sectors : {
    list: []
  },
  links : {
    list: []
  },
  accounts : {
    list: []
  },
  stocks : {
    list: []
  },
  stock : {
    editing: false,
    expanded: [],
    url: 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities/',
    // http://iss.moex.com/iss/engines/stock/markets/index/securities/columns.html
    micex: {
      columns: [],
      data: []
    },
    model: {
      code: null
    },
    types: [
      { code:'ап', name: 'Обыкновенная'},
      { code:'ао', name: 'Превилигированная'}
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
      stock: null,
      account: null
    }
  },
  comments : {
    list: []
  },
  comment : {
    editing: false,
    model: {
      stock: null
    }
  }
}