# RM Shoes — متجر أحذية

موقع متجر أحذية باللغة العربية (RTL)، HTML + CSS + JavaScript فقط، من غير أي build أو مكتبات.
الطلبات بتوصل لك على **واتساب** برسالة فيها كل تفاصيل الأوردر وبيانات العميل، والدفع عند الاستلام.

## الصفحات

| الصفحة | الملف |
|---|---|
| الرئيسية (هيرو، الأقسام، منتجات مختارة) | `index.html` |
| كل المنتجات (بحث، فلترة بالقسم/النوع/المقاس/السعر، ترتيب) | `shop.html` |
| صفحة المنتج (الألوان، المقاسات، الكمية، منتجات مشابهة) | `product.html?id=rm-001` |
| السلة وإتمام الطلب | `cart.html` |

## تعديل بيانات المتجر

افتح `assets/js/config.js` وغيّر:

- `whatsapp`: رقم الواتساب اللي هتوصله الطلبات (مثال `201012345678`)
- `phone`, `email`, `address`, `social`
- `shippingFee`: مصاريف الشحن، و`freeShippingOver`: الحد الأدنى للشحن المجاني

## إضافة أو تعديل المنتجات

كل المنتجات في `assets/js/products.js`. لإضافة منتج انسخ أي منتج وعدّل بياناته.

- **الصور**: حط صورة المنتج في `assets/img/products/` واكتب مسارها في `image`:
  ```js
  image: 'assets/img/products/rm-001.jpg',
  ```
  لو مفيش صورة، الموقع بيرسم شكل حذاء بلون المنتج تلقائيًا.
- `category`: `men` أو `women` أو `kids`
- `type`: `sneakers` أو `casual` أو `classic` أو `boots` أو `sandals`
- `featured: true` عشان يظهر في الصفحة الرئيسية

## تشغيله على جهازك

```bash
python3 -m http.server 8080
```

وافتح http://localhost:8080

## النشر على GitHub Pages

من إعدادات الريبو: **Settings → Pages → Source: Deploy from a branch → main / root**.
