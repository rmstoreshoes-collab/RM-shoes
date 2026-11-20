(() => {
  const maxPrice = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 100) * 100;
  const allSizes = [...new Set(PRODUCTS.flatMap((p) => p.sizes))].sort((a, b) => a - b);

  const params = new URLSearchParams(location.search);
  const state = {
    q: params.get('q') || '',
    cat: params.get('cat') || '',
    type: params.get('type') || '',
    size: params.get('size') || '',
    max: Number(params.get('max')) || maxPrice,
    sort: params.get('sort') || 'featured',
  };

  // تجهيز عناصر الفلاتر
  const catEl = $('#f-cat');
  catEl.innerHTML = [['', 'الكل'], ...Object.entries(CATEGORY_LABELS)]
    .map(([k, v]) => `<button type="button" class="chip" data-cat="${k}">${v}</button>`).join('');

  $('#f-type').innerHTML = `<option value="">الكل</option>` +
    Object.entries(TYPE_LABELS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');

  $('#f-size').innerHTML = `<option value="">كل المقاسات</option>` +
    allSizes.map((s) => `<option value="${s}">${s}</option>`).join('');

  const range = $('#f-max');
  range.min = 0;
  range.max = maxPrice;

  function syncInputs() {
    $('#f-q').value = state.q;
    $$('.chip', catEl).forEach((c) => c.classList.toggle('active', c.dataset.cat === state.cat));
    $('#f-type').value = state.type;
    $('#f-size').value = state.size;
    range.value = state.max;
    $('#f-max-val').textContent = formatPrice(state.max);
    $('#f-sort').value = state.sort;
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) =>
      (!state.cat || p.category === state.cat) &&
      (!state.type || p.type === state.type) &&
      (!state.size || p.sizes.includes(Number(state.size))) &&
      p.price <= state.max &&
      (!q || p.name.toLowerCase().includes(q) ||
        TYPE_LABELS[p.type].includes(q) || CATEGORY_LABELS[p.category].includes(q)));

    const sorters = {
      featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      discount: (a, b) => discountPercent(b) - discountPercent(a),
      new: (a, b) => (b.badge === 'جديد' ? 1 : 0) - (a.badge === 'جديد' ? 1 : 0),
    };
    list = [...list].sort(sorters[state.sort] || sorters.featured);
    if (state.sort === 'discount') list = list.filter((p) => p.oldPrice);
    return list;
  }

  function updateURL() {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.cat) p.set('cat', state.cat);
    if (state.type) p.set('type', state.type);
    if (state.size) p.set('size', state.size);
    if (state.max < maxPrice) p.set('max', state.max);
    if (state.sort !== 'featured') p.set('sort', state.sort);
    const qs = p.toString();
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  }

  function render() {
    syncInputs();
    const list = filtered();
    $('#products').innerHTML = list.map(productCard).join('');
    $('#empty').hidden = list.length > 0;
    $('#result-count').textContent = `${list.length} منتج`;
    const title = state.sort === 'discount' && !state.cat
      ? 'العروض والخصومات'
      : state.cat ? `أحذية ${CATEGORY_LABELS[state.cat]}` : 'كل المنتجات';
    $('#shop-title').textContent = title;
    document.title = `${title} | ${STORE.name}`;
    // تحديث الرابط النشط في الهيدر
    $$('.main-nav a').forEach((a) => {
      const u = new URL(a.href);
      const isShop = u.pathname.endsWith('shop.html');
      a.classList.toggle('active', isShop && (u.searchParams.get('cat') || '') === state.cat);
    });
    updateURL();
  }

  function set(patch) { Object.assign(state, patch); render(); }

  let t;
  $('#f-q').addEventListener('input', (e) => {
    clearTimeout(t);
    t = setTimeout(() => set({ q: e.target.value }), 200);
  });
  catEl.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (b) set({ cat: b.dataset.cat });
  });
  $('#f-type').addEventListener('change', (e) => set({ type: e.target.value }));
  $('#f-size').addEventListener('change', (e) => set({ size: e.target.value }));
  range.addEventListener('input', (e) => set({ max: Number(e.target.value) }));
  $('#f-sort').addEventListener('change', (e) => set({ sort: e.target.value }));

  const reset = () => set({ q: '', cat: '', type: '', size: '', max: maxPrice, sort: 'featured' });
  $('#f-reset').addEventListener('click', reset);
  $('#empty-reset').addEventListener('click', reset);

  $('#filters-toggle').addEventListener('click', () => $('#filters').classList.toggle('open'));

  render();
})();
