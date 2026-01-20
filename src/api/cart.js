import { api } from "./client.js";

export const cartApi = {
  addProduct(productId, count = 1) {
    return api.post("/cart", { productId, count }).then((r) => r.data);
  },
  updateQty(itemId, count) {
    return api.put(`/cart/${itemId}`, { count }).then((r) => r.data);
  },
  getMine() {
    return api.get("/cart").then((r) => r.data);
  },
  removeItem(itemId) {
    return api.delete(`/cart/${itemId}`).then((r) => r.data);
  },
  clear() {
    return api.delete("/cart").then((r) => r.data);
  },
};
