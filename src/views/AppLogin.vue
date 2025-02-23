<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signinEmail } from '../service/sign.api';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const auth = useAuthStore();

const email = ref('');
const password = ref('');

const fetchSignin = async () => {
	try {
		const response = await signinEmail({ email: email.value, password: password.value });
		sessionStorage.setItem('token', response.accessToken);
		auth.isLoggedIn = true;
		router.push('/');
	} catch (err) {
		console.error('로그인 오류:', err);
	}
};

const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a6bbd782f7c8516f0c892c0bec9e33a3&redirect_uri=http://localhost:8080/api/user/kakaoLogin`;
const redirectToKakaoSignin = () => {
	window.location.href = kakaoLoginUrl;
};

</script>

<template>
	<router-link to="/">home</router-link>
	<main class="flex-grow flex flex-col items-center">
		<section class="flex flex-col items-center w-full mt-6">
			<div class="flex flex-col items-center mt-14">
				<div class="min-w-96">
					<div class="space-y-6">
						<div class="flex flex-col">
							<label for="email" class="ms-2 text-gray-700 font-bold">
								이메일
							</label>
							<div class="flex w-96 border-2 border-gray-300 p-2 mt-2 space-x-2 rounded-md">
								<input type="email" id="email"
									v-model="email" required
									class="h-12 p-2 flex-1 focus-visible:outline-none focus-visible:border-[#3FB8AF] border-2 border-white transition-colors"
									placeholder="이메일 입력" />
							</div>
						</div>
						<div class="flex flex-col">
							<label for="password" class="ms-2 text-gray-700 font-bold">
								비밀번호
							</label>
							<div class="flex w-96 border-2 border-gray-300 p-2 mt-2 space-x-2 rounded-md">
								<input type="password" v-model="password" required
									id="password" placeholder="비밀번호 입력" />
							</div>
						</div>
						<div>
							<button @click="fetchSignin"
								class="flex w-full justify-center rounded-md bg-[#3FB8AF] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#2c817c]">
								Sign in with Email</button>
						</div>
					</div>
					<div class="mt-4">
						<div class="relative">
							<div class="absolute inset-0 flex items-center">
								<div class="w-full border-t border-gray-300"></div>
							</div>
							<div class="relative flex justify-center text-xs">
								<span class="bg-white px-2 text-gray-500">또는</span>
							</div>
						</div>
						<div class="mt-4 flex items-center justify-center ">
							<button @click="redirectToKakaoSignin" 
								class="h-9 border-gray-300 rounded-md border-2 bg-[#f2f2f2] hover:border-gray-400 transition-colors">
								kakao login
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<style scoped></style>
