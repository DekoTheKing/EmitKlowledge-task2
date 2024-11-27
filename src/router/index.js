import { createRouter, createWebHistory } from 'vue-router';
import PostList from '../components/PostList.vue';
import PostDetails from '../components/PostDetails.vue';

const routes = [
  { path: '/', name: 'Home', component: PostList },
  { path: '/post/:id', name: 'PostDetails', component: PostDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
