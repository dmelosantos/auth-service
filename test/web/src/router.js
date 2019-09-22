import Vue from 'vue';
import Router from 'vue-router';

import Login from './components/Login';
import Forgot from './components/Forgot';
import Register from './components/Register';
import Confirm from './components/Confirm';
import Dashboard from './components/Dashboard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: Forgot,
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});
