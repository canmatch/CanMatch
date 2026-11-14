// Kromatch quick checks: run with  node tests/check.mjs  (no installs needed)
// Catches the mistakes that break the app for everyone: a typo in the code, a missing translation,
// broken colour data, a file the offline mode needs but isn't uploaded, wrong security headers.
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
const root = new URL('..', import.meta.url).pathname;
const read = f => readFileSync(root + f, 'utf8');
let failed = 0;
const ok = (cond, msg) => { if (cond) console.log('  ok   ' + msg); else { failed++; console.log('  FAIL ' + msg); } };

console.log('Code');
for (const page of ['index.html', 'dashboard.html', 'privacy.html']) {
  if (!existsSync(root + page)) { ok(false, `${page} exists`); continue; }
  const html = read(page);
  const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  blocks.forEach((code, i) => {
    try { new vm.Script(code, { filename: `${page} script ${i + 1}` }); ok(true, `${page}: script ${i + 1} has no syntax errors`); }
    catch (e) { ok(false, `${page}: script ${i + 1}: ${e.message}`); }
  });
}
const sandbox = { window: {} };
for (const f of ['colors.js', 'shops.js', 'config.js']) {
  try { vm.runInNewContext(read(f), sandbox, { filename: f }); ok(true, `${f} loads`); } catch (e) { ok(false, `${f}: ${e.message}`); }
}
const W = sandbox.window, CFG = W.KROMATCH_CONFIG || {};

console.log('Colour data');
const lines = W.PAINT_DATA || [];
ok(lines.length >= 5, `${lines.length} paint lines`);
for (const l of lines) {
  const bad = l.colors.filter(c => !/^#[0-9a-f]{6}$/i.test(c.hex || ''));
  const codes = l.colors.map(c => c.code).filter(Boolean), dup = codes.filter((c, i) => codes.indexOf(c) !== i);
  ok(!bad.length && !dup.length && ['low', 'high', 'medium'].includes(l.pressure),
    `${l.brand}: ${l.colors.length} colours${bad.length ? `, bad hex: ${bad.map(c => c.name).join(', ')}` : ''}${dup.length ? `, duplicate codes: ${dup.join(', ')}` : ''}`);
}

console.log('Settings');
ok(/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(CFG.supabaseUrl || ''), 'config.js: Supabase address looks right');
ok(/^sb_publishable_|^eyJ/.test(CFG.supabaseKey || '') && !/^sb_secret_/.test(CFG.supabaseKey || ''), 'config.js: uses the PUBLIC key (never the secret one)');
ok(!/service_role|sb_secret_/.test(read('config.js') + read('index.html') + read('dashboard.html')), 'no secret keys anywhere in the website');
ok(!CFG.vapidPublicKey || /^[A-Za-z0-9_-]{87}$/.test(CFG.vapidPublicKey), 'config.js: notification key is empty or the right length');
ok(!CFG.turnstileSiteKey || /^0x/.test(CFG.turnstileSiteKey), 'config.js: bot-check site key is empty or starts with 0x');

console.log('Translations');
const html = read('index.html');
const T = vm.runInNewContext('(' + html.slice(html.indexOf('const T = {') + 10, html.indexOf('\n};', html.indexOf('const T = {')) + 2) + ')', {});
const langs = CFG.languages || ['en'];
for (const lg of langs) {
  const missing = Object.keys(T.en).filter(k => T[lg] && T[lg][k] === undefined);
  ok(T[lg] && !missing.length, `app ${lg}: ${missing.length ? 'missing ' + missing.slice(0, 12).join(', ') + (missing.length > 12 ? '…' : '') : 'complete'}`);
}
const used = [...html.matchAll(/data-i18n(?:-ph)?="([^"]+)"/g)].map(m => m[1]);
const unknown = [...new Set(used.filter(k => T.en[k] === undefined))];
ok(!unknown.length, `app: every on-screen label has text${unknown.length ? ' (missing: ' + unknown.join(', ') + ')' : ''}`);
const dash = read('dashboard.html');
const TX = vm.runInNewContext('(' + dash.slice(dash.indexOf('const TX = {') + 11, dash.indexOf('\n};', dash.indexOf('const TX = {')) + 2) + ')', {});
const dUsed = [...new Set([...dash.matchAll(/data-t="([^"]+)"/g)].map(m => m[1]))];
ok(dUsed.every(k => TX.en[k] !== undefined), 'dashboard: every label has English text');
const dMissing = Object.keys(TX.en).filter(k => TX.el[k] === undefined);
ok(!dMissing.length, `dashboard Greek: ${dMissing.length ? 'missing ' + dMissing.slice(0, 10).join(', ') : 'complete'}`);

console.log('Files');
const sw = read('sw.js');
const core = [...sw.matchAll(/'\.\/([^']*)'/g)].map(m => m[1]).filter(Boolean);
const missingFiles = core.filter(f => !existsSync(root + f));
ok(!missingFiles.length, `offline files all uploaded${missingFiles.length ? ' (missing: ' + missingFiles.join(', ') + ')' : ''}`);
const headers = existsSync(root + '_headers') ? read('_headers') : '';
ok(headers.includes('Content-Security-Policy') && headers.includes(new URL(CFG.supabaseUrl || 'https://x').host), '_headers: security policy allows your Supabase project');
const v = [...html.matchAll(/src="(colors|shops|config)\.js\?v=([^"]+)"/g)].map(m => m[2]);
ok(v.length === 3 && new Set(v).size === 1, 'index.html: all script versions match');

console.log(failed ? `\n${failed} problem(s) found` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
