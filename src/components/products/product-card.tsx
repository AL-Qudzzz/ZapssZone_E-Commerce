import Image from "next/image";
import Link from "next/link";
import { Star, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  'data-ai-hint'?: string;
  tags?: string[];
};

export function ProductCard({ id, name, price, rating, reviews, image, 'data-ai-hint': aiHint, tags }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${id}`} className="block overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={600}
            height={600}
            className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={aiHint}
          />
        </Link>
        {tags && tags.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant={tag === 'sale' ? 'destructive' : 'secondary'} className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-lg hover:text-primary transition-colors">{name}</h3>
        </Link>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{rating}</span>
          </div>
          <span>({reviews} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">${price.toFixed(2)}</p>
        <Button size="icon" variant="ghost" className="text-accent hover:text-accent-foreground">
          <PlusCircle className="h-6 w-6" />
          <span className="sr-only">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
