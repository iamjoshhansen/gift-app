<template>
  <div
    class="gift-item"
    :class="`${claimedByOther ? 'gift-item--claimed-by-other' : ''}`"
  >
    <div class="top-row">
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        fill="#090"
        v-if="claimedByYou"
      >
        <circle cx="8" cy="8" r="7" />
      </svg>

      <svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        stroke="#999"
        fill="none"
        v-if="unclaimed"
      >
        <circle cx="8" cy="8" r="7" />
      </svg>

      <svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        fill="#696"
        v-if="claimedByOther"
      >
        <circle cx="8" cy="8" r="7" />
      </svg>

      <div class="gift-item__title">
        <a v-if="!!gift.url" :href="gift.url" target="_blank">{{ gift.title }}</a>
        <span v-else="!!gift.url">{{ gift.title }}</span>
      </div>
      <div class="gift-item__price">
        {{ gift.price | price }}
      </div>
    </div>
    <div class="gift-item__notes">
      {{ gift.notes }}
    </div>

    <div class="gift-item__author" v-if="gift.buyer && gift.author === gift.buyer">
      Added and claimed by {{ user(gift.author) }}
    </div>

    <div v-else="gift.author === gift.buyer">
      <div class="gift-item__author">
        Added by: {{ user(gift.author) }}
      </div>
      <div v-if="gift.buyer" class="gift-item__author">
        Claimed by: {{ user(gift.buyer) }}
      </div>
    </div>

    <div v-if="gift.bought">Purchased</div>
  </div>
</template>

<script>
export default {
  name: 'gift-item',
  props: {
    gift: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isOwnedByUser() {
      return this.$store.state.userId === this.gift.owner;
    },
    isAuthoredByUser() {
      return this.$store.state.userId === this.gift.author;
    },
    claimedByYou() {
      return this.gift.buyer === this.$store.state.userId;
    },
    claimedByOther() {
      return !!this.gift.buyer && this.gift.buyer !== this.$store.state.userId;
    },
    claimed() {
      return !!this.gift.buyer;
    },
    unclaimed() {
      return !this.gift.buyer;
    },
    purchased() {
      return !!this.gift.bought;
    },
  },
  methods: {
    user(userId) {
      const person = this.$store.getters.people.filter(user => user.id === userId)[0];
      return `${person.firstName} ${person.lastName}`;
    },
  },
  filters: {
    price(price) {
      const dollars = Math.floor(price);
      const cents = Math.floor(100 * (price - dollars));
      return `$${dollars}.${(cents < 10) ? '0' : ''}${cents}`;
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
.gift-item {
  padding: 10px;

  &__title {
    font-size: 1.25rem;
    flex: 3;
    margin: 0 10px;
  }

  &__author,
  &__notes {
    margin-left: 26px;
    font-size: 0.75rem;
  }

  &__author {
    color: #555;
    font-style: italic;
  }

  &__price {
    color: #555;
  }

  &--claimed-by-other {
    opacity: 0.5;
  }
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

a {
  text-decoration: none;
}
</style>
