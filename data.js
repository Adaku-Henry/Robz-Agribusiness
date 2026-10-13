// ROBZ Agricultural Marketplace - Product & Business Data

export const localImages = {
  logo: 'images/logo.jpg',
  hero: 'images/NATURE PIC 1.jpg',
  field: 'images/IMG-20260829-WA0001.jpg',
  produce: 'images/IMG-20260905-WA0002.jpg',
  farm: 'images/IMG-20260911-WA0028.jpg',
  livestock: 'images/IMG-20260917-WA0014.jpg',
  harvest: 'images/IMG-20260917-WA0019.jpg',
  community: 'images/IMG-20260917-WA0021.jpg',
  training: 'images/IMG-20260917-WA0033.jpg',
  nature: 'images/IMG_20260306_150713.jpg'
}

export const categories = [
  {
    id: 'crops',
    name: 'Crops & Grains',
    icon: 'wheat',
    description: 'Premium grains, cereals, and field crops from trusted farmers.',
    image: localImages.field,
    subcategories: ['Maize', 'Wheat', 'Rice', 'Barley', 'Sorghum', 'Soybeans']
  },
  {
    id: 'vegetables',
    name: 'Fresh Vegetables',
    icon: 'carrot',
    description: 'Farm-fresh vegetables harvested at peak quality and delivered to you.',
    image: localImages.produce,
    subcategories: ['Tomatoes', 'Onions', 'Peppers', 'Cabbage', 'Carrots', 'Lettuce']
  },
  {
    id: 'fruits',
    name: 'Fruits & Orchard',
    icon: 'apple',
    description: 'Sweet, juicy fruits picked fresh from our partner orchards.',
    image: localImages.harvest,
    subcategories: ['Apples', 'Citrus', 'Bananas', 'Mangoes', 'Berries', 'Avocados']
  },
  {
    id: 'livestock',
    name: 'Livestock & Poultry',
    icon: 'cow',
    description: 'Healthy, well-raised livestock and poultry for every need.',
    image: localImages.livestock,
    subcategories: ['Cattle', 'Goats', 'Sheep', 'Pigs', 'Poultry', 'Rabbits']
  },
  {
    id: 'equipment',
    name: 'Equipment & Machinery',
    icon: 'tractor',
    description: 'New and used agricultural machinery to power your farm.',
    image: localImages.farm,
    subcategories: ['Tractors', 'Plows', 'Harvesters', 'Irrigation', 'Sprayers', 'Hand Tools']
  },
  {
    id: 'inputs',
    name: 'Seeds & Inputs',
    icon: 'sprout',
    description: 'High-quality seeds, fertilizers, and farm inputs for maximum yield.',
    image: localImages.field,
    subcategories: ['Seeds', 'Fertilizers', 'Pesticides', 'Compost', 'Mulch', 'Grow Bags']
  },
  {
    id: 'honey',
    name: 'Honey & Bee Products',
    icon: 'honey',
    description: 'Pure, natural honey and bee products from local apiaries.',
    image: localImages.harvest,
    subcategories: ['Raw Honey', 'Beeswax', 'Propolis', 'Royal Jelly', 'Bee Hives', 'Honey Comb']
  },
  {
    id: 'irrigation',
    name: 'Irrigation Systems',
    icon: 'droplet',
    description: 'Modern irrigation solutions to keep your crops thriving.',
    image: localImages.nature,
    subcategories: ['Drip Systems', 'Sprinklers', 'Pumps', 'Pipes', 'Tanks', 'Filters']
  }
];

export const products = [
  {
    id: 'p001',
    name: 'Premium Yellow Maize',
    category: 'crops',
    subcategory: 'Maize',
    price: 320000,
    unit: 'per 50kg bag',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    badge: 'Best Seller',
    image: 'https://images.pexels.com/photos/13566357/pexels-photo-13566357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/13566357/pexels-photo-13566357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/33786601/pexels-photo-33786601.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/33786605/pexels-photo-33786605.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Top-grade yellow maize grown in nutrient-rich soils. Carefully harvested and dried to preserve quality. Ideal for milling, animal feed, and industrial use. Sourced from certified farms practicing sustainable agriculture.',
    specs: { 'Origin': 'Local Farms', 'Moisture': 'Below 13%', 'Grade': 'Grade A', 'Packaging': '50kg woven bags', 'Shelf Life': '24 months' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Green Valley Co-op',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p002',
    name: 'Hard Red Winter Wheat',
    category: 'crops',
    subcategory: 'Wheat',
    price: 470000,
    unit: 'per 50kg bag',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    badge: 'Premium',
    image: 'https://images.pexels.com/photos/1296262/pexels-photo-1296262.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/1296262/pexels-photo-1296262.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9854639/pexels-photo-9854639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/3066790/pexels-photo-3066790.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'High-protein hard red winter wheat perfect for bread flour and pasta production. Cleaned, graded, and stored in climate-controlled facilities to maintain premium quality.',
    specs: { 'Protein': '12.5%+', 'Moisture': 'Below 12%', 'Grade': 'Grade A', 'Packaging': '50kg bags', 'Test Weight': '76 kg/hl' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Golden Grain Farms',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p003',
    name: 'Aromatic Jasmine Rice',
    category: 'crops',
    subcategory: 'Rice',
    price: 420000,
    unit: 'per 25kg bag',
    rating: 4.9,
    reviews: 203,
    inStock: true,
    badge: 'Top Rated',
    image: 'https://images.pexels.com/photos/39602572/pexels-photo-39602572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/39602572/pexels-photo-39602572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/37012643/pexels-photo-37012643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/13888402/pexels-photo-13888402.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Fragrant long-grain jasmine rice with a soft, fluffy texture when cooked. Perfect for Asian cuisine and everyday meals. Milled and polished to perfection.',
    specs: { 'Grain Length': '7mm+', 'Broken': 'Below 5%', 'Moisture': 'Below 14%', 'Packaging': '25kg bags', 'Grade': 'Premium' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Rice Valley Estates',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p004',
    name: 'Fresh Roma Tomatoes',
    category: 'vegetables',
    subcategory: 'Tomatoes',
    price: 180000,
    unit: 'per 10kg crate',
    rating: 4.6,
    reviews: 156,
    inStock: true,
    badge: 'Fresh',
    image: 'https://images.pexels.com/photos/31834232/pexels-photo-31834232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/31834232/pexels-photo-31834232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/31834230/pexels-photo-31834230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1132600/pexels-photo-1132600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Vine-ripened Roma tomatoes with rich flavor and firm texture. Perfect for sauces, salads, and cooking. Harvested daily and delivered fresh to your doorstep.',
    specs: { 'Variety': 'Roma VF', 'Size': 'Medium', 'Color': 'Deep Red', 'Packaging': '10kg crates', 'Shelf Life': '7-10 days' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Sunrise Vegetable Farm',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p005',
    name: 'Red Bell Peppers',
    category: 'vegetables',
    subcategory: 'Peppers',
    price: 240000,
    unit: 'per 5kg bag',
    rating: 4.7,
    reviews: 78,
    inStock: true,
    image: 'https://images.pexels.com/photos/1132600/pexels-photo-1132600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/1132600/pexels-photo-1132600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/37321079/pexels-photo-37321079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Sweet, crunchy red bell peppers packed with vitamins. Great for grilling, stuffing, and fresh salads. Grown using organic practices.',
    specs: { 'Variety': 'California Wonder', 'Color': 'Red', 'Size': 'Large', 'Packaging': '5kg bags', 'Shelf Life': '10-14 days' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Greenhouse Gardens',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p006',
    name: 'Fresh Red Onions',
    category: 'vegetables',
    subcategory: 'Onions',
    price: 120000,
    unit: 'per 10kg bag',
    rating: 4.5,
    reviews: 112,
    inStock: true,
    image: 'https://images.pexels.com/photos/31834230/pexels-photo-31834230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/31834230/pexels-photo-31834230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9117894/pexels-photo-9117894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Pungent, flavorful red onions cured and sorted for maximum shelf life. Essential for every kitchen and food business.',
    specs: { 'Variety': 'Red Creole', 'Size': 'Medium-Large', 'Packaging': '10kg mesh bags', 'Shelf Life': '3-4 months' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Northern Roots Farm',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p007',
    name: 'Crunchy Farm Carrots',
    category: 'vegetables',
    subcategory: 'Carrots',
    price: 170000,
    unit: 'per 10kg bag',
    rating: 4.6,
    reviews: 67,
    inStock: true,
    image: 'https://images.pexels.com/photos/3889959/pexels-photo-3889959.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/3889959/pexels-photo-3889959.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5425794/pexels-photo-5425794.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Sweet, crunchy carrots harvested at peak ripeness. Rich in beta-carotene and perfect for juicing, cooking, or snacking.',
    specs: { 'Variety': 'Nantes', 'Size': 'Medium', 'Color': 'Bright Orange', 'Packaging': '10kg bags', 'Shelf Life': '2-3 weeks' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Sunrise Vegetable Farm',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p008',
    name: 'Fresh Orchard Apples',
    category: 'fruits',
    subcategory: 'Apples',
    price: 380000,
    unit: 'per 10kg box',
    rating: 4.8,
    reviews: 145,
    inStock: true,
    badge: 'Seasonal',
    image: 'https://images.pexels.com/photos/28968704/pexels-photo-28968704.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/28968704/pexels-photo-28968704.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/28387811/pexels-photo-28387811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9075844/pexels-photo-9075844.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Crisp, juicy apples hand-picked from our highland orchards. Perfect balance of sweetness and tartness. Great for eating fresh, baking, or making juice.',
    specs: { 'Variety': 'Gala / Fuji', 'Size': 'Large', 'Color': 'Red', 'Packaging': '10kg boxes', 'Shelf Life': '4-6 weeks refrigerated' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Highland Orchards',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p009',
    name: 'Sweet Pineapples',
    category: 'fruits',
    subcategory: 'Citrus',
    price: 240000,
    unit: 'per 5 pieces',
    rating: 4.7,
    reviews: 93,
    inStock: true,
    image: 'https://images.pexels.com/photos/5910950/pexels-photo-5910950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/5910950/pexels-photo-5910950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Extra-sweet golden pineapples ripened under the tropical sun. Bursting with juice and flavor. Perfect for fresh eating, juicing, or cooking.',
    specs: { 'Variety': 'Smooth Cayenne', 'Size': 'Large', 'Weight': '1.5-2kg each', 'Packaging': '5 per carton', 'Shelf Life': '5-7 days' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Tropical Fruits Ltd',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p010',
    name: 'Healthy Holstein Cattle',
    category: 'livestock',
    subcategory: 'Cattle',
    price: 1800000,
    unit: 'per head',
    rating: 4.8,
    reviews: 34,
    inStock: true,
    badge: 'Verified',
    image: 'https://images.pexels.com/photos/5798535/pexels-photo-5798535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/5798535/pexels-photo-5798535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8633329/pexels-photo-8633329.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/13992135/pexels-photo-13992135.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Healthy, well-vaccinated Holstein dairy cattle. High milk yield potential (25-30 liters/day). Fully vaccinated, dewormed, and health-certified. Includes veterinary records.',
    specs: { 'Breed': 'Holstein Friesian', 'Age': '18-24 months', 'Weight': '350-450 kg', 'Health': 'Vaccinated & Certified', 'Yield': '25-30 L/day' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Green Pasture Ranch',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p011',
    name: 'Free-Range Layer Chickens',
    category: 'livestock',
    subcategory: 'Poultry',
    price: 38000,
    unit: 'per bird',
    rating: 4.6,
    reviews: 87,
    inStock: true,
    image: 'https://images.pexels.com/photos/5216141/pexels-photo-5216141.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/5216141/pexels-photo-5216141.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5216152/pexels-photo-5216152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Healthy, free-range layer chickens at point-of-lay (16-18 weeks). Raised on natural feed with no antibiotics. Start laying within 2-3 weeks of purchase.',
    specs: { 'Breed': 'ISA Brown', 'Age': '16-18 weeks', 'Status': 'Point of Lay', 'Health': 'Vaccinated', 'Expected Yield': '250-300 eggs/year' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Sunrise Poultry Farm',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p012',
    name: 'Dairy Goats (Saanen)',
    category: 'livestock',
    subcategory: 'Goats',
    price: 520000,
    unit: 'per head',
    rating: 4.7,
    reviews: 41,
    inStock: true,
    image: 'https://images.pexels.com/photos/4840956/pexels-photo-4840956.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/4840956/pexels-photo-4840956.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Purebred Saanen dairy goats with excellent milk production. Gentle temperament, ideal for small-scale and commercial dairy operations.',
    specs: { 'Breed': 'Saanen', 'Age': '12-18 months', 'Weight': '50-70 kg', 'Yield': '3-5 L/day', 'Health': 'Certified' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Hillside Goat Farm',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p013',
    name: '75HP Tractor - New',
    category: 'equipment',
    subcategory: 'Tractors',
    price: 42000000,
    unit: 'per unit',
    rating: 4.9,
    reviews: 23,
    inStock: true,
    badge: 'New Arrival',
    image: 'https://images.pexels.com/photos/7457180/pexels-photo-7457180.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7457180/pexels-photo-7457180.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/11996942/pexels-photo-11996942.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/30248663/pexels-photo-30248663.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Brand new 75HP diesel tractor with 4WD, power steering, and hydraulic lift. Includes 3-point hitch, PTO, and 2-year manufacturer warranty. Perfect for plowing, hauling, and PTO-driven implements.',
    specs: { 'Engine': '75 HP Diesel', 'Drive': '4WD', 'Transmission': '8F+2R', 'Lift Capacity': '1500 kg', 'Warranty': '2 years', 'Fuel Tank': '65L' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'AgroMachinery Hub',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p014',
    name: 'Tractor Disc Plow',
    category: 'equipment',
    subcategory: 'Plows',
    price: 2400000,
    unit: 'per unit',
    rating: 4.5,
    reviews: 19,
    inStock: true,
    image: 'https://images.pexels.com/photos/11996942/pexels-photo-11996942.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/11996942/pexels-photo-11996942.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/11637408/pexels-photo-11637408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Heavy-duty 3-point mounted disc plow with 3 discs. Designed for primary tillage in all soil types. Compatible with 50-75HP tractors.',
    specs: { 'Discs': '3 x 26 inch', 'Mounting': '3-Point Hitch', 'Working Width': '90cm', 'Working Depth': '15-25cm', 'Weight': '180 kg' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'AgroMachinery Hub',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p015',
    name: 'Drip Irrigation Kit (1 Acre)',
    category: 'irrigation',
    subcategory: 'Drip Systems',
    price: 950000,
    unit: 'per kit',
    rating: 4.7,
    reviews: 56,
    inStock: true,
    badge: 'Eco-Friendly',
    image: 'https://images.pexels.com/photos/17765487/pexels-photo-17765487.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/17765487/pexels-photo-17765487.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/31231189/pexels-photo-31231189.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Complete drip irrigation kit for 1 acre. Includes mainline, drip tapes, fittings, filter, and pressure regulator. Saves up to 60% water compared to flood irrigation.',
    specs: { 'Coverage': '1 Acre', 'Drip Tape': '16mm, 30cm spacing', 'Filter': 'Screen + Disc', 'Pressure': '1-2 bar', 'Includes': 'All fittings' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'WaterSmart Systems',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p016',
    name: 'Impact Sprinkler Set (10)',
    category: 'irrigation',
    subcategory: 'Sprinklers',
    price: 160000,
    unit: 'per set of 10',
    rating: 4.4,
    reviews: 38,
    inStock: true,
    image: 'https://images.pexels.com/photos/27351039/pexels-photo-27351039.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/27351039/pexels-photo-27351039.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2684805/pexels-photo-2684805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Set of 10 heavy-duty impact sprinklers with brass heads and adjustable spray patterns. Covers up to 15m radius each. Ideal for lawns and medium-sized farms.',
    specs: { 'Material': 'Brass + ABS', 'Coverage': '12-15m radius', 'Flow Rate': '20-40 L/min', 'Pressure': '1.5-4 bar', 'Connection': '1/2 inch' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'WaterSmart Systems',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p017',
    name: 'Hybrid Maize Seeds (10kg)',
    category: 'inputs',
    subcategory: 'Seeds',
    price: 210000,
    unit: 'per 10kg bag',
    rating: 4.8,
    reviews: 167,
    inStock: true,
    badge: 'High Yield',
    image: 'images/maize.webp',
    gallery: ['images/maize.webp'],
    description: 'High-yielding hybrid maize seeds with disease resistance and drought tolerance. Potential yield of 4-6 tons per hectare. Treated with fungicide for optimal germination.',
    specs: { 'Variety': 'SC 513', 'Germination': '95%+', 'Purity': '99%', 'Treatment': 'Fungicide-coated', 'Yield Potential': '4-6 t/ha' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'AgroSeed Nigeria',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p018',
    name: 'NPK 15-15-15 Fertilizer (50kg)',
    category: 'inputs',
    subcategory: 'Fertilizers',
    price: 260000,
    unit: 'per 50kg bag',
    rating: 4.5,
    reviews: 98,
    inStock: true,
    image: 'https://images.pexels.com/photos/11996945/pexels-photo-11996945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/11996945/pexels-photo-11996945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/21967623/pexels-photo-21967623.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Balanced NPK 15-15-15 compound fertilizer for all crops. Provides equal proportions of nitrogen, phosphorus, and potassium. Suitable for basal application.',
    specs: { 'NPK': '15-15-15', 'Weight': '50 kg', 'Type': 'Compound', 'Application': 'Basal', 'Coverage': '1 bag per 0.5 ha' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'AgroInput Depot',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p019',
    name: 'Pure Raw Honey (1L)',
    category: 'honey',
    subcategory: 'Raw Honey',
    price: 23000,
    unit: 'per liter',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    badge: '100% Pure',
    image: 'https://images.pexels.com/photos/14022964/pexels-photo-14022964.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/14022964/pexels-photo-14022964.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/11334356/pexels-photo-11334356.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/14022966/pexels-photo-14022966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: '100% pure, unfiltered raw honey from our apiaries. Harvested from wildflower nectar with no additives or preservatives. Rich in natural enzymes and antioxidants.',
    specs: { 'Type': 'Raw Wildflower', 'Volume': '1 Liter', 'Purity': '100%', 'Container': 'Glass jar', 'Shelf Life': 'Indefinite' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'BeeGold Apiaries',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p020',
    name: 'Natural Beeswax (1kg)',
    category: 'honey',
    subcategory: 'Beeswax',
    price: 26000,
    unit: 'per kg',
    rating: 4.6,
    reviews: 52,
    inStock: true,
    image: 'https://images.pexels.com/photos/11334356/pexels-photo-11334356.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/11334356/pexels-photo-11334356.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Pure, filtered beeswax perfect for cosmetics, candle making, leather conditioning, and food wraps. Naturally golden with a subtle honey aroma.',
    specs: { 'Weight': '1 kg', 'Color': 'Natural Golden', 'Form': 'Blocks', 'Purity': '100%', 'Melting Point': '62-65°C' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'BeeGold Apiaries',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p021',
    name: 'Complete Bee Hive (Langstroth)',
    category: 'honey',
    subcategory: 'Bee Hives',
    price: 180000,
    unit: 'per hive',
    rating: 4.7,
    reviews: 29,
    inStock: true,
    image: 'https://images.pexels.com/photos/14022966/pexels-photo-14022966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/14022966/pexels-photo-14022966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/14022964/pexels-photo-14022964.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Complete Langstroth bee hive with brood box, 2 supers, 10 frames, queen excluder, and inner/outer covers. Ready for immediate use. Made from durable cedar wood.',
    specs: { 'Type': 'Langstroth 10-frame', 'Material': 'Cedar Wood', 'Includes': 'Brood box, 2 supers, frames, covers', 'Treatment': 'Weather-protected', 'Warranty': '1 year' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'BeeGold Apiaries',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p022',
    name: 'Organic Compost (50kg)',
    category: 'inputs',
    subcategory: 'Compost',
    price: 65000,
    unit: 'per 50kg bag',
    rating: 4.6,
    reviews: 73,
    inStock: true,
    badge: 'Organic',
    image: 'https://images.pexels.com/photos/28214180/pexels-photo-28214180.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/28214180/pexels-photo-28214180.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/12940879/pexels-photo-12940879.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Premium organic compost made from decomposed plant matter and animal manure. Rich in humus and beneficial microbes. Improves soil structure and water retention.',
    specs: { 'Type': 'Organic Compost', 'Weight': '50 kg', 'NPK': '2-1-1 approx', 'pH': '6.5-7.5', 'Coverage': '1 bag per 10 sqm' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'GreenEarth Organics',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p023',
    name: 'Power Sprayer (16L)',
    category: 'equipment',
    subcategory: 'Sprayers',
    price: 240000,
    unit: 'per unit',
    rating: 4.4,
    reviews: 61,
    inStock: true,
    image: 'https://images.pexels.com/photos/20280076/pexels-photo-20280076.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/20280076/pexels-photo-20280076.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Battery-powered 16-liter knapsack sprayer with adjustable nozzle and comfortable shoulder straps. Perfect for applying pesticides, herbicides, and foliar fertilizers.',
    specs: { 'Capacity': '16 Liters', 'Power': 'Rechargeable Battery', 'Pressure': '0.2-0.4 MPa', 'Nozzle': 'Adjustable', 'Battery Life': '4-6 hours' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'AgroMachinery Hub',
    location: 'OCODRI, TEREGO DISTRICT'
  },
  {
    id: 'p024',
    name: 'Fresh Green Zucchini',
    category: 'vegetables',
    subcategory: 'Tomatoes',
    price: 200000,
    unit: 'per 5kg bag',
    rating: 4.5,
    reviews: 44,
    inStock: false,
    image: 'https://images.pexels.com/photos/15487467/pexels-photo-15487467.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/15487467/pexels-photo-15487467.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    description: 'Tender, fresh green zucchini harvested young for maximum flavor. Versatile vegetable great for grilling, roasting, and stir-frying.',
    specs: { 'Size': 'Medium', 'Color': 'Dark Green', 'Packaging': '5kg bags', 'Shelf Life': '7-10 days refrigerated' },
    video: 'https://www.youtube.com/embed/oqTfXGdv7sM',
    seller: 'Greenhouse Gardens',
    location: 'OCODRI, TEREGO DISTRICT'
  }
];

export const blogPosts = [
  {
    id: 'b001',
    title: '10 Tips for Maximizing Maize Yield This Season',
    excerpt: 'Discover proven techniques to boost your maize harvest from soil preparation to harvest timing.',
    image: localImages.field,
    date: 'September 15, 2026',
    author: 'Dr. Adebayo Ogundimu',
    category: 'Crop Management',
    content: 'Maize is one of the most important cereal crops in Africa. To maximize your yield, start with proper soil preparation, choose the right hybrid seeds, and follow a disciplined fertilization and weed control program. In this article, we cover ten essential tips from planting depth to pest management that can help you achieve 4-6 tons per hectare.'
  },
  {
    id: 'b002',
    title: 'The Complete Guide to Drip Irrigation',
    excerpt: 'Learn how drip irrigation can save water, reduce labor, and increase your crop productivity.',
    image: localImages.nature,
    date: 'September 8, 2026',
    author: 'Engr. Funmi Okoye',
    category: 'Irrigation',
    content: 'Drip irrigation delivers water directly to plant roots, reducing evaporation and saving up to 60% compared to flood irrigation. This guide walks you through system components, installation, maintenance, and cost analysis for a 1-acre setup.'
  },
  {
    id: 'b003',
    title: 'Starting a Profitable Poultry Farm in 2026',
    excerpt: 'Everything you need to know about launching a layer or broiler operation from scratch.',
    image: localImages.livestock,
    date: 'August 28, 2026',
    author: 'Mrs. Grace Ibrahim',
    category: 'Livestock',
    content: 'Poultry farming remains one of the most accessible agribusiness ventures. From selecting breeds to housing design, feed management, and disease prevention, this comprehensive guide covers all the essentials for starting a profitable poultry operation.'
  },
  {
    id: 'b004',
    title: 'Organic Farming: Why It Matters and How to Start',
    excerpt: 'The benefits of going organic and practical steps to transition your farm.',
    image: localImages.farm,
    date: 'August 15, 2026',
    author: 'Mr. Chidi Nwosu',
    category: 'Sustainable Farming',
    content: 'Organic farming eliminates synthetic chemicals, improves soil health, and commands premium prices in the market. Learn about composting, natural pest control, crop rotation, and certification processes for organic produce.'
  },
  {
    id: 'b005',
    title: 'Beekeeping 101: Setting Up Your First Apiary',
    excerpt: 'A beginner-friendly guide to starting a beekeeping operation for honey production.',
    image: localImages.harvest,
    date: 'August 2, 2026',
    author: 'Mr. Samuel Eze',
    category: 'Apiculture',
    content: 'Beekeeping is a low-investment, high-return agribusiness. This guide covers hive selection, bee sourcing, site selection, seasonal management, and honey harvesting for beginners.'
  },
  {
    id: 'b006',
    title: 'Understanding Soil pH and Nutrient Management',
    excerpt: 'Why soil testing is the foundation of every successful farming operation.',
    image: localImages.field,
    date: 'July 20, 2026',
    author: 'Dr. Adebayo Ogundimu',
    category: 'Soil Science',
    content: 'Soil pH determines nutrient availability to plants. This article explains how to test your soil, interpret results, and apply amendments to optimize growing conditions for different crops.'
  }
];

export const faqs = [
  { q: 'How do I place an order on ROBZ?', a: 'Browse our marketplace, add products to your cart, and proceed to checkout. You can pay online or choose cash on delivery for eligible items. Our team will confirm your order within 24 hours.' },
  { q: 'What payment methods do you accept?', a: 'We accept bank transfers, debit/credit cards, mobile money, and cash on delivery for orders within select regions. Bulk buyers can arrange credit terms with verified sellers.' },
  { q: 'How long does delivery take?', a: 'Delivery times vary by location. Within major cities, expect 1-3 business days. Rural areas may take 3-7 business days. Livestock and heavy machinery deliveries are scheduled separately.' },
  { q: 'Can I return a product?', a: 'Yes. We offer a 7-day return policy for damaged or incorrect items. Perishable goods must be reported within 24 hours of delivery. Refunds are processed within 5 business days.' },
  { q: 'Do you sell to individual buyers or only businesses?', a: 'ROBZ serves both individual farmers and commercial buyers. Our marketplace is open to everyone, from smallholder farmers to large agribusinesses.' },
  { q: 'How do I become a seller on ROBZ?', a: 'Visit our Contact page and select "Become a Seller." Complete the registration form with your business details and product listings. Our team reviews applications within 3 business days.' },
  { q: 'Are your products certified?', a: 'We verify all sellers and their products. Seeds and inputs are sourced from certified suppliers. Livestock comes with veterinary health certificates. Organic products carry valid certification.' },
  { q: 'Do you offer bulk discounts?', a: 'Yes. Orders above certain thresholds qualify for tiered discounts. Contact the seller directly through our platform for custom bulk pricing on large orders.' }
];

export const testimonials = [
  { name: 'Ibrahim Musa', role: 'Grain Farmer, OCODRI', text: 'ROBZ transformed how I buy seeds and sell my harvest. The platform is easy to use and delivery is always on time. My yield has increased by 40% since I started using their hybrid seeds.', avatar: 'https://images.pexels.com/photos/916406/pexels-photo-916406.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { name: 'Grace Okonkwo', role: 'Poultry Farmer, OCODRI', text: 'I bought my layer chickens from ROBZ and they started laying within two weeks. The quality is excellent and the support team answered all my questions. Highly recommended!', avatar: 'https://images.pexels.com/photos/28753124/pexels-photo-28753124.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { name: 'Yusuf Bello', role: 'Commercial Grower, OCODRI', text: 'The drip irrigation kit I purchased saved me thousands in water costs. My vegetables are healthier and I harvest more frequently. ROBZ is a game-changer for African agriculture.', avatar: 'https://images.pexels.com/photos/9368704/pexels-photo-9368704.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { name: 'Aisha Mohammed', role: 'Beekeeper, OCODRI', text: 'I started my beekeeping business with hives from ROBZ. The quality is outstanding and the honey sells itself. Their blog articles taught me everything I needed to know.', avatar: 'https://images.pexels.com/photos/34705724/pexels-photo-34705724.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' }
];

export const services = [
  { icon: 'truck', title: 'Farm-to-Market Delivery', description: 'Reliable logistics connecting our OCODRI base to local buyers. Cold-chain options for perishables.', image: localImages.farm },
  { icon: 'leaf', title: 'Agronomy Consulting', description: 'Expert advice on crop selection, soil management, and pest control from certified agronomists.', image: 'https://images.pexels.com/photos/4975357/pexels-photo-4975357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: 'shield', title: 'Quality Assurance', description: 'Every product is verified and graded. We ensure you receive exactly what you ordered, every time.', image: 'https://images.pexels.com/photos/5425893/pexels-photo-5425893.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: 'credit-card', title: 'Flexible Financing', description: 'Partner with us for farm credit and equipment leasing. Grow your operation without upfront costs.', image: 'https://images.pexels.com/photos/12955498/pexels-photo-12955498.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { icon: 'users', title: 'Farmer Training', description: 'Free workshops and resources on modern farming techniques in the OCODRI community.', image: localImages.training },
  { icon: 'store', title: 'Market Access', description: 'List your produce and reach thousands of buyers. We handle promotion, payments, and logistics.', image: 'https://images.pexels.com/photos/8827287/pexels-photo-8827287.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' }
];

export const stats = [
  { value: '15,000+', label: 'Active Farmers' },
  { value: '8,500+', label: 'Products Listed' },
  { value: '1', label: 'Local Base' },
  { value: '98%', label: 'Customer Satisfaction' }
];

export const businessInfo = {
  name: 'ROBZ Agribusiness SMC Ltd',
  tagline: 'Farm Inputs, Extension Services & Market Linkages',
  description: 'ROBZ Agribusiness SMC Ltd is a youth-led agribusiness founded on 10 June 2024 at Ocodri Trading Centre, Bileafe Sub-County, Terego District. We serve local farmers, farmer groups, schools, NGOs, and contract farming partners with farm inputs, agronomy consultation, extension services, deliveries, and market linkages that help producers grow, trade, and earn more sustainably.',
  email: 'hello@robzagribusiness.com',
  phone: '+256 700 000 000',
  address: 'Ocodri Trading Centre, Bileafe Sub-County, Terego District, West Nile, Uganda',
  hours: 'Mon - Sat: 8:00 AM - 7:00 PM',
  founded: '2024',
  social: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
};
