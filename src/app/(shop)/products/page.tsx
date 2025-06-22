import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold">All Products</h1>
        <p className="text-muted-foreground mt-2">Find your next favorite item from our curated collection.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
            <div className="sticky top-20">
                <h2 className="text-xl font-headline font-semibold mb-4">Filters</h2>
                <ProductFilters />
            </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">Showing 1-12 of 80 products</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sort by: Featured <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Featured</DropdownMenuItem>
                <DropdownMenuItem>Newest</DropdownMenuItem>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator className="mb-6"/>
          <ProductGrid />
        </main>
      </div>
    </div>
  );
}
