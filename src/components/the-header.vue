<template>
  <header class="header">
    <div class="header__content">
      <button
        class="header__menu"
        v-if="showMenu"
        @click="$emit('clickMenu', $event)"
      >
        <icon-menu title="People" />
      </button>

      <h1 class="header__title">The Gift App</h1>

      <button
        class="header__button"
        v-if="showLogout"
        @click="logout($event)"
      >
        <icon-logout />
      </button>
    </div>
  </header>
</template>

<script>
import iconMenu from '@/icons/menu';
import iconLogout from '@/icons/logout';

export default {
  name: 'the-header',
  components: {
    iconMenu,
    iconLogout,
  },
  props: {
    showMenu: {
      type: Boolean,
      required: true,
    },
    showLogout: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    logout(ev) {
      ev.preventDefault();
      this.$store.commit('setAuth', null);
      this.$store.commit('reset');
      this.$router.push('/');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  margin: 0;
  padding: 0 10px;
  background-color: $dark;
  color: #eee;

  &__content {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 32px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    margin: 0;
    padding: 5px 0;
    font-variant: small-caps;
    text-align: center;
    width: 100%;
    font-family: 'Exo 2';
  }

  &__menu,
  &__button {
    background: none;
    border: none;
    width: 32px;
    height: 32px;
    padding: 0;
    margin: 0;
  }

  .icon--menu,
  .icon--logout {
    stroke: #eee;
    fill: #eee;
    width: 24px;
  }
}
</style>
