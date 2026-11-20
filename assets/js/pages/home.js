(() => {
  // صورة الهيرو
  const hero = getProduct('rm-001');
  $('#hero-art').innerHTML = `<div class="hero-circle"></div>${productMedia(hero)}`;

  // المميزات
  $$('.feature').forEach((f) => {
    f.insertAdjacentHTML('afterbegin', `<span class="feature-icon">${ICONS[f.dataset.icon]}</span>`);
  });

  // الأقسام
  const cats = [
    { key: 'men', label: 'رجالي', sample: 'rm-003' },
    { key: 'women', label: 'حريمي', sample: 'rm-005' },
    { key: 'kids', label: 'أطفال', sample: 'rm-009' },
  ];
  $('#categories').innerHTML = cats.map((c) => {
    const p = getProduct(c.sample);
    const count = PRODUCTS.filter((x) => x.category === c.key).length;
    return `
      <a class="category" href="shop.html?cat=${c.key}" style="--tint:${p.colors[0].hex}">
        <div class="category-media">${productMedia(p)}</div>
        <div class="category-text"><strong>${c.label}</strong><span>${count} موديل</span></div>
      </a>`;
  }).join('');

  // منتجات مختارة
  $('#featured').innerHTML = PRODUCTS.filter((p) => p.featured).slice(0, 8).map(productCard).join('');

  const msg = encodeURIComponent('أهلاً، محتاج مساعدة في اختيار المقاس');
  $('#promo-wa').href = `https://wa.me/${STORE.whatsapp}?text=${msg}`;
})();
