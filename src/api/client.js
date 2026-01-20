import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export const authStore = {
  setToken(token) {
    localStorage.setItem("token", token);
  },
  getToken() {
    return localStorage.getItem("token");
  },
  clearToken() {
    localStorage.removeItem("token");
  },
};

api.interceptors.request.use((config) => {
  const token = authStore.getToken();
  if (token) config.headers.token = token;
  return config;
});
