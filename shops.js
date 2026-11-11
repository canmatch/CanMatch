// ------------------------------------------------------------------
// CANMATCH SHOPS (one shop per city)
// city:     must match a city key in index.html (CITIES list)
// lines:    paint lines the shop sells, spelled exactly as the
//           "brand" names in colors.js. Lines not listed show as
//           unavailable in the cart.
// prices:   price per 400ml can for each line, in the shop's currency.
//           null = price not confirmed yet (shown as "Price at shop").
// checked:  when and how the details were last confirmed.
// ------------------------------------------------------------------
window.SHOPS = [
  {
    name: "Revolt",
    city: "athens",
    area: "Monastiraki",
    address: "Agiou Filippou 4, 105 55 Athens",
    phone: "+30 210 324 6993",
    website: "https://revolt.gr",
    maps: "https://goo.gl/maps/oDUBSB9E6HsP1dYk9",
    currency: "EUR",
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange"],
    prices: {
      "MTN 94": 5.30,          // revolt.gr product listing, autumn 2026
      "MTN Hardcore": 4.50,    // revolt.gr MTN listing (older; confirm)
      "Montana GOLD": 5.30,    // revolt.gr product page, autumn 2026
      "Montana BLACK": 4.70,   // revolt.gr product page, autumn 2026
      "Molotow Premium": 4.90, // revolt.gr colour sprays page, autumn 2026
      "Flame Blue": 3.90,      // revolt.gr Flame Blue page, summer 2026
      "Flame Orange": 3.70     // revolt.gr colour sprays page, autumn 2026
    },
    checked: "November 2026, from the shop's own website"
  },
  {
    name: "Toronto Collective",
    city: "toronto",
    area: "Chinatown",
    address: "389 Spadina Ave, Toronto, ON M5T 2G6",
    phone: "+1 416-901-7007",
    website: "https://www.toronto-collective.com",
    maps: "https://www.google.com/maps/search/?api=1&query=389+Spadina+Ave+Toronto+ON+M5T+2G6",
    currency: "CAD",
    lines: ["Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange"],
    // Prices here vary by colour; these are the most common regular-colour price.
    prices: {
      "Montana GOLD": 9.00,    // toronto-collective.com (regular colours ~$9; fluo/chrome/100% colours cost more)
      "Montana BLACK": 8.99,   // toronto-collective.com (colours range $7.00 to $11.49)
      "Molotow Premium": 9.00, // toronto-collective.com (colours range $8.00 to $12.49)
      "Flame Blue": 8.00,      // toronto-collective.com (black and white $8.99)
      "Flame Orange": 8.99     // toronto-collective.com (some colours $8.00)
    },
    checked: "November 2026, from the shop's own website"
  }
];
