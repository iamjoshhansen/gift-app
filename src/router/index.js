import Vue from 'vue';
import Router from 'vue-router';
import MyGifts from './pages/my-gifts';
import CrudGift from './pages/crud-gift';
import People from './pages/people';
import Person from './pages/person';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'my-gifts',
      component: MyGifts,
    },
    {
      path: '/people',
      name: 'people',
      component: People,
    },
    {
      path: '/add-gift/:owner',
      name: 'add-gift',
      component: CrudGift,
      props: true,
    },
    {
      path: '/edit-gift/:id',
      name: 'edit-gift',
      component: CrudGift,
      props: true,
    },
    {
      path: '/person/:id',
      name: 'person',
      component: Person,
      props: true,
    },
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});
