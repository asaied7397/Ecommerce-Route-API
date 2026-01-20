import { api } from "./client.js";

export const brandsApi = {
  getAll(params = {}) {
    return api.get("/brands", { params }).then((r) => r.data);
  },
  getById(id) {
    return api.get(`/brands/${id}`).then((r) => r.data);
  },
};
