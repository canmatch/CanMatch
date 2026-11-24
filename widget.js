/* Kromatch website widget
   Paste on the shop's website:
     <script src="https://kromatch.com/widget.js" data-shop="your-shop" async></script>
   Options (all optional):
     data-button="inline"    a button where the script is placed (default)
     data-button="floating"  a round button in the bottom corner of the page
     data-button="none"      no button: open it from your own links with class="kromatch-open" or Kromatch.open()
     data-label="\u2026"          button text (default depends on the page language)
     data-target="#id"       put the button inside this element instead of where the script is
     data-cart-url="/cart"   your cart page, if it isn't the usual one
   What it does: opens Kromatch in a panel on this page, locked to this shop's colours, stock and prices.
   "Add to cart" puts the cans into THIS website's cart (Shopify or WooCommerce, or your own window.KromatchCart). */
(function () {
  'use strict';
  if (window.Kromatch && window.Kromatch._ready) return;
  var script = document.currentScript || document.querySelector('script[src*="widget.js"][data-shop]');
  if (!script) return;
  var BASE = new URL(script.src, location.href).origin;
  var SHOP = (script.getAttribute('data-shop') || '').trim();
  if (!SHOP) { console.warn('[Kromatch] data-shop is missing'); return; }
  var MODE = script.getAttribute('data-button') || 'inline';
  var pageLang = (script.getAttribute('data-lang') || document.documentElement.lang || navigator.language || 'en').slice(0, 2).toLowerCase();
  var LABELS = { en: 'Match colours', el: '\u03a4\u03b1\u03af\u03c1\u03b9\u03b1\u03be\u03b5 \u03c7\u03c1\u03ce\u03bc\u03b1\u03c4\u03b1', fr: 'Trouver mes couleurs', de: 'Farben finden', es: 'Encuentra tus colores', it: 'Trova i colori', pt: 'Encontrar cores' };
  var CLOSE = { en: 'Close', el: '\u039a\u03bb\u03b5\u03af\u03c3\u03b9\u03bc\u03bf', fr: 'Fermer', de: 'Schlie\u00dfen', es: 'Cerrar', it: 'Chiudi', pt: 'Fechar' };
  var label = script.getAttribute('data-label') || LABELS[pageLang] || LABELS.en;

  var ICON = '<svg viewBox="0 0 100 100" width="22" height="22" aria-hidden="true"><g transform="rotate(-12 50 50)">' +
    '<rect x="40" y="10" width="20" height="12" rx="3" fill="currentColor"/><path d="M30 38 Q30 22 50 22 Q70 22 70 38 Z" fill="currentColor"/>' +
    '<rect x="27" y="36" width="46" height="54" rx="9" fill="currentColor"/></g></svg>';

  // Everything lives in a shadow root, so the shop's styles and ours never clash
  var host = document.createElement('div'); host.setAttribute('data-kromatch', '');
  var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
  root.innerHTML = '<style>' +
    ':host{all:initial}' +
    '.kbtn{display:inline-flex;align-items:center;gap:8px;font:600 15px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;' +
    'background:#0f8f86;color:#fff;border:0;border-radius:999px;padding:12px 18px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.18)}' +
    '.kbtn:hover{background:#0c7a72}.kbtn:focus-visible{outline:3px solid #f5b700;outline-offset:2px}' +
    '.float{position:fixed;right:18px;bottom:18px;z-index:2147483000}' +
    '.ov{position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.45);display:none}' +
    '.ov.open{display:block}' +
    '.panel{position:absolute;top:0;right:0;height:100%;width:min(480px,100%);background:#fff;box-shadow:-4px 0 24px rgba(0,0,0,.25);display:flex;flex-direction:column}' +
    '.bar{display:flex;justify-content:flex-end;padding:6px 8px;background:#111;}' +
    '.x{font:600 14px system-ui,sans-serif;background:transparent;color:#fff;border:0;padding:8px 10px;cursor:pointer;border-radius:8px}' +
    '.x:focus-visible{outline:2px solid #f5b700}' +
    'iframe{flex:1;width:100%;border:0;background:#fff}' +
    '@media (max-width:560px){.panel{width:100%}}' +
    '</style>' +
    (MODE === 'none' ? '' : '<button type="button" class="kbtn' + (MODE === 'floating' ? ' float' : '') + '">' + ICON + '<span></span></button>') +
    '<div class="ov" role="dialog" aria-modal="true" aria-label="Kromatch"><div class="panel"><div class="bar">' +
    '<button type="button" class="x">\u2715 ' + (CLOSE[pageLang] || CLOSE.en) + '</button></div></div></div>';
  var btn = root.querySelector('.kbtn');
  if (btn) btn.querySelector('span').textContent = label;
  var ov = root.querySelector('.ov'), panel = root.querySelector('.panel');

  var targetSel = script.getAttribute('data-target');
  var target = targetSel && document.querySelector(targetSel);
  function mount() {
    if (host.isConnected) return;
    if (target) target.appendChild(host);
    else if (MODE === 'inline' && script.parentNode && script.parentNode !== document.head) script.parentNode.insertBefore(host, script.nextSibling);
    else document.body.appendChild(host);
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  var frame = null, lastFocus = null;
  function open() {
    mount();
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
  }
  function close() {
    ov.classList.remove('open');
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (btn) btn.addEventListener('click', open);
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
  function shopifyAdd(items) {
    var rootPath = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
    var one = function (it) {
      return fetch(rootPath + 'cart/add.js', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: [{ id: Number(it.id), quantity: it.qty, properties: { _kromatch: '1' } }] }) })
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
        : platform === 'shopify' ? shopifyAdd(items) : platform === 'woocommerce' ? wooAdd(items) : null;
      if (!job) { reply({ added: [], failed: [], error: 'unsupported' }); return; }
      job.then(reply, function (err) { reply({ added: [], failed: [], error: String(err && err.message || err) }); });
    }
  });

  window.Kromatch = { open: open, close: close, _ready: true };
})();
