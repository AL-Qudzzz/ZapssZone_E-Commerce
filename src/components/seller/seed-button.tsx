"use client";

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import { seedProducts } from '@/lib/seed-data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function SeedButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSeed = async () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, 'products');
      const existingProductsSnapshot = await getDocs(productsRef);

      if (!existingProductsSnapshot.empty) {
        toast({
          title: "Database Not Empty",
          description: "Products collection already contains data. Seeding was skipped to avoid duplicates.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const batch = writeBatch(db);
      seedProducts.forEach((product) => {
        const docRef = doc(collection(db, 'products'));
        batch.set(docRef, product);
      });

      await batch.commit();

      toast({
        title: "Success!",
        description: `${seedProducts.length} products have been added to your database.`,
      });
    } catch (error) {
      console.error("Error seeding database:", error);
      toast({
        title: "Error",
        description: "Failed to seed the database. Check the console for more details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
        <Alert>
            <Database className="h-4 w-4" />
            <AlertTitle>No Products Found?</AlertTitle>
            <AlertDescription>
            Your products collection in Firestore is empty. Click the button below to populate it with sample data so you can test the application. This is a one-time operation.
            </AlertDescription>
        </Alert>

        <Button onClick={handleSeed} disabled={isLoading}>
        {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <Database className="mr-2 h-4 w-4" />
        )}
        Seed Sample Products
        </Button>
    </div>
  );
}
