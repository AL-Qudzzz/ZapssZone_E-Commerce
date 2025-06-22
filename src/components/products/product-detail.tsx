
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, Plus, Minus } from "lucide-react";
import type { Product } from "@/lib/placeholder-data";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import { Input } from "../ui/input";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="rounded-lg object-cover w-full aspect-square"
            data-ai-hint={product['data-ai-hint']}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-lg">{product.rating}</span>
            </div>
            <span>({product.reviews} reviews)</span>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-primary font-medium">{product.category}</span>
          </div>
          <p className="mt-6 text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <Separator className="my-6" />
          <p className="text-muted-foreground leading-relaxed">
            {product.description || "No description available for this product. But it's probably great."}
          </p>
          <Separator className="my-6" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Minus className="h-4 w-4" />
                </Button>
                <Input type="number" value={quantity} className="w-16 h-10 text-center" readOnly />
                <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setQuantity(q => q + 1)}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
