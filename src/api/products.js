import { api } from "./client.js";

export const productsApi = {
  getAll(params = {}) {
    return api.get("/products", { params }).then((r) => r.data);
  },
  getById(id) {
    return api.get(`/products/${id}`).then((r) => r.data);
  },
  getByBrandId(brandId, params = {}) {
    return api
      .get("/products", { params: { ...params, brand: brandId } })
      .then((r) => r.data);
  },
  getByCategoryId(categoryId, params = {}) {
    return api
      .get("/products", { params: { ...params, category: categoryId } })
      .then((r) => r.data);
  },
};
