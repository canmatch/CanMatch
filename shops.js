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
    "name": "Graffiti Shop Athens",
    "city": "athens",
    "demo": true,
    "currency": "EUR",
    "delivery": {
      "fee": 4,
      "freeOver": 60,
      "note": "courier, within Greece"
    },
    "lines": [
      "MTN 94",
      "MTN Hardcore",
      "Montana GOLD",
      "Montana BLACK",
      "Molotow Premium",
      "Flame Blue",
      "Flame Orange"
    ],
    "prices": {
      "MTN 94": 5.3,
      "MTN Hardcore": 4.5,
      "Montana GOLD": 5.3,
      "Montana BLACK": 4.7,
      "Molotow Premium": 4.9,
      "Flame Blue": 3.9,
      "Flame Orange": 3.7
    }
  },
  {
    "name": "Graffiti Shop Toronto",
    "city": "toronto",
    "demo": true,
    "currency": "CAD",
    "delivery": {
      "fee": 15,
      "freeOver": 150,
      "note": "ground shipping, within Canada"
    },
    "lines": [
      "Montana GOLD",
      "Montana BLACK",
      "Molotow Premium",
      "Flame Blue",
      "Flame Orange",
      "Ironlak",
      "Ironlak Sugar"
    ],
    "prices": {
      "Montana GOLD": 9,
      "Montana BLACK": 8.99,
      "Molotow Premium": 9,
      "Flame Blue": 8,
      "Flame Orange": 8.99,
      "Ironlak": null,
      "Ironlak Sugar": null
    }
  },
  {
    "name": "Graffiti Shop Halifax",
    "city": "halifax",
    "demo": true,
    "currency": "CAD",
    "delivery": {
      "fee": 15,
      "freeOver": 150,
      "note": "ground shipping, within Canada"
    },
    "lines": [
      "MTN 94",
      "MTN Hardcore",
      "Montana GOLD",
      "Montana BLACK",
      "Molotow Premium",
      "Flame Blue",
      "Flame Orange",
      "Ironlak"
    ],
    "prices": {
      "MTN 94": 8.3,
      "MTN Hardcore": 8.2,
      "Montana GOLD": 9,
      "Montana BLACK": 8.99,
      "Molotow Premium": 12.09,
      "Flame Blue": 8.99,
      "Flame Orange": 9.09,
      "Ironlak": null
    }
  }
];
