const getters = {
  user(state) {
    if (state.userId === null) {
      return null;
    }

    return state.people.filter(user => user.id === state.userId)[0];
  },

  people(state) {
    const mutatedPeople = [];
    state.people.forEach((person) => {
      mutatedPeople.push(person);
    });
    return mutatedPeople.sort((a, b) => {
      if (a.firstName > b.firstName) {
        return 1;
      } else if (a.firstName < b.firstName) {
        return -1;
      }
      return 0;
    });
  },

  gifts(state) {
    return state.gifts.filter(gift => gift.active === true);
  },

  myGifts(state) {
    if (state.userId) {
      return state.gifts
        .filter(gift => gift.active === true)
        .filter((gift) => {
          const isOwner = gift.owner === gift.author;
          const isAuthor = gift.author === state.userId;
          return isOwner && isAuthor;
        });
    }

    return [];
  },

  loginError(state) {
    if (state.loginError) {
      return state.loginError.message;
    }
    return null;
  },

  auth(state) {
    return state.auth;
  },
};

export default getters;
