
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  'data-ai-hint'?: string;
  tags?: string[];
  description?: string; // Adding description field
};

export const categories = [
  { name: 'Electronics', count: 2 },
  { name: 'Groceries', count: 1 },
  { name: 'Home Goods', count: 2 },
  { name: 'Fashion', count: 2 },
  { name: 'Sports', count: 1 },
  { name: 'Books', count: 0 },
];
