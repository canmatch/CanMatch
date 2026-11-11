// ------------------------------------------------------------------
// CANMATCH SHOPS - DEMO SHOPS FOR TESTING
// Made-up shops so testers never contact a real business. Stock and
// prices are realistic examples based on real listings (November 2026).
// A city can have several shops. Each can in the cart is bought from
// the first shop in the city that sells its line.
//
// city:     must match a city key in index.html (CITIES list)
// lines:    paint lines the shop sells, spelled exactly as the
//           "brand" names in colors.js
// prices:   price per can for each line, in the shop's currency.
//           null = price not confirmed (shown as "Price at shop").
// delivery: null = pickup only. Otherwise { fee, freeOver, note }:
//           fee = delivery charge, freeOver = order total above which
//           delivery is free (null = never free). Spray cans are dangerous
//           goods, so delivery is ground/courier only. Example values.
// ------------------------------------------------------------------
window.SHOPS = [
  {
    name: "Graffiti Shop Athens",
    delivery: { fee: 4.00, freeOver: 60, note: "courier, within Greece" },
    city: "athens",
    demo: true,
    currency: "EUR",
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange"],
    prices: {
      "MTN 94": 5.30,           // Athens graffiti shop listing
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
    delivery: { fee: 15.00, freeOver: 150, note: "ground shipping, within Canada" },
    city: "toronto",
    demo: true,
    currency: "CAD",
    lines: ["Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange", "Ironlak", "Ironlak Sugar"],
    prices: {
      "Montana GOLD": 9.00,     // Toronto graffiti shop listing
      "Montana BLACK": 8.99,
      "Molotow Premium": 9.00,
      "Flame Blue": 8.00,
      "Flame Orange": 8.99,
      "Ironlak": null,          // no Canadian price found yet
      "Ironlak Sugar": null
    }
  },
  {
    name: "Canadian Hardware Store",
    delivery: null,
    city: "toronto",
    demo: true,
    currency: "CAD",
    lines: ["Krylon Fusion All-In-One", "Krylon COLORmaxx"],
    prices: {
      "Krylon Fusion All-In-One": 16.99, // Canadian Tire, 340 g, November 2026
      "Krylon COLORmaxx": null           // no Canadian price found yet
    }
  },
  {
    name: "Graffiti Shop New York",
    delivery: { fee: 12.00, freeOver: 125, note: "ground shipping, within the US" },
    city: "newyork",
    demo: true,
    currency: "USD",
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange", "Ironlak", "Ironlak Sugar"],
    prices: {
      "MTN 94": 9.35,           // Flax Art (US art store), November 2026
      "MTN Hardcore": 10.50,    // Flax Art (US art store), November 2026
      "Montana GOLD": 8.95,     // Art Primo (US graffiti shop), most colours
      "Montana BLACK": 7.95,    // Art Primo (US graffiti shop)
      "Molotow Premium": 8.95,  // Bombing Science (US/Canada graffiti shop), summer 2026
      "Flame Blue": 6.19,       // Bombing Science, summer 2026
      "Flame Orange": 6.19,     // Bombing Science, summer 2026
      "Ironlak": 5.99,          // Hobby Lobby (US), Lak Gloss Acrylic
      "Ironlak Sugar": null     // no US price found yet
    }
  },
  {
    name: "American Hardware Store",
    delivery: null,
    city: "newyork",
    demo: true,
    currency: "USD",
    lines: ["Krylon Fusion All-In-One", "Krylon COLORmaxx"],
    prices: {
      "Krylon Fusion All-In-One": 8.59,  // Ace Hardware, 12 oz, November 2026
      "Krylon COLORmaxx": 5.99           // Ace Hardware, 12 oz, November 2026
    }
  }
];
