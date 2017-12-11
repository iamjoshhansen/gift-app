<template>
  <div class="crud-gift">
    <h1
      v-if="mode === 'create'"
      class="crud-gift__title"
    >
      Add Gift
    </h1>
    <h1
      v-if="mode === 'update'"
      class="crud-gift__title"
    >
      Update Gift
    </h1>

    <div
      class="crud-gift__error"
      v-if="error"
    >
      {{ error }}
    </div>

    <form class="form" @submit="submit($event)">
      <div class="form__row">
        <label class="form__label">
          Reciever:
        </label>
        <div class="crud-gift__owner">
          <avatar
            :id="parseInt(owner)"
          />
          {{ user(owner) }}
        </div>
      </div>
      <div class="form__row">
        <label class="form__label" for="input-title">
          Title:
        </label>
        <input
          id="input-title"
          type="text"
          class="form__input"
          ref="title"
          v-model="title"
        />
      </div>

      <div class="form__row">
        <label class="form__label" for="input-price">
          Price:
        </label>
        <input
          id="input-price"
          type="number"
          min="0"
          step="0.01"
          class="form__input"
          v-model="price"
        />
      </div>

      <div class="form__row">
        <label class="form__label" for="input-notes">
          Notes:
        </label>
        <input
          id="input-notes"
          type="text"
          class="form__input"
          v-model="notes"
        />
      </div>

      <div class="form__row">
        <label class="form__label" for="input-url">
          url:
        </label>
        <input
          id="input-url"
          type="url"
          class="form__input"
          v-model="url"
        />
      </div>

      <div class="columns columns--two">
        <div
          class="form__row form__row--checkbox"
          v-if="parseInt(owner, 10) !== userId"
        >
          <label class="form__label" for="input-claim">
            Claim
          </label>
          <input
            id="input-claim"
            type="checkbox"
            class="form__input"
            v-model="claimed"
          />
        </div>

        <div
          class="form__row form__row--checkbox"
          v-if="parseInt(owner, 10) !== userId && claimed"
        >
          <label class="form__label" for="input-bought">
            Purchased
          </label>
          <input
            id="input-bought"
            type="checkbox"
            class="form__input"
            v-model="bought"
          />
        </div>
      </div>

      <div>
        bought: {{ bought }}
      </div>

      <div class="form__row form__row--action">
        <button class="form__action" mode="add">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
import Avatar from '@/components/avatar';

export default {
  name: 'crud-gift',
  components: {
    Avatar,
  },
  props: {
    owner: {
      type: String,
    },
    id: {
      type: Number,
    },
  },
  data() {
    return {
      title: '',
      price: 0,
      notes: '',
      url: '',
      claimed: false,
      bought: false,
    };
  },
  computed: {
    mode() {
      return this.id ? 'update' : 'create';
    },
    error() {
      return this.$store.crudGiftError;
    },
    userId() {
      return this.$store.state.userId;
    },
  },
  watch: {
    claimed() {
      if (!this.claimed) {
        this.bought = false;
      }
    },
  },
  methods: {
    user(userId) {
      const person = this.$store.getters.people.filter(user => user.id.toString() === userId)[0];
      return `${person.firstName} ${person.lastName}`;
    },

    submit(ev) {
      ev.preventDefault();
      this.$store.dispatch('addGift', {
        title: this.title,
        price: this.price,
        notes: this.notes,
        url: this.url,
        owner: this.owner,
        author: this.$store.state.userId,
        buyer: this.claimed ? this.userId : null,
        bought: this.bought,
      });

      this.$router.push({ path: `/person/${this.owner}` });
    },
  },
  mounted() {
    if (this.id) {
      const gift = this.$store.getters.gifts.filter(g => g.id === this.id)[0];
      this.title = gift.title;
      this.price = gift.price;
      this.notes = gift.notes;
      this.url = gift.url;
    } else {
      this.$refs.title.focus();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.crud-gift {
  //

  &__title {
    font-weight: 400;
    font-family: 'Exo 2';
    font-size: 2em;
  }

  &__owner {
    font-weight: 400;
    font-family: 'Exo 2';
    font-size: 1.5em;
    display: flex;
  }

  &__error {
    background: #ff9;
    color: #900;
    padding: 10px;
    text-align: center;
  }
}

.form {
  //

  &__row {
    display: flex;
    margin: 0 0 2rem;
    flex-direction: column;

    &--checkbox {
      flex-direction: row-reverse;
      align-items: center;
      justify-content: flex-end;

      input[type=checkbox] {
        width: auto;
        padding: 0;
        margin: 0 10px 0 0;
      }
    }

    @media (min-width: 737px) {
      flex-direction: row;
      align-items: center;
      justify-content: stretch;
    }

    &--action {
      @media (min-width: 737px) {
        margin-left: 110px;
      }
    }
  }

  &__label {
    color: #333;
    padding: 5px 0;

    @media (min-width: 737px) {
      text-align: right;
      flex: 0 0 100px;
      margin-right: 10px;
    }
  }

  &__input {
    width: 100%;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
    border: solid 1px #777;
    border-radius: 0;
    font-size: 1.5rem;

    &:focus {
      outline-color: #09f;
    }

    &[type=number] {
      width: 100px;
    }
  }

  &__action {
    background: #09f;
    color: #eee;
    padding: .5rem 2rem;
    border: none;
    border-radius: 3px;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .avatar {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
}

.columns {
  display: flex;

  &--two {
    & > * {
      flex: 50% 0 0;
    }
  }
}
</style>
