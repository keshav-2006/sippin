// Single source of truth for café content. Menu names, notes and prices are
// transcribed from the supplied menu (public/images/menu-reference.webp) and
// remain demo content pending owner confirmation.

export type MenuCategory = 'Pasta' | 'Pizza' | 'Sweet';
export type MenuItem = { name: string; category: MenuCategory; price: string; note: string; veg: boolean };

export const menuItems: MenuItem[] = [
  { name: 'Peri Peri Pasta', category: 'Pasta', price: '₹190 / ₹210', note: 'A little heat, a lot of comfort', veg: true },
  { name: 'Lemon Pepper Pasta', category: 'Pasta', price: '₹190 / ₹210', note: 'Bright, peppery and fresh', veg: true },
  { name: 'White Sauce Pasta', category: 'Pasta', price: '₹200 / ₹220', note: 'Creamy café comfort', veg: true },
  { name: 'Stir Fry Macaroni', category: 'Pasta', price: '₹170 / ₹190', note: 'A familiar favourite', veg: true },
  { name: 'Spaghetti Aglio e Olio', category: 'Pasta', price: '₹190', note: 'Garlic, olive oil and simplicity', veg: true },
  { name: 'Chilli Garlic Spaghetti', category: 'Pasta', price: '₹190', note: 'Garlicky with a kick', veg: true },
  { name: 'Cheesy Spicy Spaghetti', category: 'Pasta', price: '₹210', note: 'Cheese meets a little fire', veg: true },
  { name: 'Corn Cheese Pizza', category: 'Pizza', price: '₹250', note: 'Sweet corn, golden cheese', veg: true },
  { name: 'Veg Loaded Pizza', category: 'Pizza', price: '₹270', note: 'A colourful, generous topping', veg: true },
  { name: 'Paneer Corn Pizza', category: 'Pizza', price: '₹285', note: 'A café-style classic', veg: true },
  { name: 'Paneer Tikka Pizza', category: 'Pizza', price: '₹295', note: 'Smoky, spiced and satisfying', veg: true },
  { name: 'Peri Peri Chicken Pizza', category: 'Pizza', price: '₹305', note: 'For the spice seekers', veg: false },
  { name: 'Chicken Tikka Pizza', category: 'Pizza', price: '₹315', note: 'A bold, savoury favourite', veg: false },
  { name: 'Chicken Sausage Pizza', category: 'Pizza', price: '₹300', note: 'A familiar comfort bite', veg: false },
  { name: 'BBQ Chicken Pizza', category: 'Pizza', price: '₹350', note: 'Smoky and rich', veg: false },
  { name: 'Double Chicken Pizza', category: 'Pizza', price: '₹360', note: 'Made for bigger appetites', veg: false },
  { name: 'Special Pizza', category: 'Pizza', price: '₹380', note: 'The house special', veg: false },
  { name: 'Waffles with Chocolate Sauce', category: 'Sweet', price: '₹110', note: 'Crisp edges, chocolate finish', veg: true },
  { name: 'Waffles with Ice Cream', category: 'Sweet', price: '₹140', note: 'Warm and cool in every bite', veg: true },
  { name: 'Honey Pancakes', category: 'Sweet', price: '₹120', note: 'Soft stacks with honey', veg: true },
  { name: 'Pancakes with Chocolate Sauce', category: 'Sweet', price: '₹130', note: 'A little sweet pause', veg: true },
  { name: 'Nutella Waffles', category: 'Sweet', price: '₹170', note: 'A chocolate-lover favourite', veg: true },
];

export const filters = ['All', 'Pasta', 'Pizza', 'Sweet'] as const;
export type Filter = (typeof filters)[number];

export const nav = [
  { label: 'Our story', href: '#story' },
  { label: 'The menu', href: '#menu' },
  { label: 'The space', href: '#space' },
  { label: 'Find us', href: '#visit' },
];

export const INSTAGRAM_URL = 'https://www.instagram.com/sippinstories23/';
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Sippin%27+Stories+Cafe';

