<template>
  <thead>
    <tr class="header">
      <td class="header__name" colspan="2">
        {{ name }}
      </td>
      <td class="header__count">
        Кол.
      </td>
      <td class="header__price">
        Цена
      </td>
      <td class="header__percent">
        &#37;
      </td>
      <td class="header__balance" v-if="$root.gt600">
        Налог
      </td>
      <td class="header__sum" v-if="$root.gt370">
        Сумма
      </td>
      <td class="header__commission" v-if="$root.gt430">
        Ком.
      </td>
      <td class="header__result">
        Итого
      </td>
      <td class="header__balance" v-if="$root.gt600">
        Баланс
      </td>
    </tr>
  </thead>
</template>

<script>
  export default {
    name: 'security-trades-head',
    props: {
      name: {
        type: String,
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/var.scss";
  .header {
    background-color: $bg-color-row-header;
    color: $text-color-label;
    // border-top: $px1 solid $line-color-dark;

    td {
      padding: 3px 0 3px $px5;
      &:first-child {
        padding-left: $px10;
      }
      &:last-child {
        padding-right: $px10;
      }
    }

    td {
      font-family: $font-family-condensed;
      font-weight: $font-weight-bold;
      font-size: $font-size-smaller;
    }

    &__name {
       width: auto;
    }
    &__count {
       text-align: right;
       width: auto;
    }
    &__price {
       text-align: right;
       width: auto;
    }
    &__percent {
       text-align: right;
       width: 60px;
    }
    &__sum {
       text-align: right;
       width: auto;
    }
    &__commission {
       text-align: right;
       width: auto;
    }
    &__result {
       text-align: right;
       width: auto;
    }
    &__balance {
       text-align: right;
       width: 80px;
    }
  }
</style>