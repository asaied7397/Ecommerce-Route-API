const CART_KEY = "cart";

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function emitCartChange() {
  window.dispatchEvent(new Event("cart:changed"));
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  emitCartChange();
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const id = product._id || product.id;

  const idx = cart.findIndex((i) => (i._id || i.id) === id);

  if (idx >= 0) {
    cart[idx] = { ...cart[idx], quantity: cart[idx].quantity + qty };
  } else {
    cart.push({
      _id: id,
      title: product.title,
      price: Number(product.price || 0),
      imageCover: product.imageCover,
      quantity: qty,
    });
  }

  saveCart(cart);
  return cart;
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
}
