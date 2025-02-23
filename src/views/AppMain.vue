<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { useAuthStore } from '../store/auth';

const modal = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const handleSignout = async() => {
	await authStore.logout();
	router.push('/');
};

watch(route, () => {
	modal.value = false;
});
</script>

<template>
	<header class="bg-white border-b-2">
		<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
			<div class="hidden lg:flex lg:flex-1 lg:justify-end">
				<router-link v-if="!authStore.isLoggedIn" to="/login"
					class="text-xl/6 font-semibold p-4 rounded-lg hover:bg-slate-200 transition-colors hover:text-[#3FB8AF] text-gray-900">
					Sign in <span aria-hidden="true">&rarr;</span>
				</router-link>
				<button v-else @click="handleSignout"
					class="text-xl/6 font-semibold p-4 rounded-lg hover:bg-slate-200 transition-colors hover:text-[#3FB8AF] text-gray-900">
					Sign out <span aria-hidden="true">&rarr;</span>
				</button>
			</div>
		</nav>
	</header>
</template>

<style scoped></style>
