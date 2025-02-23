import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{ path: '/login', component: () => import('../views/AppLogin.vue') },
	{ path: '/', component: () => import('../views/AppMain.vue') }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;