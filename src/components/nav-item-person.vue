<template>
  <router-link
    :to="to"
    class="nav-item-person"
    :class="`${selected ? 'nav-item-person--selected' : ''}`"
  >
    <avatar
      :id="person.id"
      class="nav-item-person__avatar"
    />

    <div class="nav-item-person__name">
      {{ person.firstName }} {{ person.lastName }}
    </div>
    <div
      class="nav-item-person__counter"
      :title="`You've claimed ${claimedGiftCount} gift${claimedGiftCount===1?'':'s'} for ${person.firstName}`"
      :class="`${claimedGiftCount === 0 ? 'nav-item-person__counter--invisible' : ''}`"
    >
      {{ claimedGiftCount }}
    </div>
    <!-- div
      class="nav-item-person__counter"
      :class="`${claimedGiftCount === 0 ? 'nav-item-person__counter--invisible' : ''}`"
    >
      ${{ claimedGiftSpending }}
    </div -->
  </router-link>
</template>

<script>
import Avatar from '@/components/avatar';

export default {
  name: 'nav-item-person',
  components: {
    Avatar,
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default() {
        return `/person/${this.person.id}`;
      },
    },
  },
  computed: {
    claimedGiftCount() {
      const userId = this.$store.state.userId;
      return this.$store.getters.gifts.filter((gift) => {
        if (gift.buyer) {
          return gift.owner === this.person.id && gift.buyer === userId;
        }
        return false;
      }).length;
    },
    // claimedGiftSpending() {
    //   const userId = this.$store.state.userId;
    //   const gifts = this.$store.getters.gifts.filter((gift) => {
    //     if (gift.buyer) {
    //       return gift.owner === this.person.id && gift.buyer === userId;
    //     }
    //     return false;
    //   });

    //   let spending = 0;
    //   gifts.forEach((gift) => {
    //     spending += gift.price;
    //   });
    //   return Math.round(spending);
    // },
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.nav-item-person {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  text-decoration: none;
  color: inherit;
  font-size: 24px;
  border-right: solid 3px transparent;

  &:hover {
    background: #eee;
  }

  @media (min-width: 737px) {
    font-size: 16px;
  }

  &--selected,
  &--selected:hover {
    cursor: default;
    background: #d6e5f5;
    border-right-color: #6c99cc;
  }

  &__avatar {
    margin-right: 10px;
    width: 42px;
    height: 42px;

    @media (min-width: 737px) {
      width: 32px;
      height: 32px;
    }
  }

  &__name {
    flex-grow: 3;
  }

  &__counter {
    display: inline-block;
    background: rgba(0,0,0,0.1);
    color: #333;
    padding: 3px;
    margin-left: 10px;
    font-size: 16px;
    border-radius: 10px;
    box-shadow: inset 0 1px 1px -1px rgba(0,0,0,0.5);
    min-width: 1em;
    text-align: center;
    font-family: Monaco, monospace;
    transition: all 0.2s ease-in-out;

    @media (min-width: 737px) {
      font-size: 10px;
    }

    &--invisible {
      opacity: 0;
      transform: translateX(10px);
    }
  }
}
</style>
