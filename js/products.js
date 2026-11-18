// Spice Route Kitchen product data. All names, prices and facts come from the content pack.
var PRODUCTS = [
  {
    id: "red-chilli-powder", name: "Red Chilli Powder", category: "Ground Spices",
    img: "images/red-chilli-powder.jpg", bestseller: true,
    short: "Ground fresh weekly, strong heat with deep colour.",
    long: "Our red chilli powder is ground fresh every week from whole dried chillies, so the heat stays strong and the colour stays deep. A little goes a long way in curries, marinades and everyday cooking, and every pack is marked with its packing week.",
    storage: "Keep in an airtight jar away from heat and sunlight. It holds its best flavour for about 6 months once opened.",
    weights: [ { label: "100g", price: 220 }, { label: "250g", price: 480 }, { label: "500g", price: 890 } ],
    recipes: ["everyday-chicken-curry", "spiced-roasted-almonds"]
  },
  {
    id: "turmeric-powder", name: "Turmeric Powder", category: "Ground Spices",
    img: "images/turmeric-powder.jpg", bestseller: true,
    short: "High colour, earthy and clean.",
    long: "A bright, earthy turmeric with strong natural colour, ground from cleaned whole roots and packed in small batches. It is the base note in curries, rice and marinades, and a spoon in warm milk is a family favourite.",
    storage: "Keep in an airtight jar away from heat and sunlight. It holds its best flavour for about 6 months once opened.",
    weights: [ { label: "100g", price: 180 }, { label: "250g", price: 390 }, { label: "500g", price: 720 } ],
    recipes: ["everyday-chicken-curry"]
  },
  {
    id: "garam-masala", name: "Garam Masala", category: "Spice Blends",
    img: "images/garam-masala.jpg", bestseller: true,
    short: "House blend of 11 whole spices, ground in small batches.",
    long: "Our house blend of 11 whole spices, mixed and ground in small batches every week and packed the same week. Add it near the end of cooking so the warm aroma stays on top of the dish.",
    storage: "Keep in an airtight jar away from heat and sunlight. Blends hold their best aroma for about 6 months once opened.",
    weights: [ { label: "100g", price: 320 }, { label: "250g", price: 720 } ],
    recipes: ["everyday-chicken-curry"]
  },
  {
    id: "black-peppercorns", name: "Whole Black Peppercorns", category: "Whole Spices",
    img: "images/black-peppercorns.jpg", bestseller: false,
    short: "Bold size, sharp heat.",
    long: "Bold, full sized black peppercorns with a sharp, clean heat. Grind them fresh over eggs, salads and steaks, or add them whole to stocks, pulao and pickling spice mixes.",
    storage: "Keep whole in an airtight jar away from heat and sunlight. Whole spices keep their flavour longer than ground ones.",
    weights: [ { label: "100g", price: 450 }, { label: "250g", price: 1050 } ],
    recipes: []
  },
  {
    id: "green-cardamom", name: "Green Cardamom", category: "Whole Spices",
    img: "images/green-cardamom.jpg", bestseller: true,
    short: "8mm pods, strong aroma for tea and desserts.",
    long: "Full 8mm green cardamom pods with a strong, sweet aroma. Crush a pod into tea, add it to rice and desserts, or chew one after a meal the way our regulars do.",
    storage: "Keep the pods whole in an airtight jar away from heat and sunlight. The aroma stays locked inside the pod until you crush it.",
    weights: [ { label: "50g", price: 950 }, { label: "100g", price: 1850 } ],
    recipes: ["chicken-biryani", "after-dinner-mint-tea"]
  },
  {
    id: "cumin-seeds", name: "Cumin Seeds", category: "Whole Spices",
    img: "images/cumin-seeds.jpg", bestseller: true,
    short: "Whole, clean and nutty.",
    long: "Clean, whole cumin seeds with a warm, nutty taste. Sizzle them in hot oil or ghee at the start of a dish, or dry roast and crush them over raita and chaat.",
    storage: "Keep in an airtight jar away from heat and sunlight. Whole seeds keep their flavour well for months.",
    weights: [ { label: "250g", price: 420 }, { label: "500g", price: 780 } ],
    recipes: ["cumin-rice"]
  },
  {
    id: "coriander-powder", name: "Coriander Powder", category: "Ground Spices",
    img: "images/coriander-powder.jpg", bestseller: false,
    short: "Ground from whole seed, mild and lemony.",
    long: "Ground from whole coriander seed in small batches, this powder is mild, warm and a little lemony. It builds the body of everyday curries and gravies without adding heat.",
    storage: "Keep in an airtight jar away from heat and sunlight. It holds its best flavour for about 6 months once opened.",
    weights: [ { label: "250g", price: 340 }, { label: "500g", price: 620 } ],
    recipes: ["everyday-chicken-curry"]
  },
  {
    id: "biryani-masala", name: "Biryani Masala", category: "Spice Blends",
    img: "images/biryani-masala.jpg", bestseller: true,
    short: "House blend with whole spices in the mix, made for layered rice.",
    long: "Our house biryani blend, mixed with whole spices left in the blend the way layered rice needs them. One pack seasons a family sized pot of biryani or pulao with nothing else to measure out.",
    storage: "Keep in an airtight jar away from heat and sunlight. Blends hold their best aroma for about 6 months once opened.",
    weights: [ { label: "100g", price: 350 }, { label: "250g", price: 790 } ],
    recipes: ["chicken-biryani"]
  },
  {
    id: "premium-almonds", name: "Premium Almonds", category: "Dry Fruits and Nuts",
    img: "images/premium-almonds.jpg", bestseller: true,
    short: "American kernels, crisp and sweet.",
    long: "American almond kernels, crisp and naturally sweet, checked kernel by kernel before packing. The same grade we sell in our celebration gift boxes, good for the snack jar, baking and morning handfuls.",
    storage: "Keep in a sealed container. In warm weather the fridge keeps them crisp for longer.",
    weights: [ { label: "250g", price: 1150 }, { label: "500g", price: 2200 }, { label: "1kg", price: 4250 } ],
    recipes: ["spiced-roasted-almonds"]
  },
  {
    id: "cashew-nuts", name: "Cashew Nuts", category: "Dry Fruits and Nuts",
    img: "images/cashew-nuts.jpg", bestseller: true,
    short: "W240 whole kernels, creamy and unbroken.",
    long: "W240 whole cashew kernels, creamy and unbroken, never broken seconds. Eat them as they are, roast them lightly with salt, or fold them into rice and desserts.",
    storage: "Keep in a sealed container. In warm weather the fridge keeps them fresh for longer.",
    weights: [ { label: "250g", price: 1350 }, { label: "500g", price: 2600 } ],
    recipes: ["dry-fruit-snack-mix"]
  },
  {
    id: "golden-raisins", name: "Golden Raisins", category: "Dry Fruits and Nuts",
    img: "images/golden-raisins.jpg", bestseller: false,
    short: "Soft, seedless and naturally sweet.",
    long: "Soft, seedless golden raisins with a clean natural sweetness. Add them to rice, baking and morning cereal, or keep a small bowl on the desk for snacking.",
    storage: "Keep in a sealed container in a cool, dry place.",
    weights: [ { label: "250g", price: 480 }, { label: "500g", price: 900 } ],
    recipes: ["dry-fruit-snack-mix"]
  },
  {
    id: "walnut-halves", name: "Walnut Halves", category: "Dry Fruits and Nuts",
    img: "images/walnut-halves.jpg", bestseller: false,
    short: "Shelled, light colour, no bitter skin taste.",
    long: "Shelled walnut halves in a light colour, with none of the bitter skin taste you get from old stock. Good for baking, salads and a daily handful.",
    storage: "Keep in a sealed container. In warm weather the fridge is better, as walnuts soften in heat.",
    weights: [ { label: "250g", price: 1250 }, { label: "500g", price: 2400 } ],
    recipes: ["dry-fruit-snack-mix"]
  },
  {
    id: "himalayan-pink-salt", name: "Himalayan Pink Salt", category: "Pantry",
    img: "images/pink-salt.jpg", bestseller: false,
    short: "Fine ground, unrefined mineral salt.",
    long: "Fine ground Himalayan pink salt, an unrefined mineral salt for everyday cooking and the table. It dissolves cleanly in gravies and is gentle enough for finishing a dish.",
    storage: "Keep in a dry, airtight jar. Salt keeps indefinitely if it stays dry.",
    weights: [ { label: "500g", price: 240 }, { label: "1kg", price: 420 } ],
    recipes: ["chicken-biryani", "cumin-rice", "spiced-roasted-almonds"]
  },
  {
    id: "mint-herb-tea-mix", name: "Mint and Herb Tea Mix", category: "Pantry",
    img: "images/tea-mix.jpg", bestseller: false,
    short: "Dried mint, fennel and cardamom husk for after dinner tea.",
    long: "A calming mix of dried mint, fennel and cardamom husk, made for after dinner tea. Steep a spoon in hot water for a few minutes and drink it plain, the way it is served at our counter.",
    storage: "Keep in an airtight jar away from heat and sunlight so the mint stays fragrant.",
    weights: [ { label: "100g", price: 380 } ],
    recipes: ["after-dinner-mint-tea"]
  },
  {
    id: "gift-discovery", name: "Spice Discovery Gift Box", category: "Gift Boxes",
    img: "images/gift-discovery.jpg", bestseller: false,
    short: "Six small jars of best selling spices and blends.",
    long: "Six small jars of our best selling spices and blends, packed in a gift box. A good first taste of the shop for someone who cooks.",
    storage: "Keep the jars in a cool, dry place away from sunlight.",
    weights: [ { label: "One box", price: 1999 } ],
    recipes: []
  },
  {
    id: "gift-celebration", name: "Dry Fruit Celebration Box", category: "Gift Boxes",
    img: "images/gift-celebration.jpg", bestseller: false,
    short: "Almonds, cashews, raisins and walnuts, 250g each.",
    long: "Almonds, cashews, raisins and walnuts, 250g of each, packed in a gift box. The same grades we sell in the shop, ready for gifting.",
    storage: "Keep in a sealed container in a cool, dry place.",
    weights: [ { label: "One box", price: 3499 } ],
    recipes: []
  }
];

var RECIPES = [
  {
    id: "chicken-biryani", name: "Chicken Biryani", img: "images/biryani-masala.jpg",
    time: "About 1 hour", serves: "Serves 4 to 6",
    intro: "Layered rice with our house biryani blend doing the measuring for you.",
    steps: [
      "Fry sliced onions until deep golden and set half aside.",
      "Cook chicken with yogurt, Biryani Masala and salt until the oil separates.",
      "Boil rice with a crushed cardamom pod until just underdone, then drain.",
      "Layer rice over the chicken, top with the saved onions, and steam on low heat for 20 minutes."
    ],
    products: ["biryani-masala", "green-cardamom", "himalayan-pink-salt"]
  },
  {
    id: "everyday-chicken-curry", name: "Everyday Chicken Curry", img: "images/recipe-powders.jpg",
    time: "About 40 minutes", serves: "Serves 4",
    intro: "The weeknight curry our counter regulars ask about most.",
    steps: [
      "Soften onions in oil, then add ginger and garlic.",
      "Add turmeric, coriander powder and red chilli powder with a splash of water and fry for a minute.",
      "Add chicken and tomatoes and cook until the sauce thickens.",
      "Finish with garam masala, rest for five minutes, and serve with rice or roti."
    ],
    products: ["garam-masala", "turmeric-powder", "red-chilli-powder", "coriander-powder"]
  },
  {
    id: "cumin-rice", name: "Cumin Rice", img: "images/cumin-seeds.jpg",
    time: "About 25 minutes", serves: "Serves 4",
    intro: "Plain rice lifted by a simple cumin tempering.",
    steps: [
      "Cook basmati rice and let it rest, covered.",
      "Sizzle cumin seeds in hot ghee until they darken a shade and smell nutty.",
      "Pour the tempering over the rice with salt and fold through gently."
    ],
    products: ["cumin-seeds", "himalayan-pink-salt"]
  },
  {
    id: "after-dinner-mint-tea", name: "After Dinner Mint Tea", img: "images/tea-mix.jpg",
    time: "About 10 minutes", serves: "Serves 2",
    intro: "A light, calming cup to close a heavy meal.",
    steps: [
      "Bring two cups of water to a boil.",
      "Add a spoon of Mint and Herb Tea Mix and one crushed cardamom pod.",
      "Steep off the heat for five minutes, strain, and drink plain."
    ],
    products: ["mint-herb-tea-mix", "green-cardamom"]
  },
  {
    id: "spiced-roasted-almonds", name: "Spiced Roasted Almonds", img: "images/premium-almonds.jpg",
    time: "About 15 minutes", serves: "Snack bowl for sharing",
    intro: "Warm, salty almonds with a gentle chilli kick.",
    steps: [
      "Warm the almonds in a dry pan for a few minutes.",
      "Add a little oil, salt and a pinch of red chilli powder and toss for one minute.",
      "Cool completely before storing so they stay crisp."
    ],
    products: ["premium-almonds", "red-chilli-powder", "himalayan-pink-salt"]
  },
  {
    id: "dry-fruit-snack-mix", name: "Dry Fruit Snack Mix", img: "images/gift-celebration.jpg",
    time: "About 5 minutes", serves: "One sharing jar",
    intro: "The mix we pack for road trips and desk drawers.",
    steps: [
      "Combine walnut halves, golden raisins and cashew nuts in a bowl.",
      "Toss well and store in a sealed jar.",
      "Keep a small handful as the daily measure, it is richer than it looks."
    ],
    products: ["walnut-halves", "golden-raisins", "cashew-nuts"]
  }
];

function productById(id) {
  for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].id === id) return PRODUCTS[i]; }
  return null;
}
function recipeById(id) {
  for (var i = 0; i < RECIPES.length; i++) { if (RECIPES[i].id === id) return RECIPES[i]; }
  return null;
}
function formatRs(n) {
  return "Rs " + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
