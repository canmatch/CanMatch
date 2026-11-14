// Kromatch connection settings (public: safe to publish; the database's security rules protect the data)
window.KROMATCH_CONFIG = {
  supabaseUrl: 'https://efuzxqdnzblsvnflqmwf.supabase.co',
  supabaseKey: 'sb_publishable_tOUPS-TQVM7dtt17pSeo4Q_7ytmPlP9',
  functionsUrl: 'https://efuzxqdnzblsvnflqmwf.supabase.co/functions/v1',
  google: false,   // switch to true once "Sign in with Google" is set up in Supabase
  apple: false,    // switch to true once "Sign in with Apple" is set up (needs an Apple Developer account)

  // Bot protection on orders (Cloudflare Turnstile). Paste your SITE key here (the public one, starting 0x...).
  // Leave empty to switch it off. The SECRET key goes only into Supabase secrets as TURNSTILE_SECRET.
  turnstileSiteKey: '',
  // Phone notifications ("your cans are ready"). Paste the PUBLIC notification key from the dashboard here.
  // Leave empty to hide the button. The private key goes only into Supabase secrets as VAPID_PRIVATE_KEY.
  vapidPublicKey: '',

  // Cities and languages shown in the app. Everything else stays built in, just hidden.
  // To bring one back, add its key here. All cities: athens, thessaloniki, paris, berlin, barcelona,
  // lisbon, milan, amsterdam, london, toronto, montreal, halifax, newyork, losangeles, mexicocity, saopaulo
  // All languages: en, el, fr, de, es, it, pt
  cities: ['athens', 'toronto', 'newyork', 'halifax'],
  languages: ['en', 'el', 'fr']
};
