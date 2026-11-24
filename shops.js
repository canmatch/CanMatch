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
      "Flame Orange",
      "Ironlak",
      "Ironlak Sugar",
      "MTN Water Based",
      "NBQ Slow",
      "NBQ Fast",
      "NBQ Water Based",
      "DANG Prime",
      "DANG Hiflow"
    ],
    "prices": {
      "MTN 94": 5.3,
      "MTN Hardcore": 4.9,
      "Montana GOLD": 5.3,
      "Montana BLACK": 4.7,
      "Molotow Premium": 4.9,
      "Flame Blue": 3.9,
      "Flame Orange": 3.7,
      "Ironlak": 5.5,
      "Ironlak Sugar": 5.5,
      "MTN Water Based": 8.9,
      "NBQ Slow": 4.2,
      "NBQ Fast": 3.9,
      "NBQ Water Based": 7.5,
      "DANG Prime": 5.0,
      "DANG Hiflow": 5.0
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
      "MTN 94",
      "MTN Hardcore",
      "Montana GOLD",
      "Montana BLACK",
      "Molotow Premium",
      "Flame Blue",
      "Flame Orange",
      "Ironlak",
      "Ironlak Sugar",
      "MTN Water Based",
      "NBQ Slow",
      "NBQ Fast",
      "NBQ Water Based",
      "DANG Prime",
      "DANG Hiflow"
    ],
    "prices": {
      "MTN 94": 9.49,
      "MTN Hardcore": 9.49,
      "Montana GOLD": 9.99,
      "Montana BLACK": 9.49,
      "Molotow Premium": 11.99,
      "Flame Blue": 8.99,
      "Flame Orange": 8.99,
      "Ironlak": 9.99,
      "Ironlak Sugar": 9.99,
      "MTN Water Based": 15.99,
      "NBQ Slow": 8.99,
      "NBQ Fast": 8.49,
      "NBQ Water Based": 13.99,
      "DANG Prime": 9.99,
      "DANG Hiflow": 9.99
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
      "Ironlak",
      "Ironlak Sugar",
      "MTN Water Based",
      "NBQ Slow",
      "NBQ Fast",
      "NBQ Water Based",
      "DANG Prime",
      "DANG Hiflow"
    ],
    "prices": {
      "MTN 94": 9.99,
      "MTN Hardcore": 9.99,
      "Montana GOLD": 10.49,
      "Montana BLACK": 9.99,
      "Molotow Premium": 12.49,
      "Flame Blue": 9.49,
      "Flame Orange": 9.49,
      "Ironlak": 10.49,
      "Ironlak Sugar": 10.49,
      "MTN Water Based": 16.49,
      "NBQ Slow": 9.49,
      "NBQ Fast": 8.99,
      "NBQ Water Based": 14.49,
      "DANG Prime": 10.49,
      "DANG Hiflow": 10.49
    }
  }
];
