import { api } from "./client.js";

export const ordersApi = {
  createCashOrder(cartId, shippingAddress) {
    return api
      .post(`/orders/${cartId}`, { shippingAddress })
      .then((r) => r.data);
  },
  getAll() {
    return api.get("/orders/").then((r) => r.data);
  },
  getUserOrders(userId) {
    return api.get(`/orders/user/${userId}`).then((r) => r.data);
  },
  checkoutSession(cartId, returnUrl, shippingAddress) {
    return api
      .post(
        `/orders/checkout-session/${cartId}`,
        { shippingAddress },
        { params: { url: returnUrl } },
      )
      .then((r) => r.data);
  },
};
