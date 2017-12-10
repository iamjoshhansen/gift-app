const mutations = {
  setAuth(state, auth) {
    const mutatedState = state;
    mutatedState.auth = auth;
    mutatedState.loginError = null;
    const key = 'gift-auth';
    if (auth) {
      localStorage.setItem(key, auth);
    } else {
      localStorage.removeItem(key);
    }
    return mutatedState;
  },

  setLoginError(state, er) {
    const mutatedState = state;
    mutatedState.auth = null;
    mutatedState.loginError = er;
    return mutatedState;
  },

  setAddGiftError(state, er) {
    const mutatedState = state;
    mutatedState.addGiftError = er;
    return mutatedState;
  },

  reset(state) {
    const mutatedState = state;
    mutatedState.userId = null;
    mutatedState.gifts = [];
    mutatedState.people = [];
    return mutatedState;
  },

  setUserId(state, userId) {
    const mutatedState = state;
    mutatedState.userId = userId;
    return mutatedState;
  },

  addGift(state, gift) {
    const mutatedState = state;
    mutatedState.gifts.push(gift);
    return mutatedState;
  },

  addPerson(state, person) {
    const mutatedState = state;
    mutatedState.people.push(person);
    return mutatedState;
  },

  setSelectedPerson(state, id) {
    const mutatedState = state;
    mutatedState.selectedPerson = id;
    return mutatedState;
  },
};

export default mutations;
