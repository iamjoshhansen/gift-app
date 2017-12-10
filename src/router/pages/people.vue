<template>
  <div class="add-gift">
    <h1>People</h1>

    <ul class="people-list">
      <li
        v-for="person in people"
        :key="person.id"
        class="people-list__item"
      >
        <router-link :to="`/person/${person.id}`">
          {{ person.firstName }} {{ person.lastName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'people',
  data() {
    return {
    };
  },
  computed: {
    people() {
      return this.$store.getters.people.filter(person => person.id !== this.$store.state.userId);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.people-list {
  margin: 0 -10px;
  padding: 0;
  list-style: none;
}

.people-list__item {
  padding: 0;
  margin: 0;
}

.people-list__item a {
  display: block;
  padding: 5px 10px;
  text-decoration: none;
  color: #333;
}

.people-list__item a:hover {
  background: #eee;
}
</style>
