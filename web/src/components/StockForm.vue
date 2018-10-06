<template>
  <div class="form">
    <div class="form__field">
      <span class="form__label">
        <a :href="href('intelinvest.ru')" target="_search" title="Поиск бумаги">
          Код:
        </a>
      </span>
      <span class="form__input">
        <input type="text" v-model="fieldCode" placeholder="Тикер" size="9"/>
      </span>
    </div>
    <div class="form__field">
      <span class="form__label">
         <a :href="href('smart-lab.ru')" target="_search" title="Поиск названия">
           Название:
         </a>
      </span>
      <span class="form__input">
        <input type="text" v-model="fieldName" placeholder="Краткое название" size="18"/>
      </span>
    </div>
    <div class="form__field">
      <span class="form__label">Полное:</span>
      <span class="form__input">
        <input type="text" v-model="fieldDesc" placeholder="Краткое название" size="25"/>
      </span>
    </div>
    <div class="form__field">
      <span class="form__label">Тип акции:</span>
      <span class="form__input">
        <select v-model="fieldType" placeholder="Выберите тип акции">
          <option disabled value="">Выберите тип акции</option>
          <option v-for="type in types" :key="type.code" :value="type.code" :label="type.name"></option>
        </select>
      </span>
    </div>
    <div class="form__field">
      <span class="form__label">Избранное:</span>
      <span class="form__input">
        <input type="checkbox" v-model="fieldFavorite"/>
      </span>        
    </div>
    <div class="form__field">
      <span class="form__label">В портфеле:</span>
      <span class="form__input">
        <input type="checkbox" v-model="fieldPortfolio"/>
      </span>
    </div>
    <div class="form__field">
      <span class="form__label">Сектор:</span>
      <span class="form__input">
        <select v-model="fieldSectorCode" @change="selectSector(fieldSectorCode)">
          <option disabled value="">Выберите сектор</option>
          <option v-for="sector in sectors" :key="sector.id" :value="sector.id" :label="sector.name">
          </option>
        </select>
      </span>        
    </div>
    <div class="form__field">
      <span class="form__label">Сектор полный:</span>
      <span class="form__input">
        <textarea v-model="fieldSector" placeholder="Сектор включая дочерний" rows="2" cols="26"></textarea>
      </span>        
    </div>
    <stock-form-var class="form__field" v-for="link in refLinks" :key="link.code" :link="link">
    </stock-form-var>
    <div class="form__field">
      <span class="form__label">
        &nbsp;
      </span>
      <span class="form__input">
        <button @click="saveStock" :disabled="!fieldCode || !fieldName || !fieldSectorCode">Сохранить</button>&nbsp;
        <button @click="cancelStock">Отмена</button>
      </span>
    </div>
  </div>
</template>

<script>
import form from './form'
import StockFormVar from './StockFormVar';
import {replaceUrl} from '../utils';
export default {
  components: { StockFormVar },
  name: 'stock-form',
  mixins: [form],
  computed: {
    currentPage () {
      return this.$store.state.page;
    },
    links () {
      return this.$store.state.links.list;
    },
    refLinks () {
      return this.links.filter(link => link.var !== 'code')
    },
    sectors () {
      return this.$store.state.sectors.list;
    },
    stock () {
      return this.$store.state.stock.model;
    },
    types () {
      return this.$store.state.stock.types;
    },
    fieldCode: {
      get () {
        return this.stock.code;
      },
      set (code) {
        this.setStockField('code', code);
      }
    },
    fieldName: {
      get () {
        return this.stock.name;
      },
      set (name) {
        this.setStockField('name', name);
      }
    },
    fieldDesc: {
      get () {
        return this.stock.desc;
      },
      set (desc) {
        this.setStockField('desc', desc);
      }
    },
    fieldType: {
      get () {
        return this.stock.type;
      },
      set (type) {
        this.setStockField('type', type);
      }
    },
    fieldFavorite: {
      get () {
        return this.stock.favorite;
      },
      set (favorite) {
        this.setStockField('favorite', favorite);
      }
    },
    fieldPortfolio: {
      get () {
        return this.stock.portfolio;
      },
      set (portfolio) {
        this.setStockField('portfolio', portfolio);
      }
    },
    fieldSectorCode: {
      get () {
        return this.stock.sectorCode;
      },
      set (sectorCode) {
        this.setStockField('sectorCode', sectorCode);
      }
    },
    fieldSector: {
      get () {
        return this.stock.sector;
      },
      set (sector) {
        this.setStockField('sector', sector);
      }
    }
  },
  methods: {
    selectSector(id) {
      console.log(id);
      const sector = this.sectors.find(sector => sector.id === id);
      this.fieldSector = sector ? sector.name : null
    },
    href (code) {
      return this.links.filter(link => link.code === code)
        .map(link => replaceUrl(link.search, 'name', this.fieldName))[0];
    },
    calculatePage (page, stock) {
      return page === 'f' && stock.favorite ? 'f'
        : page === 'p' && stock.portfolio ? 'p'
          : stock.sectorCode;
    },
    saveStock() {
      this.$store.dispatch('saveStock', this.stock).then((stockId) =>{
        this.$store.dispatch('fetchStockInfo', stockId).then(() => {
          const page = this.calculatePage(this.currentPage, this.stock);
          this.$store.commit('setPage', page);
          this.$store.dispatch('fetchStocks', page);
        });
      });
    },
    cancelStock() {
      this.$store.commit('editingStock', false);
      if (this.stock.id) {
        this.$store.dispatch('fetchStock', this.stock.id);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .form {
    padding: 10px;
    box-sizing: border-box;
    background-color: white;
    &__field {
      padding-bottom: 10px;
    }
    &__label {
      font-weight: 600;
      float: left;
      width: 100px;
      line-height: 25px;
    }
    &__input {

    }
  }
</style>
