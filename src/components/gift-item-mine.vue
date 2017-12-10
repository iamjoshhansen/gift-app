<template>
  <div class="gift-item">
    <div class="top-row">
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
  </div>
</template>

<script>
export default {
  name: 'gift-item-mine',
  props: {
    gift: {
      type: Object,
      required: true,
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
    font-size: 1.5rem;
  }

  &__price {
    color: #555;
  }
}

.top-row {
  display: flex;
  justify-content: space-between;
}

a {
  text-decoration: none;
}
</style>
