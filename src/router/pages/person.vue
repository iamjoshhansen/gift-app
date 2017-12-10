<template>
  <div class="person">
    <avatar :id="person.id" />
    <h1 class="person__name">{{ person.firstName }} {{ person.lastName }}</h1>
    <router-link :to="`/add-gift/${id}`" class="button">Add Gift</router-link>

    <div v-if="giftsYouClaimed.length > 0">
      <h2 class="person__subtitle">You've Claimed</h2>
      <gift-list :gifts="giftsYouClaimed" />
    </div>

    <div v-if="giftsUnclaimed.length > 0">
      <h2 class="person__subtitle">Unclaimed</h2>
      <gift-list :gifts="giftsUnclaimed" />
    </div>

    <div v-if="giftsOthersClaimed.length > 0">
      <h2 class="person__subtitle">Claimed by Others</h2>
      <gift-list :gifts="giftsOthersClaimed" />
    </div>
  </div>
</template>

<script>
import GiftList from '@/components/gift-list';
import Avatar from '@/components/avatar';

export default {
  name: 'person',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    GiftList,
    Avatar,
  },
  data() {
    return {
    };
  },
  computed: {
    person() {
      return this.$store.getters.people.filter(person => person.id.toString() === this.id)[0];
    },

    giftsYouClaimed() {
      const userId = this.$store.state.userId;
      return this.$store.getters.gifts.filter((gift) => {
        if (gift.buyer) {
          return gift.owner.toString() === this.id && gift.buyer === userId;
        }
        return false;
      });
    },

    giftsUnclaimed() {
      return this.$store.getters.gifts.filter((gift) => {
        if (gift.owner.toString() === this.id.toString()) {
          return !gift.buyer;
        }
        return false;
      });
    },

    giftsOthersClaimed() {
      const userId = this.$store.state.userId;
      return this.$store.getters.gifts.filter((gift) => {
        if (gift.owner.toString() === this.id) {
          if (gift.buyer !== userId) {
            return !!gift.buyer;
          }
        }
        return false;
      });
    },
  },
  watch: {
    id() {
      this.$store.commit('setSelectedPerson', this.id);
    },
  },
  mounted() {
    this.$store.commit('setSelectedPerson', this.id);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person__name {
  font-family: 'Exo 2';
  font-weight: 400;
  margin: 0;
  padding: 1rem 0;
}

.person__subtitle {
  border-top: solid 2px #eee;
  color: #555;
  padding: 2rem 0 0;
  margin: 1rem 0 0;
  font-family: 'Exo 2';
  font-weight: 400;
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
  height: 90px;
  margin: 10px 0 0 0;
}
</style>
