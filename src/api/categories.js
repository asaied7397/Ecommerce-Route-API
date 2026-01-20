import { api } from "./client.js";

export const categoriesApi = {
  getAll(params = {}) {
    return api.get("/categories", { params }).then((r) => r.data);
  },
  getById(id) {
    return api.get(`/categories/${id}`).then((r) => r.data);
  },
  getSubcategories(categoryId) {
    return api
      .get(`/categories/${categoryId}/subcategories`)
      .then((r) => r.data);
  },
};
