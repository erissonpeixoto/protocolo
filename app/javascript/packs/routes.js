import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import HomeIndex from './components/home/index.vue';
import ProfileIndex from './components/profile/index.vue';
import ProfileNew from './components/profile/new.vue';
import ProfileShow from './components/profile/show.vue';
import ProfileEdit from './components/profile/edit.vue';

import UserIndex from './components/user/index.vue';
import UserNew from './components/user/new.vue';
import UserShow from './components/user/show.vue';
import UserEdit from './components/user/edit.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomeIndex },
    { path: '/home', component: HomeIndex },

    { path: '/profiles', component: ProfileIndex },
    { path: '/profiles/new', component: ProfileNew },
    { path: '/profiles/:id', component: ProfileShow },
    { path: '/profiles/:id/edit', component: ProfileEdit },

    { path: '/users', component: UserIndex },
    { path: '/users/new', component: UserNew },
    { path: '/users/:id', component: UserShow },
    { path: '/users/:id/edit', component: UserEdit }
  ]
});
export default router;