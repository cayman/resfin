<template>
  <div class="form">
    <div class="form__field">
      <span class="form__label">
        <a :href="href('intelinvest.ru', false)" target="_search" title="Поиск бумаги">
          Код:
        </a>
      </span>
      <span class="form__input">
        <input type="text" v-model="fieldCode" placeholder="Тикер" size="9" style="width: 70px"/>
      </span>
    </div>
    <div class="form__field">
      <span class="form__label">
         <a :href="href('smart-lab.ru')" target="_search" title="Поиск названия">
           Название:
         </a>
      </span>
      <span class="form__input">
        <input type="text" v-model="fieldName" placeholder="Краткое название" style="width: 130px"/>
      </span>
    </div>
    <div class="form__field">
      <span class="form__label">Полное:</span>
      <span class="form__input">
        <input type="text" v-model="fieldDesc" placeholder="Полное название" style="width: 250px"/>
      </span>
    </div>
    <div class="form__field">
      <span class="form__label">Тип акции:</span>
      <span class="form__input">
        <select v-model="fieldTypeCode" placeholder="Выберите тип акции" style="width: 250px">
          <option disabled value="">Выберите тип акции</option>
          <option v-for="type in types" :key="type.code" :value="type.code" :label="type.name"></option>
        </select>
      </span>
    </div>
    <div class="form__field">
      <span class="form__label">Избранное:</span>
      <span class="form__input">
        <select v-model="fieldFavorite" placeholder="Оценка бумаги">
          <option disabled value="">Выберите оценку</option>
          <option v-for="favorite in favorites" :key="favorite.code" :value="favorite.code" :label="favorite.name"></option>
        </select>
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
        <select v-model="fieldSectorCode" @change="selectSector(fieldSectorCode)" style="width: 250px">
          <option disabled value="">Выберите сектор</option>
          <option v-for="sector in sectors" :key="sector.id" :value="sector.id" :label="sector.name">
          </option>
        </select>
      </span>        
    </div>
    <div class="form__field">
      <span class="form__label">Сектор путь:</span>
      <span class="form__input">
        <textarea v-model="fieldSectorName" placeholder="Сектор включая дочерний" rows="2" style="width: 250px"></textarea>
      </span>        
    </div>
    <security-form-var class="form__field" v-for="link in refLinks" :key="link.code" :link="link">
    </security-form-var>
    <div class="form__field">
      <span class="form__label">
        &nbsp;
      </span>
      <span class="form__input">
        <button @click="saveSecurity" :disabled="!fieldCode || !fieldName || !fieldSectorCode">Сохранить</button>&nbsp;
        <button @click="cancelSecurity">Отмена</button>
      </span>
    </div>
  </div>
</template>

<script>
import form from './form'
import SecurityFormVar from './SecurityFormVar';
import {replaceUrl} from '../utils';
export default {
  components: { SecurityFormVar },
  name: 'security-form',
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
    security () {
      return this.$store.state.security.model;
    },
    types () {
      return this.$store.state.security.types;
    },
    favorites () {
      return this.$store.state.security.favorites;
    },
    fieldCode: {
      get () {
        return this.security.code;
      },
      set (code) {
        this.setField('code', code);
      }
    },
    fieldName: {
      get () {
        return this.security.name;
      },
      set (name) {
        this.setField('name', name);
      }
    },
    fieldDesc: {
      get () {
        return this.security.desc;
      },
      set (desc) {
        this.setField('desc', desc);
      }
    },
    fieldTypeCode: {
      get () {
        return this.security.typeCode;
      },
      set (typeCode) {
        this.setField('typeCode', typeCode);
      }
    },
    fieldFavorite: {
      get () {
        return this.security.favorite;
      },
      set (favorite) {
        this.setField('favorite', favorite);
      }
    },
    fieldPortfolio: {
      get () {
        return this.security.portfolio;
      },
      set (portfolio) {
        this.setField('portfolio', portfolio, Boolean);
      }
    },
    fieldSectorCode: {
      get () {
        return this.security.sectorCode;
      },
      set (sectorCode) {
        this.setField('sectorCode', sectorCode);
      }
    },
    fieldSectorName: {
      get () {
        return this.security.sectorName;
      },
      set (sectorName) {
        this.setField('sectorName', sectorName);
      }
    }
  },
  methods: {
    selectSector(id) {
      console.log(id);
      const sector = this.sectors.find(sector => sector.id === id);
      this.fieldSectorName = sector ? sector.name : null
    },
    href (code, replace = true) {
      return this.links.filter(link => link.code === code)
        .map(link => replace || this.fieldName ? replaceUrl(link.search, 'name', this.fieldName) : link.search)[0];
    },
    calculatePage (page, security) {
      return page === 'f' && security.favorite ? 'f'
        : page === 'p' && security.portfolio ? 'p'
          : security.sectorCode;
    },
    setField(name, value, type) {
      this.$store.commit('setSecurityField', {name, value, type});
    },
    saveSecurity() {
      this.$store.dispatch('saveSecurity', this.security).then((securityId) =>{
        this.$store.dispatch('fetchSecurityInfo', securityId).then(() => {
          const page = this.calculatePage(this.currentPage, this.security);
          this.$store.commit('setPage', page);
          this.$store.dispatch('fetchSecurities', page);
          // комментарии не запрашиваем, так как поменялся только объект
          // или создался новый без комментариев
        });
      });
    },
    cancelSecurity() {
      this.$store.commit('editingSecurity', false);
      if (this.security.id) {
        this.$store.dispatch('fetchSecurity', this.security.id);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../assets/var.scss";
  .form {
    padding: $px10;
    height: 100%;
    background-color: $bg-color-form;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-regular;
    color: $text-color-base;
    &__field {
      padding-bottom: $px10;
    }
    &__label {
      float: left;
      width: 100px;
      font-weight: $font-weight-bold;
      font-family: $font-family-condensed;
      color: $text-color-label;
      line-height: $px25;
    }
    &__input {
    }
    textarea {
      height: 45px;
    }
  }
</style>
