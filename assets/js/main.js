/* دوال مشتركة لكل الصفحات */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function formatPrice(n) {
  return `${Number(n).toLocaleString('en-US')} ${STORE.currency}`;
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function discountPercent(p) {
  return p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
}

/* ---------- رسم الحذاء (لحد ما تضيف صور حقيقية) ---------- */
function shoeSVG(type, color, accent) {
  const shadow = '<ellipse cx="110" cy="124" rx="94" ry="6" fill="rgba(0,0,0,.10)"/>';
  const shapes = {
    sneakers: `
      <path d="M16 102 H204 Q208 102 208 108 Q208 118 196 118 H30 Q16 118 16 108 Z" fill="#fff" stroke="#d6d3d1" stroke-width="1.5"/>
      <path d="M20 110 H204" stroke="${accent}" stroke-width="2" opacity=".5"/>
      <path d="M18 102 V58 Q18 44 32 44 Q52 46 66 52 Q78 56 88 44 L96 34 Q102 28 110 32 Q140 52 176 66 Q206 76 206 94 V102 Z" fill="${color}"/>
      <path d="M18 58 Q18 44 32 44 L36 74 L18 80 Z" fill="${accent}" opacity=".85"/>
      <path d="M176 66 Q206 76 206 94 V102 H184 Q182 82 176 66 Z" fill="#fff" opacity=".18"/>
      <path d="M44 92 Q104 90 156 64" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
      <g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9">
        <path d="M100 42 L110 50"/><path d="M112 48 L122 56"/><path d="M124 55 L134 63"/>
      </g>`,
    casual: `
      <path d="M16 100 H204 Q208 100 208 106 Q208 116 196 116 H30 Q16 116 16 106 Z" fill="#fff" stroke="#d6d3d1" stroke-width="1.5"/>
      <path d="M18 100 V66 Q18 54 30 54 Q58 56 76 58 Q92 46 110 46 Q146 58 180 72 Q206 80 206 94 V100 Z" fill="${color}"/>
      <path d="M18 66 Q18 54 30 54 L32 78 L18 80 Z" fill="${accent}" opacity=".7"/>
      <path d="M30 88 H200" stroke="${accent}" stroke-width="1.5" stroke-dasharray="4 4" opacity=".6"/>
      <g stroke="${accent}" stroke-width="3" stroke-linecap="round" opacity=".8">
        <path d="M96 52 L106 58"/><path d="M110 56 L120 62"/><path d="M124 61 L134 67"/>
      </g>`,
    classic: `
      <path d="M20 102 H200 Q208 102 208 108 V112 H26 Q20 112 20 108 Z" fill="${accent}"/>
      <path d="M38 112 V122 H56 V112 Z" fill="${accent}"/>
      <path d="M22 102 V70 Q22 60 34 60 Q70 62 96 56 Q140 58 178 72 Q208 84 206 102 Z" fill="${color}"/>
      <path d="M96 56 Q120 58 132 74 Q112 80 92 72 Z" fill="${accent}" opacity=".35"/>
      <path d="M30 94 Q120 90 200 96" fill="none" stroke="#fff" stroke-width="1.2" stroke-dasharray="3 3" opacity=".5"/>
      <path d="M150 66 Q170 74 178 92" fill="none" stroke="#fff" stroke-width="1.2" stroke-dasharray="3 3" opacity=".5"/>`,
    boots: `
      <path d="M26 100 H202 Q210 100 210 108 Q210 120 198 120 H36 Q26 120 26 110 Z" fill="${accent}"/>
      <path d="M30 108 H206" stroke="#000" stroke-width="1" opacity=".25"/>
      <path d="M30 100 V22 Q30 12 40 12 H82 Q92 12 92 22 V54 Q122 62 168 70 Q206 78 206 94 V100 Z" fill="${color}"/>
      <path d="M30 22 Q30 12 40 12 H82 Q92 12 92 22 V28 H30 Z" fill="${accent}" opacity=".55"/>
      <g stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".75">
        <path d="M80 36 L92 40"/><path d="M80 46 L92 50"/><path d="M84 56 L98 58"/>
      </g>
      <path d="M36 88 H200" stroke="#fff" stroke-width="1.2" stroke-dasharray="4 3" opacity=".45"/>`,
    sandals: `
      <path d="M14 100 H204 Q212 100 212 107 Q212 116 200 116 H26 Q14 116 14 107 Z" fill="${accent}"/>
      <path d="M18 100 H206 Q206 96 200 94 H24 Q18 96 18 100 Z" fill="#fff" opacity=".7"/>
      <path d="M40 96 Q44 58 72 60 Q86 62 86 96" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"/>
      <path d="M112 96 Q120 62 150 66 Q172 70 176 96" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"/>
      <path d="M140 96 Q150 74 186 82" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="70" cy="62" r="4" fill="${accent}"/>`,
  };
  return `<svg class="shoe" viewBox="0 0 220 140" role="img" aria-hidden="true">${shadow}${shapes[type] || shapes.sneakers}</svg>`;
}

function productMedia(p, colorIndex = 0) {
  const c = p.colors[colorIndex] || p.colors[0];
  if (p.image) {
    return `<img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy">`;
  }
  return shoeSVG(p.type, c.hex, c.accent);
}

function productCard(p) {
  const off = discountPercent(p);
  const badge = p.badge
    ? `<span class="badge ${off ? 'badge-sale' : ''}">${off ? `-${off}%` : escapeHTML(p.badge)}</span>`
    : '';
  return `
    <article class="card">
      <a class="card-media" href="product.html?id=${p.id}" style="--tint:${p.colors[0].hex}">
        ${badge}
        ${productMedia(p)}
      </a>
      <div class="card-body">
        <span class="card-cat">${CATEGORY_LABELS[p.category]} · ${TYPE_LABELS[p.type]}</span>
        <h3 class="card-title"><a href="product.html?id=${p.id}">${escapeHTML(p.name)}</a></h3>
        <div class="card-foot">
          <div class="price">
            <strong>${formatPrice(p.price)}</strong>
            ${p.oldPrice ? `<del>${formatPrice(p.oldPrice)}</del>` : ''}
          </div>
          <div class="dots" aria-label="الألوان المتاحة">
            ${p.colors.map((c) => `<span style="background:${c.hex}" title="${escapeHTML(c.name)}"></span>`).join('')}
          </div>
        </div>
      </div>
    </article>`;
}

/* ---------- الهيدر والفوتر ---------- */
const ICONS = {
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1 13H5L6 7Z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v5h-5"/></svg>',
  cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.6-1.3a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.2-.2-.2-.4-.3Z"/></svg>',
};

function renderHeader(active) {
  const links = [
    ['index.html', 'الرئيسية', 'home'],
    ['shop.html', 'كل المنتجات', 'shop'],
    ['shop.html?cat=men', 'رجالي', 'men'],
    ['shop.html?cat=women', 'حريمي', 'women'],
    ['shop.html?cat=kids', 'أطفال', 'kids'],
  ];
  const cat = getParam('cat');
  const current = active === 'shop' && cat ? cat : active;
  const nav = links.map(([href, label, key]) =>
    `<a href="${href}" class="${key === current ? 'active' : ''}">${label}</a>`).join('');

  const freeShip = STORE.freeShippingOver
    ? `شحن مجاني للطلبات فوق ${formatPrice(STORE.freeShippingOver)} · الدفع عند الاستلام`
    : 'الدفع عند الاستلام لكل المحافظات';

  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML = `
    <div class="topbar">${freeShip}</div>
    <div class="header-inner container">
      <button class="icon-btn menu-btn" aria-label="القائمة" aria-expanded="false">${ICONS.menu}</button>
      <a href="index.html" class="logo" aria-label="${STORE.name}"><span class="logo-mark">RM</span><span class="logo-text">Shoes</span></a>
      <nav class="main-nav" aria-label="القائمة الرئيسية">${nav}</nav>
      <a href="cart.html" class="icon-btn cart-btn" aria-label="السلة">${ICONS.bag}<span class="cart-count" hidden>0</span></a>
    </div>`;

  const btn = $('.menu-btn', el);
  btn.addEventListener('click', () => {
    const open = el.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open);
    btn.innerHTML = open ? ICONS.close : ICONS.menu;
  });
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="container footer-grid">
      <div>
        <a href="index.html" class="logo logo-light"><span class="logo-mark">RM</span><span class="logo-text">Shoes</span></a>
        <p class="footer-about">${STORE.tagline}. أحذية رجالي وحريمي وأطفال بجودة عالية وأسعار مناسبة، وتوصيل لكل محافظات مصر.</p>
      </div>
      <div>
        <h4>تسوّق</h4>
        <a href="shop.html?cat=men">رجالي</a>
        <a href="shop.html?cat=women">حريمي</a>
        <a href="shop.html?cat=kids">أطفال</a>
        <a href="shop.html">كل المنتجات</a>
      </div>
      <div>
        <h4>تواصل معانا</h4>
        <a href="https://wa.me/${STORE.whatsapp}" target="_blank" rel="noopener">واتساب: ${STORE.phone}</a>
        <a href="mailto:${STORE.email}">${STORE.email}</a>
        <span>${STORE.address}</span>
      </div>
      <div>
        <h4>تابعنا</h4>
        <a href="${STORE.social.instagram}" target="_blank" rel="noopener">إنستجرام</a>
        <a href="${STORE.social.facebook}" target="_blank" rel="noopener">فيسبوك</a>
        <a href="${STORE.social.tiktok}" target="_blank" rel="noopener">تيك توك</a>
      </div>
    </div>
    <div class="container footer-bottom">© ${new Date().getFullYear()} ${STORE.name}. كل الحقوق محفوظة.</div>`;
}

function updateCartBadge() {
  const badge = $('.cart-count');
  if (!badge) return;
  const n = Cart.count();
  badge.textContent = n;
  badge.hidden = n === 0;
}

let toastTimer;
function toast(message) {
  let el = $('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.innerHTML = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function renderWhatsAppFab() {
  const a = document.createElement('a');
  a.className = 'wa-fab';
  a.href = `https://wa.me/${STORE.whatsapp}`;
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', 'كلمنا على واتساب');
  a.innerHTML = ICONS.whatsapp;
  document.body.appendChild(a);
}

renderHeader(document.body.dataset.page);
renderFooter();
renderWhatsAppFab();
updateCartBadge();
document.addEventListener('cart:change', updateCartBadge);
