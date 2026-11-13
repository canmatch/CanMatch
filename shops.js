// ------------------------------------------------------------------
// CANMATCH SHOPS - DEMO SHOPS FOR TESTING
// Made-up shop names, so testers never contact a real business.
// Each demo shop's lines and prices are based on a real graffiti shop
// in (or serving) that city, checked November 2026. Sources are noted.
//
// city:     must match a city key in index.html (CITIES list)
// lines:    paint lines the shop sells, spelled exactly as the
//           "brand" names in colors.js
// prices:   price per 400 ml can, in the shop's currency.
//           null = sold, but price not confirmed ("Price at shop").
// delivery: null = pickup only. Otherwise { fee, freeOver, note }.
//           Example values. Spray cans ship by ground/courier only.
// ------------------------------------------------------------------
window.SHOPS = [
  {
    name: "Graffiti Shop Athens", city: "athens", demo: true, currency: "EUR",
    delivery: { fee: 4.00, freeOver: 60, note: "courier, within Greece" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange"],
    prices: { "MTN 94": 5.30, "MTN Hardcore": 4.50, "Montana GOLD": 5.30, "Montana BLACK": 4.70,
              "Molotow Premium": 4.90, "Flame Blue": 3.90, "Flame Orange": 3.70 }
    // Based on an Athens graffiti shop (Monastiraki) website listings.
  },
  {
    name: "Graffiti Shop Thessaloniki", city: "thessaloniki", demo: true, currency: "EUR",
    delivery: { fee: 4.00, freeOver: 60, note: "courier, within Greece" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange"],
    prices: { "MTN 94": 5.30, "MTN Hardcore": 4.50, "Montana GOLD": 5.30, "Montana BLACK": 4.70,
              "Molotow Premium": 4.90, "Flame Blue": 3.90, "Flame Orange": 3.70 }
    // Greek graffiti shop prices (same Greek retail source as Athens).
  },
  {
    name: "Graffiti Shop Paris", city: "paris", demo: true, currency: "EUR",
    delivery: { fee: 5.90, freeOver: 80, note: "courier, within France" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange"],
    prices: { "MTN 94": 5.50,          // allcity.fr
              "MTN Hardcore": 5.30,    // Paris 20e street-art shop
              "Montana GOLD": 5.10,    // Paris 20e street-art shop
              "Montana BLACK": 4.70,   // Paris 20e street-art shop
              "Molotow Premium": 5.90, // Molotow France
              "Flame Blue": 5.20,      // Molotow France
              "Flame Orange": 4.80 }   // Molotow France
  },
  {
    name: "Graffiti Shop Berlin", city: "berlin", demo: true, currency: "EUR",
    delivery: { fee: 4.90, freeOver: 75, note: "courier, within Germany" },
    lines: ["MTN 94", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange"],
    prices: { "MTN 94": 4.90, "Montana GOLD": 5.50, "Montana BLACK": 4.80, "Flame Orange": 4.30,
              "Molotow Premium": null, "Flame Blue": null }
    // Based on a Berlin graffiti shop's website. Molotow and Flame Blue single-can prices not listed.
  },
  {
    name: "Graffiti Shop Barcelona", city: "barcelona", demo: true, currency: "EUR",
    delivery: { fee: 4.95, freeOver: 60, note: "courier, within Spain" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Orange"],
    prices: { "MTN 94": 4.90,          // Spanish graffiti shop listing
              "MTN Hardcore": null,
              "Montana GOLD": 4.90,    // Barcelona city-centre art & graffiti shop
              "Montana BLACK": null,
              "Molotow Premium": 5.25, // Molotow Spain
              "Flame Orange": 4.00 }   // Molotow Spain
  },
  {
    name: "Graffiti Shop London", city: "london", demo: true, currency: "GBP",
    delivery: { fee: 4.50, freeOver: 60, note: "courier, within the UK" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Orange"],
    prices: { "MTN 94": 6.00,          // London graffiti paint shop
              "Montana GOLD": 6.50,    // London graffiti paint shop
              "Montana BLACK": 5.80,   // London graffiti paint shop
              "MTN Hardcore": 4.04,    // UK graffiti shop ("from" price)
              "Molotow Premium": 4.69, // UK graffiti shop ("from" price)
              "Flame Orange": 3.94 }   // UK graffiti shop ("from" price)
  },
  {
    name: "Graffiti Shop Toronto", city: "toronto", demo: true, currency: "CAD",
    delivery: { fee: 15.00, freeOver: 150, note: "ground shipping, within Canada" },
    lines: ["Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange", "Ironlak", "Ironlak Sugar"],
    prices: { "Montana GOLD": 9.00, "Montana BLACK": 8.99, "Molotow Premium": 9.00,
              "Flame Blue": 8.00, "Flame Orange": 8.99, "Ironlak": null, "Ironlak Sugar": null }
    // Based on a Toronto graffiti shop's website.
  },
  {
    name: "Graffiti Shop Montreal", city: "montreal", demo: true, currency: "CAD",
    delivery: { fee: 15.00, freeOver: 150, note: "ground shipping, within Canada" },
    lines: ["MTN 94", "MTN Hardcore", "Molotow Premium"],
    prices: { "MTN 94": 8.35,          // Montreal graffiti shop
              "MTN Hardcore": null,
              "Molotow Premium": 12.49 } // Canadian graffiti shop (online)
  },
  {
    name: "Graffiti Shop Halifax", city: "halifax", demo: true, currency: "CAD",
    delivery: { fee: 15.00, freeOver: 150, note: "ground shipping, within Canada" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange", "Ironlak"],
    prices: { "MTN 94": 8.30,          // Canadian graffiti shop (Montreal)
              "MTN Hardcore": 8.20,    // Canadian graffiti shop (Montreal)
              "Montana GOLD": 9.00,    // Canadian graffiti shop (Toronto)
              "Montana BLACK": 8.99,   // Canadian graffiti shop (Toronto)
              "Molotow Premium": 12.09, // Canadian graffiti shop (online)
              "Flame Blue": 8.99,      // Canadian graffiti shop (online)
              "Flame Orange": 9.09,    // Canadian graffiti shop (online)
              "Ironlak": null }
    // No Halifax shop lists prices online yet; based on Canadian graffiti shop prices.
  },
  {
    name: "Graffiti Shop New York", city: "newyork", demo: true, currency: "USD",
    delivery: { fee: 12.00, freeOver: 125, note: "ground shipping, within the US" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange", "Ironlak", "Ironlak Sugar"],
    prices: { "MTN 94": 9.35, "MTN Hardcore": 10.50, "Montana GOLD": 8.95, "Montana BLACK": 7.95,
              "Molotow Premium": 8.95, "Flame Blue": 6.19, "Flame Orange": 6.19, "Ironlak": 5.99, "Ironlak Sugar": null }
    // Based on US graffiti and art shop listings.
  },
  {
    name: "Graffiti Shop Los Angeles", city: "losangeles", demo: true, currency: "USD",
    delivery: { fee: 12.00, freeOver: 125, note: "ground shipping, within the US" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Blue", "Flame Orange", "Ironlak", "Ironlak Sugar"],
    prices: { "MTN 94": 9.35, "MTN Hardcore": 10.50, "Montana GOLD": 8.95, "Montana BLACK": 7.95,
              "Molotow Premium": 8.95, "Flame Blue": 6.19, "Flame Orange": 6.19, "Ironlak": 5.99, "Ironlak Sugar": null }
    // Based on US graffiti and art shop listings (same US sources as New York).
  },
  {
    name: "Graffiti Shop Lisbon", city: "lisbon", demo: true, currency: "EUR",
    delivery: { fee: 4.50, freeOver: 60, note: "courier, within Portugal" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Molotow Premium"],
    prices: { "MTN 94": 4.45,          // Portuguese art & graffiti shop
              "MTN Hardcore": 4.05,    // Portuguese art & graffiti shop
              "Montana GOLD": 4.70,    // Portuguese art & graffiti shop
              "Molotow Premium": 4.95 } // Molotow official shop (EU price)
  },
  {
    name: "Graffiti Shop Milan", city: "milan", demo: true, currency: "EUR",
    delivery: { fee: 5.90, freeOver: 70, note: "courier, within Italy" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD", "Montana BLACK", "Molotow Premium", "Flame Orange"],
    prices: { "MTN 94": 4.40,          // Italian graffiti shops
              "MTN Hardcore": 4.20,    // Italian graffiti shop
              "Montana GOLD": 4.50,    // Italian Montana Cans distributor
              "Montana BLACK": null,
              "Molotow Premium": 4.50, // Italian Montana Cans distributor
              "Flame Orange": 4.00 }   // Italian graffiti shop
  },
  {
    name: "Graffiti Shop Amsterdam", city: "amsterdam", demo: true, currency: "EUR",
    delivery: { fee: 4.95, freeOver: 60, note: "courier, within the Netherlands" },
    lines: ["MTN 94", "Montana GOLD", "Molotow Premium"],
    prices: { "MTN 94": 4.95,          // Amsterdam art supply shop
              "Montana GOLD": 4.99,    // Dutch graffiti shop
              "Molotow Premium": null }
  },
  {
    name: "Graffiti Shop Mexico City", city: "mexicocity", demo: true, currency: "MXN",
    delivery: { fee: 150, freeOver: 1500, note: "ground shipping, within Mexico" },
    lines: ["MTN 94", "MTN Hardcore", "Montana GOLD"],
    prices: { "MTN 94": 199.00,        // Mexican online retail listing
              "MTN Hardcore": null,
              "Montana GOLD": 153.80 } // Mexican online graffiti shop
  },
  {
    name: "Graffiti Shop São Paulo", city: "saopaulo", demo: true, currency: "BRL",
    delivery: { fee: 25, freeOver: 400, note: "ground shipping, within Brazil" },
    lines: ["MTN 94", "MTN Hardcore"],
    prices: { "MTN 94": 63.10,         // Brazilian paint shop
              "MTN Hardcore": 63.10 }  // Brazilian paint shop
    // Brazilian writers mostly use local brands (e.g. Colorgin), not yet in CanMatch.
  }
];
