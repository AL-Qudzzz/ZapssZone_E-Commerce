import { Product } from '@/lib/placeholder-data';

export const seedProducts: Omit<Product, 'id'>[] = [
  {
    name: 'Elegant Smartwatch',
    category: 'Electronics',
    price: 249.99,
    rating: 4.8,
    reviews: 1500,
    image: 'https://placehold.co/600x600',
    'data-ai-hint': 'smartwatch product',
    tags: ['featured', 'sale'],
    description: 'Stay connected and track your fitness with this stylish and powerful smartwatch. Features a long-lasting battery, vibrant display, and a host of health monitoring tools.'
  },
  {
    name: 'Wireless Noise-Cancelling Headphones',
    category: 'Electronics',
    price: 349.00,
    rating: 4.9,
    reviews: 2100,
    image: 'https://placehold.co/600x600',
    'data-ai-hint': 'headphones product',
    tags: ['featured'],
    description: 'Immerse yourself in pure sound with these premium noise-cancelling headphones. Enjoy crystal-clear audio, all-day comfort, and seamless Bluetooth connectivity.'
  },
  {
    name: 'Organic Green Tea',
    category: 'Groceries',
    price: 12.50,
    rating: 4.6,
    reviews: 350,
    image: 'https://placehold.co/600x600',
    'data-ai-hint': 'tea box',
    tags: [],
    description: 'A refreshing and antioxidant-rich organic green tea. Sourced from the finest tea gardens, this tea offers a smooth, delicate flavor and a host of health benefits.'
  },
  {
    name: 'Modern Minimalist Desk Lamp',
    category: 'Home Goods',
    price: 79.95,
    rating: 4.7,
    reviews: 600,
    image: 'https://placehold.co/600x600',
    'data-ai-hint': 'desk lamp',
    tags: [],
    description: 'Illuminate your workspace with this sleek and modern LED desk lamp. Features adjustable brightness levels and a minimalist design that complements any decor.'
  },
  {
    name: 'Cozy Cashmere Throw Blanket',
    category: 'Home Goods',
    price: 149.99,
    rating: 4.9,
    reviews: 420,
    image: 'https://placehold.co/600x600',
    'data-ai-hint': 'cashmere blanket',
    tags: ['new'],
    description: 'Wrap yourself in ultimate comfort with this luxuriously soft cashmere throw blanket. Perfect for cozy nights in, adding a touch of elegance to your living space.'
  },
  {
    name: 'Classic Leather Jacket',
    category: 'Fashion',
    price: 299.00,
    rating: 4.8,
    reviews: 890,
    image: 'https://placehold.co/600x600',
    'data-ai-hint': 'leather jacket',
    tags: ['featured'],
    description: 'A timeless wardrobe staple, this classic leather jacket is crafted from premium genuine leather. Its versatile design adds an edge to any outfit, from casual to chic.'
  },
  {
    name: 'Lightweight Running Shoes',
    category: 'Fashion',
    price: 129.50,
    rating: 4.7,
    reviews: 1250,
    image: 'https://placehold.co/600x600',
    'data-ai-hint': 'running shoes',
    tags: ['sale'],
    description: 'Enhance your performance with these lightweight and responsive running shoes. Engineered for comfort and speed, they provide excellent cushioning and support.'
  },
  {
    name: 'Professional Yoga Mat',
    category: 'Sports',
    price: 69.99,
    rating: 4.9,
    reviews: 980,
    image: 'https://placehold.co/600x600',
    'data-ai-hint': 'yoga mat',
    tags: [],
    description: 'Find your flow with this premium, non-slip yoga mat. Its dense cushioning provides superior joint protection, while the textured surface ensures a stable grip for any pose.'
  },
];
