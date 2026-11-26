/* KROMATCH website widget
   Put this ONCE on the shop's website (e.g. in the footer):
     <script src="https://kromatch.com/widget.js" data-shop="your-shop" async></script>
   Then choose where Kromatch appears:
     <div class="kromatch-banner"></div>   big explainer, for the home page or the top of the spray-paint section
     <div class="kromatch-button"></div>   compact branded button, e.g. on each spray-can product page
     <a class="kromatch-open" href="#">...</a>   any link or button of your own opens it too (or call Kromatch.open())
   Or put the script itself where one should go, with data-style="banner" | "button" | "floating" | "none".
   Options on the script or on each div: data-theme="light" (light version; dark is the default), data-label="..." (own button text),
   data-note="off" (hides the small "suggestions, not a guarantee" line under a button; the banner and the panel always show it).
   Other script options: data-cart-url="/cart" (if the cart page isn't the usual one), data-lang="el" (otherwise the page language).
   What it does: opens Kromatch in a panel on this page, locked to this shop's colours, stock and prices;
   "Add to cart" puts the cans into THIS website's cart (Shopify or WooCommerce, or your own window.KromatchCart). */
(function () {
  'use strict';
  var script = document.currentScript || document.querySelector('script[src*="widget.js"][data-shop]');
  if (!script) return;
  var K = window.Kromatch;

  var FONT = "'Archivo', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
  var ICON = '<svg class="ico" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="22" fill="#141414"/><g transform="translate(0 -4)">' +
    '<g transform="rotate(-10 36 46)"><rect x="18" y="22" width="36" height="48" rx="6" fill="#1FA6A0"/><rect x="18" y="58" width="36" height="12" fill="#F1EFEA"/>' +
    '<rect x="23" y="62" width="18" height="2.5" rx="1" fill="#141414"/></g><rect x="60" y="30" width="12" height="9" rx="3" fill="#F1EFEA"/>' +
    '<path d="M50 54 Q50 39 66 39 Q82 39 82 54 Z" fill="#F1EFEA" stroke="#141414" stroke-width="3"/>' +
    '<rect x="48" y="52" width="36" height="38" rx="7" fill="#1FA6A0" stroke="#141414" stroke-width="4"/></g></svg>';
  var STEP_ART = [
    '<svg viewBox="0 0 960 720" aria-hidden="true"><clipPath id="wcmtablet"><rect x="30" y="30" width="900" height="660" rx="80"/></clipPath><g clip-path="url(#wcmtablet)"><rect x="30" y="30" width="900" height="660" fill="#2E2E2E"/><rect x="30" y="30" width="900" height="660" fill="#141414"/><rect x="90" y="80" width="780" height="560" rx="26" fill="#FFFFFF"/></g><circle cx="480" cy="58" r="8" fill="#3A3A3A"/><path d="M211 556 L241 586 L391 561 L398 440 L465 506 L539 574 L602 565 L655 551 L706 531 L754 506 L724 476 L573 390 L494 348 L625 157 L622 157 L623 155 L621 156 L622 154 L620 155 L621 153 L619 154 L620 152 L618 153 L619 151 L617 152 L618 150 L616 151 L617 149 L615 150 L616 148 L614 149 L615 147 L613 148 L614 146 L612 147 L613 145 L611 146 L612 144 L610 145 L611 143 L609 144 L610 142 L608 143 L609 141 L607 142 L608 140 L606 141 L607 139 L605 140 L606 138 L604 139 L605 137 L603 138 L604 136 L602 137 L603 135 L601 136 L602 134 L600 135 L601 133 L599 134 L600 132 L598 133 L599 131 L597 132 L598 130 L596 131 L597 129 L595 130 L596 128 L594 129 L595 127 L472 161 L406 257 L393 169 L363 139 L242 172 L245 259 L242 358 L230 459Z" fill="#1FA6A0"/><path d="M258 361 L249 437 L231 539 L260 568 L377 548 L385 405 L473 493 L545 558 L599 550 L638 541 L676 528 L724 505 L695 476 L582 413 L520 379 L519 381 L516 380 L519 381 L512 375 L472 354 L589 182 L587 183 L588 181 L586 182 L587 180 L585 181 L586 179 L584 180 L585 178 L583 179 L584 177 L582 178 L583 176 L581 177 L582 175 L580 176 L581 174 L579 175 L580 173 L577 173 L578 171 L576 172 L577 170 L575 171 L576 169 L574 170 L575 168 L573 169 L574 167 L572 168 L573 166 L571 167 L572 165 L570 166 L571 164 L569 165 L570 163 L568 164 L569 162 L567 163 L568 161 L566 162 L567 160 L565 161 L566 159 L564 160 L565 158 L563 159 L563 156 L561 157 L562 155 L559 155 L560 153 L482 175 L398 299 L381 188 L352 159 L259 184 L261 285Z M519 381 L517 381 L518 381Z M518 382 L518 382 L519 382Z" fill="#D3473A"/><path d="M252 234 L252 309 L246 384 L237 460 L220 548 L355 525 L362 393 L438 468 L512 536 L557 531 L610 519 L661 500 L710 476 L585 405 L447 332 L578 139 L477 167 L381 306 L358 148 L249 177Z" fill="#1FA6A0"/><path d="M260 234 L260 309 L254 385 L245 461 L230 538 L347 518 L355 374 L409 430 L432 452 L443 463 L455 473 L448 467 L511 374 L513 375 L508 372 L489 363 L471 353 L435 335 L559 152 L481 174 L376 327 L351 158 L258 183Z M455 474 L515 528 L569 520 L608 511 L646 498 L670 487 L694 475 L600 422 L519 378Z" fill="#2A6FDB"/><path d="M387 333 L490 183 L540 169 L544 163 L485 179 L386 325Z M527 390 L521 387 L463 473 L468 477Z M243 529 L257 445 L265 369 L269 294 L268 244 L266 193 L346 171 L346 166 L264 188 L266 233 L267 284 L263 360 L255 437 L247 488 L239 530Z" fill="#F5B700"/><path d="M633.6292929292929 132.3 L643.6292929292929 162.3 L673.6292929292929 172.3 L643.6292929292929 182.3 L633.6292929292929 212.3 L623.6292929292929 182.3 L593.6292929292929 172.3 L623.6292929292929 162.3Z" fill="#F5B700"/><path d="M250.3707070707071 485.69999999999993 L255.8707070707071 502.19999999999993 L272.3707070707071 507.69999999999993 L255.8707070707071 513.1999999999999 L250.3707070707071 529.6999999999999 L244.8707070707071 513.1999999999999 L228.3707070707071 507.69999999999993 L244.8707070707071 502.19999999999993Z" fill="#F5B700"/></svg>',
    '<svg viewBox="0 0 96 72" aria-hidden="true">' + ['#2A6FDB', '#1FA6A0', '#D3473A', '#F5B700'].map(function (c, i) {
      var n = ['\u00d74', '\u00d72', '\u00d71', '\u00d71'][i];
      return '<g transform="translate(' + (1 + i * 24) + ' 0)"><rect x="2" y="22" width="18" height="38" rx="4" fill="' + c + '"/><path d="M3 24 Q3 14 11 14 Q19 14 19 24 Z" fill="#F1EFEA"/><rect x="7.5" y="7" width="7" height="7" rx="2" fill="#F1EFEA"/><text x="11" y="70" text-anchor="middle" font-size="11" font-weight="800" fill="currentColor" font-family="Archivo, sans-serif">' + n + '</text></g>';
    }).join('') + '</svg>',
    '<svg viewBox="0 0 96 72" aria-hidden="true"><path d="M8 14 H20 L30 50 H78 L86 24 H26" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="36" cy="62" r="5" fill="currentColor"/><circle cx="72" cy="62" r="5" fill="currentColor"/><rect x="38" y="28" width="9" height="16" rx="2" fill="#D3473A"/><rect x="50" y="28" width="9" height="16" rx="2" fill="#F5B700"/><rect x="62" y="28" width="9" height="16" rx="2" fill="#1FA6A0"/></svg>'
  ];
  var T = {
    en: { a: 'Adding your Kromatch cans to the cart\u2026', af: 'Your cans couldn\'t be added to the cart. Please add them yourself, or ask the shop.', d: 'Matches are suggestions, not a guarantee.', pre: 'Match colours with', close: 'Close', h: 'Planning a piece or a mural?', p: 'Upload your design. Kromatch matches every colour to the cans we stock, tells you how many you need, and puts them all in your cart.', s: ['Upload your design', 'See the matching cans', 'Add them all to cart'] },
    el: { a: '\u03a4\u03b1 \u03c3\u03c0\u03c1\u03ad\u03b9 \u03c4\u03bf\u03c5 Kromatch \u03bc\u03c0\u03b1\u03af\u03bd\u03bf\u03c5\u03bd \u03c3\u03c4\u03bf \u03ba\u03b1\u03bb\u03ac\u03b8\u03b9\u2026', af: '\u03a4\u03b1 \u03c3\u03c0\u03c1\u03ad\u03b9 \u03b4\u03b5\u03bd \u03bc\u03c0\u03ae\u03ba\u03b1\u03bd \u03c3\u03c4\u03bf \u03ba\u03b1\u03bb\u03ac\u03b8\u03b9. \u03a0\u03c1\u03cc\u03c3\u03b8\u03b5\u03c3\u03ad \u03c4\u03b1 \u03bc\u03cc\u03bd\u03bf\u03c2 \u03c3\u03bf\u03c5 \u03ae \u03c1\u03ce\u03c4\u03b1 \u03c4\u03bf \u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b7\u03bc\u03b1.', d: '\u039f\u03b9 \u03b1\u03bd\u03c4\u03b9\u03c3\u03c4\u03bf\u03b9\u03c7\u03af\u03c3\u03b5\u03b9\u03c2 \u03b5\u03af\u03bd\u03b1\u03b9 \u03c0\u03c1\u03bf\u03c4\u03ac\u03c3\u03b5\u03b9\u03c2, \u03cc\u03c7\u03b9 \u03b5\u03b3\u03b3\u03cd\u03b7\u03c3\u03b7.', pre: '\u03a4\u03b1\u03af\u03c1\u03b9\u03b1\u03be\u03b5 \u03c7\u03c1\u03ce\u03bc\u03b1\u03c4\u03b1 \u03bc\u03b5 \u03c4\u03bf', close: '\u039a\u03bb\u03b5\u03af\u03c3\u03b9\u03bc\u03bf', h: '\u03a3\u03c7\u03b5\u03b4\u03b9\u03ac\u03b6\u03b5\u03b9\u03c2 \u03ba\u03bf\u03bc\u03bc\u03ac\u03c4\u03b9 \u03ae \u03c4\u03bf\u03b9\u03c7\u03bf\u03b3\u03c1\u03b1\u03c6\u03af\u03b1;', p: '\u0391\u03bd\u03ad\u03b2\u03b1\u03c3\u03b5 \u03c4\u03bf \u03c3\u03c7\u03ad\u03b4\u03b9\u03cc \u03c3\u03bf\u03c5. \u03a4\u03bf Kromatch \u03b2\u03c1\u03af\u03c3\u03ba\u03b5\u03b9 \u03b3\u03b9\u03b1 \u03ba\u03ac\u03b8\u03b5 \u03c7\u03c1\u03ce\u03bc\u03b1 \u03c4\u03bf \u03c3\u03c0\u03c1\u03ad\u03b9 \u03c0\u03bf\u03c5 \u03ad\u03c7\u03bf\u03c5\u03bc\u03b5, \u03c3\u03bf\u03c5 \u03bb\u03ad\u03b5\u03b9 \u03c0\u03cc\u03c3\u03b1 \u03c7\u03c1\u03b5\u03b9\u03ac\u03b6\u03b5\u03c3\u03b1\u03b9 \u03ba\u03b1\u03b9 \u03c4\u03b1 \u03b2\u03ac\u03b6\u03b5\u03b9 \u03cc\u03bb\u03b1 \u03c3\u03c4\u03bf \u03ba\u03b1\u03bb\u03ac\u03b8\u03b9.', s: ['\u0391\u03bd\u03ad\u03b2\u03b1\u03c3\u03b5 \u03c4\u03bf \u03c3\u03c7\u03ad\u03b4\u03b9\u03bf', '\u0394\u03b5\u03c2 \u03c4\u03b1 \u03c3\u03c0\u03c1\u03ad\u03b9 \u03c0\u03bf\u03c5 \u03c4\u03b1\u03b9\u03c1\u03b9\u03ac\u03b6\u03bf\u03c5\u03bd', '\u038c\u03bb\u03b1 \u03c3\u03c4\u03bf \u03ba\u03b1\u03bb\u03ac\u03b8\u03b9'] },
    fr: { a: 'Ajout de vos bombes Kromatch au panier\u2026', af: 'Vos bombes n\'ont pas pu \u00eatre ajout\u00e9es au panier. Ajoutez-les vous-m\u00eame ou demandez au magasin.', d: 'Les correspondances sont des suggestions, pas une garantie.', pre: 'Trouvez vos couleurs avec', close: 'Fermer', h: 'Vous pr\u00e9parez une pi\u00e8ce ou une fresque\u00a0?', p: 'Importez votre dessin. Kromatch associe chaque couleur aux bombes que nous avons en stock, vous dit combien il en faut et les met toutes dans votre panier.', s: ['Importez votre dessin', 'Voyez les bombes assorties', 'Tout au panier'] },
    de: { a: 'Deine Kromatch-Dosen kommen in den Warenkorb\u2026', af: 'Die Dosen konnten nicht in den Warenkorb gelegt werden. Leg sie selbst hinein oder frag den Shop.', d: 'Die Treffer sind Vorschl\u00e4ge, keine Garantie.', pre: 'Farben finden mit', close: 'Schlie\u00dfen', h: 'Du planst ein Piece oder ein Wandbild?', p: 'Lade deinen Entwurf hoch. Kromatch findet f\u00fcr jede Farbe die passende Dose aus unserem Sortiment, sagt dir, wie viele du brauchst, und legt alle in deinen Warenkorb.', s: ['Entwurf hochladen', 'Passende Dosen sehen', 'Alles in den Warenkorb'] },
    es: { a: 'A\u00f1adiendo tus botes de Kromatch al carrito\u2026', af: 'No se pudieron a\u00f1adir los botes al carrito. A\u00f1\u00e1delos t\u00fa o pregunta en la tienda.', d: 'Las coincidencias son sugerencias, no una garant\u00eda.', pre: 'Encuentra tus colores con', close: 'Cerrar', h: '\u00bfPreparando una pieza o un mural?', p: 'Sube tu dise\u00f1o. Kromatch encuentra para cada color el bote que tenemos, te dice cu\u00e1ntos necesitas y los pone todos en tu carrito.', s: ['Sube tu dise\u00f1o', 'Mira los botes que encajan', 'Todo al carrito'] }
  };

  /* ---------- Core: one panel per page, however many buttons ---------- */
  if (!K || !K._ready) {
    var BASE = new URL(script.src, location.href).origin;
    var SHOP = (script.getAttribute('data-shop') || '').trim();
    if (!SHOP) { console.warn('[Kromatch] data-shop is missing'); return; }
    var pageLang = (script.getAttribute('data-lang') || document.documentElement.lang || navigator.language || 'en').slice(0, 2).toLowerCase();
    var L = T[pageLang] || T.en;

    // the brand font, served from Kromatch itself (no Google request; falls back to the system font if the site blocks it)
    if (!document.querySelector('style[data-kromatch-font]')) {
      var fs = document.createElement('style'); fs.setAttribute('data-kromatch-font', '');
      fs.textContent = "@font-face{font-family:'Archivo';font-style:normal;font-display:swap;font-weight:100 900;font-stretch:62% 125%;" +
        "src:url('" + BASE + "/fonts/archivo.woff2') format('woff2-variations'),url('" + BASE + "/fonts/archivo.woff2') format('woff2');" +
        "unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2212}";
      (document.head || document.documentElement).appendChild(fs);
    }

    var host = document.createElement('div'); host.setAttribute('data-kromatch', 'panel');
    var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    root.innerHTML = '<style>:host{all:initial}' +
      '.ov{position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.5);display:none}.ov.open{display:block}' +
      '.panel{position:absolute;top:0;right:0;height:100%;width:min(480px,100%);background:#fff;box-shadow:-4px 0 24px rgba(0,0,0,.25);display:flex;flex-direction:column}' +
      '.bar{display:flex;align-items:center;justify-content:space-between;padding:6px 8px 6px 12px;background:#141414;color:#F1EFEA;font-family:' + FONT + '}' +
      '.brand{display:flex;align-items:center;gap:8px;font-weight:900;letter-spacing:.02em;font-size:15px}.brand .ico{width:24px;height:24px}' +
      '.x{font:600 14px ' + FONT + ';background:transparent;color:#F1EFEA;border:0;padding:8px 10px;cursor:pointer;border-radius:8px}' +
      '.x:focus-visible{outline:2px solid #1FA6A0}iframe{flex:1;width:100%;border:0;background:#fff}' +
      '@media (max-width:560px){.panel{width:100%}}</style>' +
      '<div class="ov" role="dialog" aria-modal="true" aria-label="Kromatch"><div class="panel"><div class="bar"><span class="brand">' + ICON + 'KROMATCH</span>' +
      '<button type="button" class="x">\u2715 ' + L.close + '</button></div></div></div>';
    var ov = root.querySelector('.ov'), panel = root.querySelector('.panel');
    var mountPanel = function () { if (!host.isConnected) document.body.appendChild(host); };

    var frame = null, lastFocus = null;
    var open = function () {
      mountPanel();
      if (!frame) {
        frame = document.createElement('iframe');
        frame.title = 'Kromatch';
        frame.allow = 'camera; clipboard-write';
        frame.src = BASE + '/embed?shop=' + encodeURIComponent(SHOP) + '&lang=' + encodeURIComponent(pageLang);
        panel.appendChild(frame);
      }
      lastFocus = document.activeElement;
      ov.classList.add('open');
      document.documentElement.style.overflow = 'hidden';
      root.querySelector('.x').focus();
    };
    var close = function () {
      ov.classList.remove('open');
      document.documentElement.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    root.querySelector('.x').addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ov.classList.contains('open')) close(); });
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest && e.target.closest('.kromatch-open, [data-kromatch-open]');
      if (a) { e.preventDefault(); open(); }
    });

    /* ---------- Adding to THIS website's cart ---------- */
    function detectPlatform(hint) {
      if (window.Shopify && window.Shopify.shop) return 'shopify';
      if (window.wc || window.wc_add_to_cart_params || window.wcSettings || document.querySelector('link[href*="woocommerce"],script[src*="woocommerce"]') ||
          (document.body && /\bwoocommerce\b/.test(document.body.className))) return 'woocommerce';
      return hint || null;
    }
    function cartUrl(platform, hint) {
      var own = script.getAttribute('data-cart-url') || hint;
      if (own) return own;
      if (platform === 'shopify') return ((window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/') + 'cart';
      if (window.wc_add_to_cart_params && window.wc_add_to_cart_params.cart_url) return window.wc_add_to_cart_params.cart_url;
      return '/cart/';
    }
    function shopifyAdd(items, src) {
      var rootPath = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
      var one = function (it) {
        return fetch(rootPath + 'cart/add.js', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ items: [{ id: Number(it.id), quantity: it.qty, properties: { _kromatch: src === 'app' ? 'app' : '1' } }] }) })
          .then(function (r) { return r.ok ? { ok: true } : r.json().then(function (j) { return { ok: false, reason: j.description || j.message || ('error ' + r.status) }; }, function () { return { ok: false, reason: 'error ' + r.status }; }); });
      };
      // one at a time, so a sold-out colour doesn't stop the rest
      return items.reduce(function (p, it) {
        return p.then(function (res) { return one(it).then(function (x) { (x.ok ? res.added : res.failed).push(x.ok ? it.id : { id: it.id, reason: x.reason }); return res; }); });
      }, Promise.resolve({ added: [], failed: [] })).then(function (res) {
        try { document.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true })); } catch (e) {}
        return res;
      });
    }
    function wpRoot() {
      var l = document.querySelector('link[rel="https://api.w.org/"]');
      return ((l && l.href) || (location.origin + '/wp-json/')).replace(/\/?$/, '/');
    }
    function wooAdd(items) {
      var api = wpRoot() + 'wc/store/v1/';
      var nonce = null;   // the shop's own cart session (cookie) is used, so the cans land in the visitor's normal cart
      var hdrs = function () {
        var h = { 'Content-Type': 'application/json', Accept: 'application/json' };
        if (nonce) { h.Nonce = nonce; h['X-WC-Store-API-Nonce'] = nonce; }
        return h;
      };
      var grab = function (r) { nonce = r.headers.get('Nonce') || r.headers.get('X-WC-Store-API-Nonce') || nonce; return r; };
      var classic = function (it) {   // older shops: the standard ?add-to-cart= link
        return fetch(location.origin + '/?add-to-cart=' + encodeURIComponent(it.id) + '&quantity=' + it.qty, { credentials: 'same-origin', redirect: 'follow' })
          .then(function (r) { return r.ok ? { ok: true } : { ok: false, reason: 'error ' + r.status }; }, function () { return { ok: false, reason: 'network' }; });
      };
      var storeApi = true;
      var one = function (it) {
        if (!storeApi) return classic(it);
        return fetch(api + 'cart/add-item', { method: 'POST', credentials: 'same-origin', headers: hdrs(), body: JSON.stringify({ id: Number(it.id), quantity: it.qty }) })
          .then(grab).then(function (r) {
            if (r.ok) return { ok: true };
            if (r.status === 404) { storeApi = false; return classic(it); }
            return r.json().then(function (j) { return { ok: false, reason: (j && (j.message || j.code)) || ('error ' + r.status) }; }, function () { return { ok: false, reason: 'error ' + r.status }; });
          }, function () { storeApi = false; return classic(it); });
      };
      return fetch(api + 'cart', { credentials: 'same-origin', headers: { Accept: 'application/json' } })
        .then(function (r) { if (r.status === 404) storeApi = false; return grab(r); }, function () { storeApi = false; })
        .then(function () {
          return items.reduce(function (p, it) {
            return p.then(function (res) { return one(it).then(function (x) { (x.ok ? res.added : res.failed).push(x.ok ? it.id : { id: it.id, reason: x.reason }); return res; }); });
          }, Promise.resolve({ added: [], failed: [] }));
        }).then(function (res) {
          try { if (window.jQuery) window.jQuery(document.body).trigger('wc_fragment_refresh'); } catch (e) {}
          return res;
        });
    }

    window.addEventListener('message', function (e) {
      if (e.origin !== BASE || !frame || e.source !== frame.contentWindow) return;
      var d = e.data || {};
      if (d.type === 'kromatch:close') close();
      else if (d.type === 'kromatch:go-cart') location.href = cartUrl(detectPlatform(d.platform), d.cartUrl);
      else if (d.type === 'kromatch:hello') frame.contentWindow.postMessage({ type: 'kromatch:host', platform: detectPlatform(null), ref: d.ref }, BASE);
      else if (d.type === 'kromatch:add') {
        var platform = detectPlatform(d.platform);
        var items = (d.items || []).filter(function (it) { return it && it.id && it.qty > 0; }).map(function (it) { return { id: String(it.id), qty: Math.min(99, Math.round(it.qty)) }; });
        var reply = function (res) {
          frame.contentWindow.postMessage({ type: 'kromatch:added', ref: d.ref, added: res.added, failed: res.failed, error: res.error || null,
            cartUrl: cartUrl(platform, d.cartUrl) }, BASE);
        };
        // a shop on another system can handle it itself: window.KromatchCart = function (items) { ...; return { added: [ids], failed: [] } }
        var job = typeof window.KromatchCart === 'function' ? Promise.resolve(window.KromatchCart(items))
          : platform === 'shopify' ? shopifyAdd(items, 'widget') : platform === 'woocommerce' ? wooAdd(items) : null;
        if (!job) { reply({ added: [], failed: [], error: 'unsupported' }); return; }
        job.then(function (res) { remember(res.added || [], items, 'widget'); reply(res); }, function (err) { reply({ added: [], failed: [], error: String(err && err.message || err) }); });
      }
    });

    /* ---------- Counting sales: which orders on this website contained cans added through Kromatch ----------
       Only the order number, its total and the product ids/quantities are sent: never a name, email or address. */
    var TKEY = 'kromatch:added:' + SHOP, SKEY = 'kromatch:snap:' + SHOP, DAY = 864e5;
    var lsGet = function (k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
    var lsSet = function (k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
    var remember = function (ids, items, src) {
      if (!ids.length) return;
      var a = lsGet(TKEY); if (!a || Date.now() - a.t > 30 * DAY) a = { ids: {}, t: 0 };
      if (!a.src) a.src = {};
      ids.forEach(function (id) { var it = items.filter(function (x) { return x.id === String(id); })[0]; a.ids[String(id)] = (a.ids[String(id)] || 0) + (it ? it.qty : 1);
        if (src === 'app') a.src[String(id)] = 'app'; });
      a.t = Date.now(); lsSet(TKEY, a);
    };
    var report = function (o) {
      try {
        fetch(BASE + '/api/convert', { method: 'POST', keepalive: true, mode: 'cors', headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ shop: SHOP, ref: o.ref, total: o.total, currency: o.currency, platform: o.platform, source: o.source || 'widget',
            items: o.items.map(function (i) { return { id: i.id, qty: i.qty, price: i.price }; }) }) });
      } catch (e) {}
    };
    var money = function (txt) {     // "1.234,50 EUR", "EUR62.50" -> 1234.5 / 62.5
      var m = String(txt || '').replace(/[^0-9.,]/g, ''); if (!m) return null;
      var last = Math.max(m.lastIndexOf(','), m.lastIndexOf('.'));
      if (last >= 0 && m.length - last - 1 === 2) m = m.slice(0, last).replace(/[.,]/g, '') + '.' + m.slice(last + 1); else m = m.replace(/[.,]/g, '');
      var n = Number(m); return isFinite(n) ? n : null;
    };
    var track = function () {
      var added = lsGet(TKEY);
      if (!added || Date.now() - added.t > 30 * DAY) { lsSet(TKEY, null); lsSet(SKEY, null); return; }
      if (detectPlatform(null) !== 'woocommerce') return;     // Shopify: the checkout reports it (Customer events snippet)
      var done = location.pathname.match(/order-received\/(\d+)/) || (document.body && /\bwoocommerce-order-received\b/.test(document.body.className));
      if (done) {
        var snap = lsGet(SKEY);
        var refEl = document.querySelector('.woocommerce-order-overview__order strong, .order-number, .wc-block-order-confirmation-summary-list-item__value');
        var ref = (Array.isArray(done) && done[1]) || (refEl && refEl.textContent.trim()) || '';
        var totEl = document.querySelector('.woocommerce-order-overview__total .amount, .woocommerce-order-overview__total, .order-total .amount');
        if (snap && snap.items && snap.items.length && ref) {
          report({ ref: ref, total: money(totEl && totEl.textContent) || snap.total, currency: snap.currency, platform: 'woocommerce', items: snap.items,
            source: snap.items.some(function (i) { return i.src === 'app'; }) ? 'app' : 'widget' });
        }
        lsSet(TKEY, null); lsSet(SKEY, null);
        return;
      }
      // any other page (cart, checkout...): note which Kromatch cans are in the cart right now
      fetch(wpRoot() + 'wc/store/v1/cart', { credentials: 'same-origin', headers: { Accept: 'application/json' } })
        .then(function (r) { return r.ok ? r.json() : null; }).then(function (c) {
          if (!c || !c.items) return;
          var items = c.items.filter(function (i) { return added.ids[String(i.id)]; }).map(function (i) {
            var minor = (i.prices && i.prices.currency_minor_unit) || 2;
            return { id: String(i.id), qty: Math.min(i.quantity, added.ids[String(i.id)]), price: i.prices && i.prices.price ? Number(i.prices.price) / Math.pow(10, minor) : null,
              src: added.src && added.src[String(i.id)] === 'app' ? 'app' : 'widget' };
          });
          var tminor = (c.totals && c.totals.currency_minor_unit) || 2;
          lsSet(SKEY, { items: items, total: c.totals && c.totals.total_price ? Number(c.totals.total_price) / Math.pow(10, tminor) : null,
            currency: c.totals && c.totals.currency_code, t: Date.now() });
        }, function () {});
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', track); else track();

    /* ---------- Cans sent from the Kromatch app: ?kromatch_cart=... puts them into THIS website's cart ----------
       The Kromatch app sends a shopper here with the list (product ids and quantities only); the cans go into their
       normal cart on this website and they check out here as usual. Counted as source 'app'. */
    var handoff = function () {
      var raw = null;
      try { raw = new URLSearchParams(location.search).get('kromatch_cart'); } catch (e) {}
      if (!raw) return;
      var d = null;
      try { d = JSON.parse(decodeURIComponent(escape(atob(raw.replace(/-/g, '+').replace(/_/g, '/'))))); } catch (e) {}
      try { var u = new URL(location.href); u.searchParams.delete('kromatch_cart'); history.replaceState(null, '', u.pathname + u.search + u.hash); } catch (e) {}
      if (!d || d.s !== SHOP || !Array.isArray(d.i)) return;
      var items = d.i.slice(0, 60).map(function (x) { return { id: String(x && x[0] || '').replace(/\D/g, ''), qty: Math.max(1, Math.min(99, Math.round(Number(x && x[1]) || 1))) }; })
        .filter(function (x) { return x.id; });
      if (!items.length) return;
      var box = document.createElement('div'); box.setAttribute('data-kromatch', 'handoff');
      var sr = box.attachShadow ? box.attachShadow({ mode: 'open' }) : box;
      sr.innerHTML = '<style>:host{all:initial}.w{position:fixed;inset:0;z-index:2147483647;background:rgba(20,20,20,.55);display:flex;align-items:center;justify-content:center;font-family:' + FONT + '}' +
        '.c{background:#fff;color:#141414;border-radius:16px;padding:22px 24px;max-width:340px;margin:16px;display:flex;gap:12px;align-items:center;box-shadow:0 8px 30px rgba(0,0,0,.3)}' +
        '.c .ico{width:34px;height:34px;flex:none}p{margin:0;font-size:15px;line-height:1.4;font-weight:600}button{margin-top:10px;font:700 14px ' + FONT + ';background:#141414;color:#fff;border:0;border-radius:999px;padding:8px 16px;cursor:pointer}</style>' +
        '<div class="w" role="status"><div class="c">' + ICON + '<div><p class="m">' + L.a + '</p></div></div></div>';
      document.body.appendChild(box);
      var platform = detectPlatform(null);
      var job = typeof window.KromatchCart === 'function' ? Promise.resolve(window.KromatchCart(items))
        : platform === 'shopify' ? shopifyAdd(items, 'app') : platform === 'woocommerce' ? wooAdd(items) : Promise.resolve({ added: [], failed: [] });
      var fail = function () {
        sr.querySelector('.m').textContent = L.af;
        var b = document.createElement('button'); b.type = 'button'; b.textContent = L.close; b.addEventListener('click', function () { box.remove(); });
        sr.querySelector('.m').parentNode.appendChild(b);
      };
      job.then(function (res) {
        var added = (res && res.added) || [];
        if (!added.length) { fail(); return; }
        remember(added, items, 'app');
        location.href = cartUrl(platform, null);
      }, fail);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', handoff); else handoff();

    /* ---------- Placements: banner, button, floating ---------- */
    var CSS = '<style>:host{all:initial;display:block}:host([data-style=button]){display:inline-block}' +
      '*{box-sizing:border-box}.k{font-family:' + FONT + ';-webkit-font-smoothing:antialiased}' +
      '.wm{font-weight:900;letter-spacing:.03em;font-stretch:112%;white-space:nowrap}.txt{text-align:left}' +
      '.ico{width:30px;height:30px;flex:none;border-radius:7px}' +
      '.kbtn{display:inline-flex;align-items:center;gap:10px;background:#141414;color:#F1EFEA;border:2px solid #141414;border-radius:999px;' +
      'padding:7px 18px 7px 8px;font:700 15px/1.15 ' + FONT + ';cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.18);transition:transform .12s, background .12s}' +
      '.kbtn:hover{transform:translateY(-1px);background:#000}.kbtn:focus-visible{outline:3px solid #1FA6A0;outline-offset:3px}' +
      '.light .kbtn{background:#F1EFEA;color:#141414}.light .kbtn:hover{background:#fff}' +
      '.cta{background:#1FA6A0;border-color:#1FA6A0;color:#141414;font-size:16px;padding:8px 22px 8px 8px}.cta:hover{background:#25b8b1}' +
      '.float{position:fixed;right:18px;bottom:18px;z-index:2147483000;padding:7px 16px 7px 7px}' +
      '@media (max-width:560px){.float{padding:6px}.float .txt{display:none}.kbtn{font-size:14px}}' +
      '.banner{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:26px;align-items:center;background:#141414;color:#F1EFEA;border-radius:20px;padding:30px 32px}' +
      '.light .banner{background:#F1EFEA;color:#141414;border:2px solid #141414}' +
      '.eyebrow{display:flex;align-items:center;gap:8px;font-size:13px;opacity:.85;margin:0 0 10px}.eyebrow .ico{width:22px;height:22px}' +
      '.banner h2{margin:0 0 10px;font-size:clamp(22px,2.6vw,32px);line-height:1.1;font-weight:900;font-stretch:108%}' +
      '.banner p{margin:0 0 18px;font-size:16px;line-height:1.45;opacity:.82}' +
      '.fine{margin:12px 0 0;font-size:12px;line-height:1.35;opacity:.7}' +
      '.bwrap{display:inline-flex;flex-direction:column;align-items:center;gap:5px}.cap{font:500 11px/1.25 ' + FONT + ';color:#5A5B5E;text-align:center}' +
      '.steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}' +
      '.steps li{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;font-size:14px;font-weight:700;line-height:1.25}' +
      '.steps svg{width:100%;max-width:96px;height:auto;color:currentColor}' +
      '.num{display:inline-flex;width:20px;height:20px;border-radius:50%;background:#1FA6A0;color:#141414;font-size:12px;align-items:center;justify-content:center;margin-right:4px}' +
      '@media (max-width:700px){.banner{grid-template-columns:1fr;padding:24px 20px;gap:20px}.steps{order:-1}}</style>';
    var btnHtml = function (cls, label) {
      return '<button type="button" class="kbtn ' + cls + '">' + ICON + '<span class="txt">' +
        (label ? escapeHtml(label) : L.pre + ' <span class="wm">KROMATCH</span>') + '</span></button>';
    };
    var escapeHtml = function (x) { return String(x).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); };
    var render = function (el, style, theme, label, note) {
      if (el.__kromatch) return; el.__kromatch = true;
      var sh = el.attachShadow ? el.attachShadow({ mode: 'open' }) : el;
      el.setAttribute('data-style', style);
      var inner = style === 'banner'
        ? '<div class="banner"><div><div class="eyebrow">' + ICON + '<span class="wm">KROMATCH</span></div><h2>' + L.h + '</h2><p>' + L.p + '</p>' +
          btnHtml('cta', label) + '<p class="fine">' + L.d + '</p></div><ol class="steps">' + L.s.map(function (x, i) { return '<li>' + STEP_ART[i] + '<span><span class="num">' + (i + 1) + '</span>' + x + '</span></li>'; }).join('') + '</ol></div>'
        : style === 'floating' ? btnHtml('float', label)
        : (note === 'off' ? btnHtml('', label) : '<span class="bwrap">' + btnHtml('', label) + '<span class="cap">' + L.d + '</span></span>');
      sh.innerHTML = CSS + '<div class="k' + (theme === 'light' ? ' light' : '') + '">' + inner + '</div>';
      sh.querySelector('.kbtn').addEventListener('click', open);
    };
    var styleOf = function (el) {
      var st = el.getAttribute('data-style');
      if (!st) { var b = el.getAttribute('data-button'); st = b === 'floating' ? 'floating' : b === 'none' ? 'none' : 'button'; }
      return st;
    };
    var placeScript = function (sc) {
      if (sc.__kromatch) return; sc.__kromatch = true;
      var st = styleOf(sc);
      if (st === 'none') return;
      var target = sc.getAttribute('data-target') && document.querySelector(sc.getAttribute('data-target'));
      var el = document.createElement('div');
      if (target) target.appendChild(el);
      else if (st !== 'floating' && sc.parentNode && sc.parentNode !== document.head) sc.parentNode.insertBefore(el, sc.nextSibling);
      else document.body.appendChild(el);
      render(el, st, sc.getAttribute('data-theme'), sc.getAttribute('data-label'), sc.getAttribute('data-note'));
    };
    var scan = function () {
      [].forEach.call(document.querySelectorAll('.kromatch-banner, .kromatch-button, [data-kromatch-banner], [data-kromatch-button]'), function (el) {
        var banner = el.matches('.kromatch-banner, [data-kromatch-banner]');
        render(el, banner ? 'banner' : 'button', el.getAttribute('data-theme'), el.getAttribute('data-label'), el.getAttribute('data-note'));
      });
    };
    var placed = false;
    var placeAll = function (sc) {
      // the script itself only becomes a button when the page has no Kromatch spots of its own
      var spots = document.querySelector('.kromatch-banner, .kromatch-button, [data-kromatch-banner], [data-kromatch-button]');
      if (sc && (!spots || sc.hasAttribute('data-style') || sc.hasAttribute('data-button'))) placeScript(sc);
      scan(); placed = true;
    };

    window.Kromatch = { open: open, close: close, _ready: true, _place: placeAll };
  }

  var go = function () { window.Kromatch._place(script); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
