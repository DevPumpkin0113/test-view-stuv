import { jsonRequest} from './api';

export const signinEmail = async (data) => {

	const response = await jsonRequest(`/user/login`, 'POST', data);

	return response.data;
};

export const signout = async () => {
	await jsonRequest(`/user/logout`, 'POST');

	return { success: true, message: "로그아웃 되었습니다." };
}