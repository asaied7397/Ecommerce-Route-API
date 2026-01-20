import { api } from "./client.js";

export const addressesApi = {
  add(payload) {
    return api.post("/addresses", payload).then((r) => r.data);
  },
  remove(addressId) {
    return api.delete(`/addresses/${addressId}`).then((r) => r.data);
  },
  getMine() {
    return api.get("/addresses").then((r) => r.data);
  },
  getById(addressId) {
    return api.get(`/addresses/${addressId}`).then((r) => r.data);
  },
};
