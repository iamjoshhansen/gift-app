<template>
  <div class="login">
    <h1 class="login__title">Login</h1>

    <div
      v-if="loginError"
      class="login__error-msg"
    >
      {{ loginError }}
    </div>

    <form @submit="submit($event)">
      <div class="login__form-row">
        <label
          class="login__label"
          for="login-email"
        >
          email:
        </label>
        <input
          type="email"
          id="login-email"
          class="login__text-input"
          v-model="email"
        />
      </div>

      <div class="login__form-row">
        <label
          class="login__label"
          for="login-pass"
        >
          pass:
        </label>
        <input
          type="password"
          id="login-pass"
          class="login__text-input"
          v-model="pass"
        />
      </div>

      <div class="login__form-row">
        <button
          class="login__button"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      pass: '',
    };
  },
  computed: {
    loginError() {
      return this.$store.getters.loginError;
    },
  },
  methods: {
    submit(ev) {
      ev.preventDefault();

      this.$emit('signin');

      this.$store.dispatch('login', {
        email: this.email,
        pass: this.pass,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 320px;
  margin: 0 auto;

  &__title {
    font-weight: 400;
    text-align: center;
    margin: 0 0 2rem;
  }

  &__error-msg {
    padding: 1rem;
    border: solid 1px #300;
    background: #ff9;
    color: #300;
    margin: 0 0 1rem;
    text-align: center;
  }

  &__form-row {
    margin: 0 0 1rem;
  }

  &__label {
    color: #777;
  }

  &__text-input {
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
    border: solid 1px #777;
    border-radius: 0;
    font-size: 1.5rem;

    &:focus {
      outline-color: #09f;
    }
  }

  &__button {
    width: 100%;
    background: #09f;
    color: #eee;
    padding: .5rem;
    border: none;
    border-radius: 3px;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
</style>
