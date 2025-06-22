import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/placeholder-data";
import { ProductCard } from "@/components/products/product-card";
import { HeroSlideshow } from "@/components/home/hero-slideshow";

export default function HomePage() {
  const featuredProducts = products.filter(p => p.tags?.includes('featured')).slice(0, 4);

  return (
    <>
      <HeroSlideshow />

      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-headline font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-headline font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {['Electronics', 'Fashion', 'Home Goods', 'Sports', 'Groceries'].map((category) => (
              <Link href={`/products?category=${category}`} key={category}>
                <Card className="overflow-hidden group transition-shadow hover:shadow-xl">
                  <CardContent className="p-0">
                    <Image
                      src={`https://placehold.co/400x300`}
                      alt={category}
                      width={400}
                      height={300}
                      className="w-full object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={category.toLowerCase()}
                    />
                    <div className="p-4 bg-background">
                      <h3 className="font-semibold text-center">{category}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
