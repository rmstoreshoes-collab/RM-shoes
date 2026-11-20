(() => {
  const form = $('#checkout');
  form.elements.gov.innerHTML = `<option value="">اختار المحافظة</option>` +
    GOVERNORATES.map((g) => `<option>${g}</option>`).join('');

  function render() {
    const items = Cart.items();
    const empty = items.length === 0;
    $('#cart-empty').hidden = !empty || !$('#order-done').hidden;
    $('#cart-layout').hidden = empty;
    if (empty) return;

    $('#cart-list').innerHTML = items.map((i) => {
      const p = getProduct(i.id);
      const ci = Math.max(0, p.colors.findIndex((c) => c.name === i.color));
      const key = Cart.keyOf(i);
      return `
        <li class="cart-item" data-key="${escapeHTML(key)}">
          <a class="cart-thumb" href="product.html?id=${p.id}" style="--tint:${p.colors[ci].hex}">${productMedia(p, ci)}</a>
          <div class="cart-info">
            <a href="product.html?id=${p.id}" class="cart-name">${escapeHTML(p.name)}</a>
            <span class="muted small">اللون: ${escapeHTML(i.color)} · المقاس: ${i.size}</span>
            <span class="cart-unit">${formatPrice(p.price)}</span>
          </div>
          <div class="cart-actions">
            <div class="qty qty-sm">
              <button type="button" data-act="inc" aria-label="زيادة">+</button>
              <span>${i.qty}</span>
              <button type="button" data-act="dec" aria-label="تقليل">−</button>
            </div>
            <strong>${formatPrice(p.price * i.qty)}</strong>
            <button type="button" class="link-danger" data-act="remove">حذف</button>
          </div>
        </li>`;
    }).join('');

    $('#s-sub').textContent = formatPrice(Cart.subtotal());
    const ship = Cart.shipping();
    $('#s-ship').textContent = ship === 0 ? 'مجاني' : formatPrice(ship);
    const remaining = STORE.freeShippingOver - Cart.subtotal();
    $('#s-hint').textContent = STORE.freeShippingOver && remaining > 0
      ? `فاضلك ${formatPrice(remaining)} وتاخد شحن مجاني`
      : STORE.freeShippingOver ? 'مبروك! طلبك عليه شحن مجاني ✓' : '';
    $('#s-total').textContent = formatPrice(Cart.total());
  }

  $('#cart-list').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-act]');
    if (!b) return;
    const key = b.closest('.cart-item').dataset.key;
    const item = Cart.items().find((i) => Cart.keyOf(i) === key);
    if (!item) return;
    if (b.dataset.act === 'inc') Cart.setQty(key, item.qty + 1);
    if (b.dataset.act === 'dec') Cart.setQty(key, item.qty - 1);
    if (b.dataset.act === 'remove') Cart.remove(key);
  });

  document.addEventListener('cart:change', render);

  function buildMessage(data) {
    const lines = Cart.items().map((i, n) => {
      const p = getProduct(i.id);
      return `${n + 1}) ${p.name} (${p.id})\n   اللون: ${i.color} | المقاس: ${i.size} | الكمية: ${i.qty}\n   السعر: ${formatPrice(p.price * i.qty)}`;
    });
    const ship = Cart.shipping();
    return [
      `🛍️ طلب جديد من موقع ${STORE.name}`,
      '',
      ...lines,
      '',
      `المجموع: ${formatPrice(Cart.subtotal())}`,
      `الشحن: ${ship === 0 ? 'مجاني' : formatPrice(ship)}`,
      `الإجمالي: ${formatPrice(Cart.total())}`,
      '',
      '👤 بيانات العميل',
      `الاسم: ${data.name}`,
      `الموبايل: ${data.phone}`,
      `العنوان: ${data.gov} - ${data.city} - ${data.address}`,
      data.notes ? `ملاحظات: ${data.notes}` : null,
      'الدفع: عند الاستلام',
    ].filter((l) => l !== null).join('\n');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [...form.elements].filter((el) => el.name);
    fields.forEach((el) => { el.value = el.value.trim(); });
    let ok = true;
    fields.forEach((el) => {
      const valid = el.checkValidity();
      el.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    $('#form-error').hidden = ok;
    if (!ok) {
      form.querySelector('.invalid').focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const url = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(buildMessage(data))}`;
    $('#order-wa').href = url;
    window.open(url, '_blank', 'noopener');

    Cart.clear();
    form.reset();
    $('#order-done').hidden = false;
    $('#cart-empty').hidden = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  form.addEventListener('input', (e) => {
    if (e.target.classList.contains('invalid') && e.target.checkValidity()) {
      e.target.classList.remove('invalid');
    }
  });

  render();
  if (location.hash === '#checkout' && Cart.items().length) {
    setTimeout(() => form.elements.name.focus(), 100);
  }
})();
