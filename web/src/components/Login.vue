<template>
  <div class="login">
    <div class="login__row">
      <div class="login__column"></div>
      <div class="login__logo">
        <img src="logo.png" height="100px" width="100px"/>
      </div>
      <div class="login__column"></div>
    </div>

    <div class="login__row">
      <div class="login__column"></div>
      <div class="login__form">
        Добро пожаловать
        <div class="login__field">
          <div class="login__label">
            Логин:
          </div>
          <div class="login__input">
            <input type="email" v-model="params.email" />
          </div>
        </div>
        <div class="login__field">
          <div class="login__label">
            Пароль:
          </div>
          <div class="login__input">
            <input type="password" v-model="params.password" />
          </div>
        </div>
        <div class="login__field">
          <div class="login__label">
            &nbsp;
          </div>
          <div class="login__button">
            <button type="submit" @click="signIn">Войти</button>
          </div>
        </div>
      </div>
      <div class="login__column"></div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        params: {
          email: null,
          password: null,
        }
      }
    },
    methods:  {
      signIn (){
        this.$store.dispatch('signIn', this.params).then(user => {
          if (user && user.id) {
            this.$store.dispatch('authenticated');
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    background: lightsteelblue;
    padding: 5px;
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;
    flex-direction: column;
    text-align: center;
    &__row {
      flex: 0 0 120px;
      height: 100px;
      display: flex;
      display: -webkit-flex;
      flex-wrap: nowrap;
      flex-direction: row;
    }
    &__column {
      flex: 1 0 auto;
    }
    &__logo {
      flex: 0 0 300px;
      text-align: center;
      height: 100px;
    }
    &__form {
      flex: 0 0 300px;
      border: 1px solid whitesmoke;
      border-radius: 4px;
      background-color: whitesmoke;
      width: 200px;
      font-weight: bold;
      font-size: 12px;
      color: darkslategrey;
    }
    &__field {
      line-height: 20px;
      text-align: left;
      margin: 10px 10px;
    }
    &__label {
      line-height: 20px;
      float: left;
      width: 60px;
    }
    &__input {
    }
  }
</style>