const mutations = {
  setUser(state, user) {
    const mutatedState = state;
    mutatedState.user = user;

    if (user) {
      mutatedState.followers = [];
    }

    return mutatedState;
  },
};

export default mutations;
