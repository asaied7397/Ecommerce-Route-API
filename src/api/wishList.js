import { api } from "./client.js";

export const wishlistApi = {
  add(productId) {
    return api.post("/wishlist", { productId }).then((r) => r.data);
  },
  remove(productId) {
    return api.delete(`/wishlist/${productId}`).then((r) => r.data);
  },
  getMine() {
    return api.get("/wishlist").then((r) => r.data);
  },
};
