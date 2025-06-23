
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Loader2 } from "lucide-react";
import { Product } from "@/lib/placeholder-data";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const sortOptions: { [key: string]: string } = {
  'featured': 'Featured',
  'newest': 'Newest',
  'price-low-high': 'Price: Low to High',
  'price-high-low': 'Price: High to Low',
};

async function getAllProducts() {
  const productsRef = collection(db, 'products');
  const querySnapshot = await getDocs(productsRef);
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() } as Product);
  });
  return products;
}

export default function ProductListing() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const searchQuery = searchParams.get('q');
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [price, setPrice] = useState<number>(1000);
  const [sort, setSort] = useState('featured');
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = await getAllProducts();
      setAllProducts(products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(lowercasedQuery) ||
            (p.description && p.description.toLowerCase().includes(lowercasedQuery))
        );
    }

    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.category));
    }

    products = products.filter(p => p.price <= price);

    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings);
      products = products.filter(p => p.rating >= minRating);
    }

    switch (sort) {
      case 'newest':
        products.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'price-low-high':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
         products.sort((a, b) => {
          const aIsFeatured = a.tags?.includes('featured') ? 1 : 0;
          const bIsFeatured = b.tags?.includes('featured') ? 1 : 0;
          if (aIsFeatured !== bIsFeatured) {
            return bIsFeatured - aIsFeatured;
          }
          return parseInt(a.id) - parseInt(b.id);
        });
        break;
    }

    return products;
  }, [allProducts, selectedCategories, price, selectedRatings, sort, searchQuery]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPrice(value[0]);
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    setSelectedRatings(prev =>
      checked ? [...prev, rating] : prev.filter(r => r !== rating)
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 flex justify-center items-center h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold">
            {searchQuery ? 'Search Results' : 'All Products'}
        </h1>
        {searchQuery ? (
            <p className="text-muted-foreground mt-2">
                Showing results for: <span className="font-semibold text-foreground">"{searchQuery}"</span>
            </p>
        ) : (
            <p className="text-muted-foreground mt-2">Find your next favorite item from our curated collection.</p>
        )}
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
            <div className="sticky top-20">
                <h2 className="text-xl font-headline font-semibold mb-4">Filters</h2>
                <ProductFilters
                  filters={{ price }}
                  selectedCategories={selectedCategories}
                  selectedRatings={selectedRatings}
                  onCategoryChange={handleCategoryChange}
                  onPriceChange={handlePriceChange}
                  onRatingChange={handleRatingChange}
                />
            </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} of {allProducts.length} products</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sort by: {sortOptions[sort]} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.entries(sortOptions).map(([key, value]) => (
                  <DropdownMenuItem key={key} onSelect={() => setSort(key)}>
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator className="mb-6"/>
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
}
