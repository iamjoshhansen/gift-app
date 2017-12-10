<template>
  <img
    v-if="src"
    class="avatar"
    :src="src"
  />

  <icon-avatar
    v-else="src"
    class="avatar avatar--flat"
  />
</template>

<script>
import iconAvatar from '@/icons/avatar';

export default {
  name: 'avatar',
  components: {
    iconAvatar,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    src() {
      const thisUser = this.$store.getters.people.filter(user => user.id === this.id)[0];
      if (thisUser) {
        const filename = thisUser.avatar;
        if (filename) {
          return `http://iamjoshhansen.com/data/avatars/${filename}`;
        }
        return false;
      }
      return null;
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
.avatar {
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0,0,0,0.25);

  &--flat {
    box-shadow: none;
    border-radius: 0;
  }
}
</style>
