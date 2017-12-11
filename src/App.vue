<template>
  <div id="app">
    <the-header
      @clickMenu="toggleMenu($event)"
      :showMenu="isMobile && user !== null"
      :showLogout="user !== null"
    />
    <main>
      <login
        v-if="!isSigningIn && user === null"
        @signin="isSigningIn = true;"
      />

      <div v-if="isSigningIn" class="loading">
        <div>Signing in...</div>
      </div>

      <div v-if="!isSigningIn && user !== null" class="app-content">
        <the-nav v-if="!isMobile || showNav" />
        <router-view v-if="!isMobile || (isMobile && !showNav)" class="router-view"></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import Login from '@/components/login';
import theHeader from '@/components/the-header';
import theNav from '@/components/the-nav';

export default {
  name: 'app',
  components: {
    theHeader,
    theNav,
    Login,
  },
  data() {
    return {
      isMobile: window.innerWidth < 737,
      showNav: false,
      isSigningIn: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    toggleMenu() {
      this.showNav = !this.showNav;
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.isSigningIn = false;
      }
    },
  },
  mounted() {
    document.getElementById('gift-splash').remove();

    const localAuth = localStorage.getItem('gift-auth');
    if (localAuth) {
      this.isSigningIn = true;
      this.$store.commit('setAuth', localAuth);
      this.$store.dispatch('getDataFromAuth', localAuth);
    }
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #101010;
  min-height: 100vh;
  background: url(~@/assets/bg-cabin.jpg) no-repeat 50% 50%;
  background-attachment: fixed;
  background-size: cover;
}

@media (min-width: 737px) {
  #app {
    background-image: url(~@/assets/bg-outside-ornament.jpg);
  }
}

main {
  margin: 0 auto;
  padding: 0 10px;
  max-width: 1000px;
  min-height: calc(100vh - 40px);
  display: flex;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.app-content {
  display: flex;
  min-height: 100%;
  width: 100%;
}

.router-view {
  width: 100%;
}

nav {
  background: #f9f9f9;
  color: #333;
  flex-shrink: 0;
  width: 100%;
  padding: 10px;
  margin: 0 -10px;

  @media (min-width: 737px) {
    width: auto;
    margin: 0 20px 0 -10px;
  }
}

.people-list {
  margin: 0 -10px;
  padding: 0;
  list-style: none;
  border-bottom: solid 1px #eee;
}

.people-list__item {
  padding: 0;
  margin: 0;
  border-top: solid 1px #eee;
}

.loading {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 32px;
  flex-direction: column;
  margin: auto;
  color: #999;
}
</style>
