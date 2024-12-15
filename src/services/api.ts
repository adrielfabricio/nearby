import axios from "axios";

const { EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_POST } = process.env;

export const api = axios.create({
	baseURL: `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_API_POST}`,
	timeout: 700,
});
