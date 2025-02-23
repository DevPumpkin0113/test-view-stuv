import { defineStore } from 'pinia';
import { signout } from '../service/sign.api';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isLoggedIn: !!sessionStorage.getItem('token'),
		user: null,
	}),
	actions: {
		async fetchUser() {
			try {
				const response = await getUserInfo();
				this.user = response;
				this.isLoggedIn = true;
			} catch (error) {
				console.error('사용자 정보 가져오기 실패:', error);
				this.user = null;
				this.isLoggedIn = false;
			}
		},

		async logout() {
			try {
				await signout();
				sessionStorage.removeItem('token');
				this.isLoggedIn = false;
				this.user = null;
			} catch (err) {
				console.error('API 요청 오류:', err);
			}
		},

		checkLoginStatus() {
			this.isLoggedIn = !!sessionStorage.getItem('token');
		},
	}
});
