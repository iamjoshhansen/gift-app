<template>
  <div class="my-gifts">
    <div class="header">
      <avatar :id="userId" />
      <h1 class="title">My List</h1>

      <router-link
        :to="`/add-gift/${userId}`"
        class="button"
      >
        Add Gift
      </router-link>
    </div>

    <gift-list :gifts="myGifts" />
  </div>
</template>

<script>
import GiftList from '@/components/gift-list';
import Avatar from '@/components/avatar';

export default {
  name: 'my-gifts',
  data() {
    return {
    };
  },
  components: {
    GiftList,
    Avatar,
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    },
    myGifts() {
      return this.$store.getters.myGifts.sort((a, b) => a.created > b.created);
    },
  },
  mounted() {
    this.$store.commit('setSelectedPerson', this.userId);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.title {
  font-weight: 400;
  font-family: 'Exo 2';
}

.header {
  margin: 0 0 20px;
}

.button {
  background: #0099a5;
  color: #eee;
  border-radius: 3px;
  padding: 3px 15px;
  text-decoration: none;
}

.avatar {
  float: right;
  width: 90px;
  margin: 10px 0 0 0;
}
</style>
