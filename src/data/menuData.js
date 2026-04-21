// ─────────────────────────────────────────────────────────────────────────────
//  menuData.js  –  Gold Catering  –  Content Store
//
//  HOW TO ADD YOUR OWN IMAGES
//  ──────────────────────────
//  Option A (public folder):
//    1. Put your image in  /public/images/my-photo.jpg
//    2. Set  image: '/images/my-photo.jpg'
//
//  Option B (src/assets):
//    1. Put your image in  /src/assets/my-photo.jpg
//    2. Import it at the top of this file:
//         import myPhoto from '../assets/my-photo.jpg'
//    3. Set  image: myPhoto
//
//  HOW TO ADD YOUR OWN VIDEOS
//  ──────────────────────────
//    1. Put your .mp4 in  /public/videos/my-video.mp4
//    2. Set  video: '/videos/my-video.mp4'   on the relevant service card
// ─────────────────────────────────────────────────────────────────────────────

// ── Brand / general info ──────────────────────────────────────────────────────
export const brandInfo = {
  name:        'Gold Catering',
  tagline:     'Exquisite Flavours, Unforgettable Moments',
  description: 'Premium catering services crafted with passion. From intimate gatherings to grand celebrations, we deliver culinary excellence that delights every guest.',
  phone:       '+998 99 122 69 60',
  email:       'hello@goldcatering.uz',
  address:     'Tashkent, Uzbekistan',
  instagram:   'https://instagram.com/goldcatering',
  facebook:    'https://facebook.com/goldcatering',
  // Hero background image — replace with your own (see instructions above)
  heroBg:      null,   // e.g.  '/images/hero-bg.jpg'
}

// ── Navigation links ──────────────────────────────────────────────────────────
export const navLinks = [
  { label: 'Home',     href: '#home'    },
  { label: 'About',    href: '#about'   },
  { label: 'Services', href: '#services'},
  { label: 'Menu',     href: '#menu'    },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Contact',  href: '#contact' },
]

// ── Services ──────────────────────────────────────────────────────────────────
export const services = [
  {
    id:          1,
    title:       'Wedding Banquets',
    description: 'Elegant multi-course meals tailored to your love story. From intimate 20-person dinners to grand 500-person receptions.',
    icon:        '💍',
    // video: '/videos/wedding.mp4',   // optional: add a short promo video
    image:       null,   // replace with '/images/wedding.jpg'
  },
  {
    id:          2,
    title:       'Corporate Events',
    description: 'Professional service for conferences, product launches, and team celebrations. We handle every detail.',
    icon:        '🏢',
    image:       null,   // replace with '/images/corporate.jpg'
  },
  {
    id:          3,
    title:       'Private Parties',
    description: 'Birthday gatherings, anniversaries, and family events made extraordinary with personalised menus.',
    icon:        '🎉',
    image:       null,   // replace with '/images/party.jpg'
  },
  {
    id:          4,
    title:       'Outdoor Catering',
    description: 'Full setup for outdoor events with premium equipment, live cooking stations, and décor.',
    icon:        '🌿',
    image:       null,   // replace with '/images/outdoor.jpg'
  },
  {
    id:          5,
    title:       'Dessert Tables',
    description: 'Stunning sweet spreads featuring handcrafted pastries, cakes, and confections.',
    icon:        '🍰',
    image:       null,   // replace with '/images/dessert.jpg'
  },
  {
    id:          6,
    title:       'Live Stations',
    description: 'Interactive cooking stations — sushi, pasta, grill — that entertain and delight guests.',
    icon:        '👨‍🍳',
    image:       null,   // replace with '/images/live.jpg'
  },
]

// ── Menu items ────────────────────────────────────────────────────────────────
export const menuCategories = [
  {
    id:    'starters',
    label: 'Starters',
    items: [
      { id: 101, name: 'Bruschetta Trio',         price: '45,000',  description: 'Tomato, olive tapenade & whipped ricotta on artisan bread.', image: null },
      { id: 102, name: 'Smoked Salmon Canapés',   price: '58,000',  description: 'Norwegian salmon with dill crème fraîche on blinis.',         image: null },
      { id: 103, name: 'Stuffed Mushrooms',        price: '38,000',  description: 'Herb-cream cheese & sun-dried tomato filling.',                image: null },
      { id: 104, name: 'Charcuterie Board',        price: '120,000', description: 'Cured meats, artisan cheeses, nuts & seasonal fruits.',        image: null },
    ],
  },
  {
    id:    'mains',
    label: 'Main Course',
    items: [
      { id: 201, name: 'Rack of Lamb',             price: '185,000', description: 'Rosemary & garlic crust with red wine jus & roasted vegetables.', image: null },
      { id: 202, name: 'Roasted Chicken Supreme',  price: '95,000',  description: 'Free-range chicken with truffle butter & potato gratin.',         image: null },
      { id: 203, name: 'Beef Tenderloin',           price: '220,000', description: 'Prime tenderloin with béarnaise sauce & asparagus tips.',          image: null },
      { id: 204, name: 'Vegetarian Wellington',    price: '88,000',  description: 'Mushroom duxelles & spinach in golden puff pastry.',               image: null },
      { id: 205, name: 'Grilled Sea Bass',         price: '145,000', description: 'Mediterranean herb marinade with caponata & lemon butter.',         image: null },
    ],
  },
  {
    id:    'desserts',
    label: 'Desserts',
    items: [
      { id: 301, name: 'Dark Chocolate Fondant',  price: '42,000',  description: 'Warm molten centre with vanilla bean ice cream.',             image: null },
      { id: 302, name: 'Crème Brûlée',            price: '38,000',  description: 'Classic French custard with caramelised sugar crust.',         image: null },
      { id: 303, name: 'Mango Panna Cotta',        price: '35,000',  description: 'Silky Italian cream set with fresh mango coulis.',             image: null },
      { id: 304, name: 'Macaron Tower',            price: '250,000', description: 'Signature display tower — 60 assorted French macarons.',        image: null },
    ],
  },
  {
    id:    'drinks',
    label: 'Beverages',
    items: [
      { id: 401, name: 'Signature Mocktail Pack', price: '65,000',  description: 'Set of 4 house mocktails — berry, citrus, cucumber & rose.',   image: null },
      { id: 402, name: 'Premium Tea Station',      price: '55,000',  description: 'Selection of 8 fine loose-leaf teas with accompaniments.',     image: null },
      { id: 403, name: 'Fresh Juice Bar',          price: '75,000',  description: 'Cold-pressed seasonal juices served per guest.',               image: null },
    ],
  },
]

// ── Gallery images ────────────────────────────────────────────────────────────
// Replace null values with your image paths, e.g. '/images/gallery-1.jpg'
export const galleryImages = [
  { id: 1, image: null, alt: 'Elegant table setting'          },
  { id: 2, image: null, alt: 'Gourmet appetiser platter'       },
  { id: 3, image: null, alt: 'Wedding banquet hall'            },
  { id: 4, image: null, alt: 'Live cooking station'            },
  { id: 5, image: null, alt: 'Dessert table display'           },
  { id: 6, image: null, alt: 'Outdoor garden reception'        },
]

// ── Testimonials ──────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id:     1,
    name:   'Aziza Karimova',
    role:   'Bride',
    text:   'Gold Catering turned our wedding into a dream. Every dish was flawless and the staff were impeccable.',
    rating: 5,
  },
  {
    id:     2,
    name:   'Timur Rashidov',
    role:   'CEO, TechVentures UZ',
    text:   'Our product launch dinner was a resounding success. The team handled 200 guests with effortless professionalism.',
    rating: 5,
  },
  {
    id:     3,
    name:   'Dilnoza Yusupova',
    role:   'Event Planner',
    text:   'I recommend Gold Catering to every client. Consistent quality, beautiful presentation, and always on time.',
    rating: 5,
  },
]

// ── Stats (About section) ─────────────────────────────────────────────────────
export const stats = [
  { value: '500+', label: 'Events Catered'   },
  { value: '12',   label: 'Years Experience' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '40+',  label: 'Expert Chefs'     },
]
