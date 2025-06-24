import Link from "next/link";
import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 text-foreground">
              <Mountain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline">Polonia</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover a world of quality and convenience.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Shop</h3>
            <nav className="mt-4 space-y-2 text-sm">
              <Link href="/products" className="block text-muted-foreground hover:text-primary">All Products</Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary">New Arrivals</Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary">Best Sellers</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Support</h3>
            <nav className="mt-4 space-y-2 text-sm">
              <Link href="#" className="block text-muted-foreground hover:text-primary">Contact Us</Link>
              <Link href="/track-order" className="block text-muted-foreground hover:text-primary">Track Your Order</Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary">Returns & Exchanges</Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary">FAQ</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Legal</h3>
            <nav className="mt-4 space-y-2 text-sm">
              <Link href="#" className="block text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link href="/seller/dashboard" className="block text-muted-foreground hover:text-primary">Seller Portal</Link>
            </nav>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Polonia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
