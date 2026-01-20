import { api } from "./client.js";

export const subcategoriesApi = {
  getAll(params = {}) {
    return api.get("/subcategories", { params }).then((r) => r.data);
  },
  getById(id) {
    return api.get(`/subcategories/${id}`).then((r) => r.data);
  },
};
