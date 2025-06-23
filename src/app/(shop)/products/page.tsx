
import { Suspense } from 'react';
import ProductListing from '@/components/products/product-listing';
import { Loader2 } from 'lucide-react';

function Loading() {
  return (
      <div className="container mx-auto px-6 py-8 flex justify-center items-center h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductListing />
    </Suspense>
  );
}
