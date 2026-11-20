/* سلة المشتريات — بتتحفظ في متصفح الزائر (localStorage) */
const Cart = (() => {
  const KEY = 'rm_cart_v1';
  let memory = [];

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return memory;
    }
  }

  function write(items) {
    memory = items;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* وضع التصفح الخفي */ }
    document.dispatchEvent(new CustomEvent('cart:change', { detail: items }));
  }

  const keyOf = (i) => `${i.id}|${i.size}|${i.color}`;

  return {
    items() {
      // نشيل أي منتج اتمسح من products.js
      return read().filter((i) => PRODUCTS.some((p) => p.id === i.id));
    },
    add(id, size, color, qty = 1) {
      const items = read();
      const existing = items.find((i) => keyOf(i) === keyOf({ id, size, color }));
      if (existing) existing.qty = Math.min(existing.qty + qty, 10);
      else items.push({ id, size, color, qty });
      write(items);
    },
    setQty(key, qty) {
      const items = read();
      const item = items.find((i) => keyOf(i) === key);
      if (!item) return;
      item.qty = Math.max(1, Math.min(qty, 10));
      write(items);
    },
    remove(key) {
      write(read().filter((i) => keyOf(i) !== key));
    },
    clear() { write([]); },
    keyOf,
    count() { return this.items().reduce((s, i) => s + i.qty, 0); },
    subtotal() {
      return this.items().reduce((s, i) => {
        const p = PRODUCTS.find((x) => x.id === i.id);
        return s + (p ? p.price * i.qty : 0);
      }, 0);
    },
    shipping() {
      const sub = this.subtotal();
      if (sub === 0) return 0;
      if (STORE.freeShippingOver && sub >= STORE.freeShippingOver) return 0;
      return STORE.shippingFee;
    },
    total() { return this.subtotal() + this.shipping(); },
  };
})();
