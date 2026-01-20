import { api, authStore } from "./client.js";

function emitAuthChange() {
  window.dispatchEvent(new Event("auth:changed"));
}

export const authApi = {
  signup(payload) {
    return api.post("/auth/signup", payload).then((r) => r.data);
  },
  signin(payload) {
    return api.post("/auth/signin", payload).then((r) => {
      const data = r.data;
      if (data?.token) {
        authStore.setToken(data.token);
        emitAuthChange();
      }
      return data;
    });
  },
  forgotPassword(payload) {
    return api.post("/auth/forgotPasswords", payload).then((r) => r.data);
  },
  verifyResetCode(payload) {
    return api.post("/auth/verifyResetCode", payload).then((r) => r.data);
  },
  resetPassword(payload) {
    return api.put("/auth/resetPassword", payload).then((r) => {
      const data = r.data;
      if (data?.token) {
        authStore.setToken(data.token);
        emitAuthChange();
      }
      return data;
    });
  },
  verifyToken() {
    return api.get("/auth/verifyToken").then((r) => r.data);
  },
  updateMe(payload) {
    return api.put("/users/updateMe", payload).then((r) => r.data);
  },
  updateMyPassword(payload) {
    return api.put("/users/changeMyPassword", payload).then((r) => {
      const data = r.data;
      if (data?.token) {
        authStore.setToken(data.token);
        emitAuthChange();
      }
      return data;
    });
  },
  logout() {
    authStore.clearToken();
    emitAuthChange();
  },
};
