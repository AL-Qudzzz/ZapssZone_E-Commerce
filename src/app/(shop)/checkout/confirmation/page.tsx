"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/placeholder-data";
import { useCart } from "@/context/cart-context";

export default function ConfirmationPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const orderItems = products.slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="text-center p-8">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-3xl font-headline font-bold">Thank You for Your Order!</h1>
        <p className="text-muted-foreground mt-2">
          Your order #ZAP12345 has been placed successfully. A confirmation email has been sent to your address.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/track-order">Track Your Order</Link>
          </Button>
        </div>
      </Card>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" data-ai-hint={item['data-ai-hint']} />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: 1</p>
                  </div>
                </div>
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>$329.98</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>$15.00</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Taxes</span><span>$27.60</span></div>
            <Separator className="my-2"/>
            <div className="flex justify-between font-bold text-lg"><span >Total</span><span>$372.58</span></div>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Shipping To</h4>
                <p className="text-muted-foreground text-sm">John Doe<br/>123 Main St<br/>Anytown, USA 12345</p>
              </div>
              <div>
                <h4 className="font-semibold">Payment Method</h4>
                <p className="text-muted-foreground text-sm">Credit Card ending in 1234</p>
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
