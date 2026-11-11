// ------------------------------------------------------------------
// CANMATCH SHOPS (one shop per city) - DEMO SHOPS FOR TESTING
// These are made-up shops so testers never contact a real business.
// Stock and prices are realistic examples, based on real Athens and
// Toronto shop listings from November 2026.
//
// city:     must match a city key in index.html (CITIES list)
// lines:    paint lines the shop sells, spelled exactly as the
//           "brand" names in colors.js. Other lines show as
//           unavailable in the cart.
// prices:   price per 400ml can for each line, in the shop's currency.
//           null = price not confirmed (shown as "Price at shop").
// To feature a real partner shop later, fill in name, area, address,
// maps and website, and update lines and prices.
// ------------------------------------------------------------------
window.SHOPS = [
  {
    name: "Graffiti Shop Athens",
    city: "athens",
    demo: true,
    area: "",
    address: "",
    phone: "",
    website: "",
    maps: "",
    currency: "EUR",
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange"],
    prices: {
      "MTN 94": 5.30,
      "MTN Hardcore": 4.50,
      "Montana GOLD": 5.30,
      "Montana BLACK": 4.70,
      "Molotow Premium": 4.90,
      "Flame Blue": 3.90,
      "Flame Orange": 3.70
    }
  },
  {
    name: "Graffiti Shop Toronto",
    city: "toronto",
    demo: true,
    area: "",
    address: "",
    phone: "",
    website: "",
    maps: "",
    currency: "CAD",
    lines: ["Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange"],
    prices: {
      "Montana GOLD": 9.00,
      "Montana BLACK": 8.99,
      "Molotow Premium": 9.00,
      "Flame Blue": 8.00,
      "Flame Orange": 8.99
    }
  }
];
