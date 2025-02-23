import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8080/api',
	timeout: 10000,
});

export const jsonRequest = (url, method, data) => {
	return api({
		url,
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		data,
	});
};