<template>
  <nav>
    <ul class="people-list">
      <li class="people-list__item"
        @click="showNav=false">
        <nav-item
          :person="user"
          to="/"
          :selected="selectedPerson === user.id"
        />
      </li>
    </ul>

    <h2>People</h2>
    <ul class="people-list">
      <li
        v-for="person in people"
        :key="person.id"
        class="people-list__item"
        @click="showNav=false"
      >
        <nav-item
          :selected="selectedPerson === person.id.toString()"
          :person="person"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
import NavItem from '@/components/nav-item';

export default {
  name: 'the-nav',
  components: {
    NavItem,
  },
  props: {
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    people() {
      return this.$store.getters.people.filter(person => person.id !== this.$store.state.userId);
    },
    selectedPerson() {
      return this.$store.state.selectedPerson;
    },
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
