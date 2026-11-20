(() => {
  const p = getProduct(getParam('id'));
  const root = $('#product');

  if (!p) {
    root.innerHTML = `
      <div class="empty">
        <p>المنتج ده مش موجود أو اتشال.</p>
        <a href="shop.html" class="btn btn-primary">ارجع للمنتجات</a>
      </div>`;
    return;
  }

  document.title = `${p.name} | ${STORE.name}`;
  const meta = document.createElement('meta');
  meta.name = 'description';
  meta.content = p.description;
  document.head.appendChild(meta);

  $('#breadcrumbs').innerHTML = `
    <a href="index.html">الرئيسية</a><span>/</span>
    <a href="shop.html?cat=${p.category}">${CATEGORY_LABELS[p.category]}</a><span>/</span>
    <span aria-current="page">${escapeHTML(p.name)}</span>`;

  const state = { color: 0, size: null, qty: 1 };
  const off = discountPercent(p);

  root.innerHTML = `
    <div class="product">
      <div class="product-media" id="p-media" style="--tint:${p.colors[0].hex}">
        ${off ? `<span class="badge badge-sale">-${off}%</span>` : p.badge ? `<span class="badge">${escapeHTML(p.badge)}</span>` : ''}
        <div id="p-image">${productMedia(p, 0)}</div>
      </div>

      <div class="product-info">
        <span class="card-cat">${CATEGORY_LABELS[p.category]} · ${TYPE_LABELS[p.type]}</span>
        <h1>${escapeHTML(p.name)}</h1>
        <div class="price price-lg">
          <strong>${formatPrice(p.price)}</strong>
          ${p.oldPrice ? `<del>${formatPrice(p.oldPrice)}</del><span class="save">وفّر ${formatPrice(p.oldPrice - p.price)}</span>` : ''}
        </div>
        <p class="product-desc">${escapeHTML(p.description)}</p>

        <div class="option">
          <span class="option-label">اللون: <b id="p-color-name">${escapeHTML(p.colors[0].name)}</b></span>
          <div class="swatches" id="p-colors">
            ${p.colors.map((c, i) => `
              <button type="button" class="swatch ${i === 0 ? 'active' : ''}" data-i="${i}"
                style="--c:${c.hex}" aria-label="${escapeHTML(c.name)}" title="${escapeHTML(c.name)}"></button>`).join('')}
          </div>
        </div>

        <div class="option">
          <span class="option-label">المقاس: <b id="p-size-name">اختار المقاس</b></span>
          <div class="sizes" id="p-sizes">
            ${p.sizes.map((s) => `<button type="button" class="size" data-s="${s}">${s}</button>`).join('')}
          </div>
          <p class="error" id="p-size-error" hidden>من فضلك اختار المقاس الأول</p>
        </div>

        <div class="buy-row">
          <div class="qty" aria-label="الكمية">
            <button type="button" data-d="1" aria-label="زيادة">+</button>
            <span id="p-qty">1</span>
            <button type="button" data-d="-1" aria-label="تقليل">−</button>
          </div>
          <button type="button" class="btn btn-primary btn-grow" id="p-add">أضف للسلة</button>
        </div>
        <button type="button" class="btn btn-ghost btn-block" id="p-buy">اشتري دلوقتي</button>

        ${p.features && p.features.length ? `
          <ul class="product-features">
            ${p.features.map((f) => `<li>${escapeHTML(f)}</li>`).join('')}
          </ul>` : ''}

        <div class="product-note">
          <span>${ICONS.truck}</span>
          <div>
            <strong>توصيل لكل المحافظات</strong>
            <span class="muted">الدفع عند الاستلام · استبدال خلال 14 يوم</span>
          </div>
        </div>
      </div>
    </div>`;

  // اختيار اللون
  $('#p-colors').addEventListener('click', (e) => {
    const b = e.target.closest('.swatch');
    if (!b) return;
    state.color = Number(b.dataset.i);
    $$('.swatch').forEach((s) => s.classList.toggle('active', s === b));
    $('#p-color-name').textContent = p.colors[state.color].name;
    $('#p-image').innerHTML = productMedia(p, state.color);
    $('#p-media').style.setProperty('--tint', p.colors[state.color].hex);
  });

  // اختيار المقاس
  $('#p-sizes').addEventListener('click', (e) => {
    const b = e.target.closest('.size');
    if (!b) return;
    state.size = Number(b.dataset.s);
    $$('.size').forEach((s) => s.classList.toggle('active', s === b));
    $('#p-size-name').textContent = state.size;
    $('#p-size-error').hidden = true;
  });

  // الكمية
  $('.qty').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    state.qty = Math.max(1, Math.min(10, state.qty + Number(b.dataset.d)));
    $('#p-qty').textContent = state.qty;
  });

  function add() {
    if (!state.size) {
      $('#p-size-error').hidden = false;
      $('#p-sizes').classList.add('shake');
      setTimeout(() => $('#p-sizes').classList.remove('shake'), 400);
      return false;
    }
    Cart.add(p.id, state.size, p.colors[state.color].name, state.qty);
    return true;
  }

  $('#p-add').addEventListener('click', () => {
    if (add()) toast(`اتضاف للسلة ✓ <a href="cart.html">عرض السلة</a>`);
  });
  $('#p-buy').addEventListener('click', () => {
    if (add()) location.href = 'cart.html#checkout';
  });

  // منتجات مشابهة
  const related = PRODUCTS
    .filter((x) => x.id !== p.id && (x.category === p.category || x.type === p.type))
    .slice(0, 4);
  if (related.length) {
    $('#related').innerHTML = related.map(productCard).join('');
    $('#related-section').hidden = false;
  }
})();
