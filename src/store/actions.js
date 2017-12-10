function formEncode(obj) {
  const str = [];
  Object.keys(obj).forEach((p) => {
    str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
  });
  return str.join('&');
}

const actions = {
  login(context, cred) {
    fetch('http://iamjoshhansen.com/gifts/db/get-auth.php', {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: formEncode(cred),
    })
      .then(response => response.json())
      .then((response) => {
        if (response.success) {
          context.commit('setAuth', response.auth);
          context.dispatch('getDataFromAuth', response.auth);
        } else {
          throw new Error('bad credentials');
        }
      })
      .catch((er) => {
        context.commit('setLoginError', er);
      });
  },

  getDataFromAuth(context, auth) {
    fetch(`http://iamjoshhansen.com/gifts/db/pull-all-for-auth.php?auth=${auth}`)
      .then(response => response.json())
      .then((response) => {
        context.commit('reset');

        // Add people
        Object.keys(response.users).forEach((id) => {
          const person = response.users[id];
          context.commit('addPerson', {
            id: parseInt(id, 10),
            firstName: person.name_first,
            lastName: person.name_last,
            avatar: person.avatar,
          });
        });

        // Add gifts
        response.gifts.forEach((gift) => {
          context.commit('addGift', gift);
        });

        // declare userId
        context.commit('setUserId', response['user-id']);
      })
      .catch((er) => {
        context.commit('setLoginError', er);
      });
  },

  addGift(context, gift) {
    /*
    title: Test
    notes: Test note
    price: 8
    url: https://en.wikipedia.org/wiki/Bit
    owner: 4
    author: 4
    */

    fetch('http://iamjoshhansen.com/gifts/db/add-gift.php', {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: formEncode(gift),
    })
      .then(response => response.json())
      .then((response) => {
        if (response.success) {
          context.commit('addGift', {
            active: true,
            author: gift.author,
            bought: gift.bought || false,
            buyer: gift.buyer || null,
            created: new Date().getTime(),
            id: response.id,
            notes: gift.notes,
            owner: gift.owner,
            price: gift.price,
            title: gift.title,
            url: gift.url,
          });
        } else {
          throw new Error(response);
        }
      })
      .catch((er) => {
        context.commit('setAddGiftError', er);
      });
  },
};

export default actions;
