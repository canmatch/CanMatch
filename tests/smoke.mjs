// Kromatch browser smoke test: opens the app and the dashboard in a real (headless) browser,
// with the database faked, and checks the main screens work. Run: node tests/smoke.mjs
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname } from 'node:path';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = new URL('..', import.meta.url).pathname;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.css': 'text/css' };
const server = createServer((req, res) => {
  const f = root + (decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/, '/index.html')).slice(1);
  if (!existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[extname(f)] || 'application/octet-stream' }); res.end(readFileSync(f));
}).listen(8799);

const SHOP = { id: 'aaaaaaaa-0000-0000-0000-000000000001', name: 'Test Shop', city: 'athens', currency: 'EUR', delivery: null, is_demo: false, is_live: true, sort_order: 1 };
const fakeSupabase = `window.supabase={createClient:()=>({auth:{getSession:async()=>({data:{session:null}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),signInWithOtp:async()=>({error:null}),signOut:async()=>({})},from:()=>({select(){return this},eq(){return this},order(){return this},maybeSingle(){return this},then(r){r({data:[],error:null})}}),rpc:async()=>({data:false})})};`;
let failed = 0;
const check = (c, m) => { console.log((c ? '  ok   ' : '  FAIL ') + m); if (!c) failed++; };

const browser = await chromium.launch();
async function open(path) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, timezoneId: 'Europe/Athens', locale: 'en-GB' });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.route(/supabase\.co\/rest\/v1\/shops/, r => r.fulfill({ json: [SHOP] }));
  await page.route(/supabase\.co\/rest\/v1\/shop_lines/, r => r.fulfill({ json: [{ shop_id: SHOP.id, line: 'MTN 94', price: 5.3 }] }));
  await page.route(/supabase\.co\/rest\/v1\/(stock_out|price_overrides|events)/, r => r.fulfill({ json: [] }));
  await page.route(/supabase\.co\/functions/, r => r.fulfill({ json: { ok: true } }));
  await page.route(/cdn\.jsdelivr\.net/, r => r.fulfill({ contentType: 'text/javascript', body: fakeSupabase }));
  await page.route(/fonts\.(googleapis|gstatic)\.com|challenges\.cloudflare\.com/, r => r.fulfill({ body: '' }));
  await page.goto('http://127.0.0.1:8799/' + path);
  await page.waitForTimeout(800);
  return { page, errors };
}

console.log('App');
{
  const { page, errors } = await open('index.html');
  if (await page.isVisible('#welcomeStart')) await page.click('#welcomeStart');
  check(await page.isVisible('#empty'), 'home screen shows');
  await page.fill('#colorSearch', 'RV-241'); await page.waitForTimeout(400);
  const rows = await page.locator('#searchList .find-row').count();
  check(rows > 0, `search finds cans (${rows})`);
  check((await page.locator('#searchList').innerText()).includes('€5.30'), 'live shop price shown');
  await page.locator('#searchList .find-row .add').first().click();
  await page.click('#openList'); await page.waitForTimeout(300);
  check((await page.locator('#cartGroups .shop-group').count()) === 1, 'cart shows the can at the shop');
  for (const tab of ['#openDesign', '#openSettings', '#tabMatch']) { await page.click(tab); await page.waitForTimeout(150); }
  check(!errors.length, 'no errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
}
console.log('Dashboard');
{
  const { page, errors } = await open('dashboard.html');
  check(await page.isVisible('#loginView'), 'login screen shows');
  check(!errors.length, 'no errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
}
await browser.close(); server.close();
console.log(failed ? `\n${failed} problem(s) found` : '\nAll browser checks passed');
process.exit(failed ? 1 : 0);
