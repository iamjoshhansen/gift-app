<template>
  <ul class="gift-list">
    <li
      class="gift-list__item"
      v-for="gift in gifts"
      :key="gift.id"
    >
      <gift-item-mine
        v-if="isMyGift(gift)"
        :gift="gift"
      />
      <gift-item
        v-else="isMyGift(gift)"
        :gift="gift"
      />
    </li>
  </ul>
</template>

<script>
import GiftItem from '@/components/gift-item';
import GiftItemMine from '@/components/gift-item-mine';

export default {
  name: 'gift-list',
  props: {
    gifts: {
      type: Array,
      required: true,
    },
  },
  components: {
    GiftItem,
    GiftItemMine,
  },
  methods: {
    isMyGift(gift) {
      return gift.owner === this.user.id;
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.gift-list {
  list-style-type: none;
  padding: 0;
  margin: 0 -10px 20px;
}
</style>
