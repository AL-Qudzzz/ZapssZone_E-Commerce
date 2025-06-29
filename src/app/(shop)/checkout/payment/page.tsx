
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Landmark, Wallet, Loader2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function PaymentPage() {
  const { cartTotal, createOrder, loading: cartLoading } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const shipping = cartTotal > 0 ? 5.00 : 0;
  const total = cartTotal + shipping;

  const handlePayment = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed with the payment.",
        variant: "destructive"
      });
      router.push('/login?redirect=/checkout/payment');
      return;
    }

    if (total > 0) {
      createOrder();
      router.push('/checkout/confirmation');
    }
  };

  const isLoading = cartLoading || authLoading;

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Select a payment method and enter your details.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="credit-card" className="space-y-4">
              <div>
                <Label htmlFor="payment-cc" className="flex items-center p-4 border rounded-t-md has-[:checked]:border-primary">
                  <CreditCard className="mr-3 h-6 w-6 text-muted-foreground" />
                  <span className="font-medium">Credit Card</span>
                  <RadioGroupItem value="credit-card" id="payment-cc" className="ml-auto" />
                </Label>
                <div className="p-6 border border-t-0 rounded-b-md space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="**** **** **** 1234" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="save-card" />
                    <Label htmlFor="save-card" className="font-normal">Save card for future purchases</Label>
                  </div>
                </div>
              </div>

              <Label htmlFor="payment-va" className="flex items-center p-4 border rounded-md has-[:checked]:border-primary">
                <Landmark className="mr-3 h-6 w-6 text-muted-foreground" />
                <span className="font-medium">Virtual Account</span>
                <RadioGroupItem value="virtual-account" id="payment-va" className="ml-auto" />
              </Label>
              <Label htmlFor="payment-ewallet" className="flex items-center p-4 border rounded-md has-[:checked]:border-primary">
                <Wallet className="mr-3 h-6 w-6 text-muted-foreground" />
                <span className="font-medium">E-Wallet</span>
                <RadioGroupItem value="e-wallet" id="payment-ewallet" className="ml-auto" />
              </Label>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
             {isLoading ? (
              <div className="flex justify-center items-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
            <>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2 flex justify-between mt-4">
        <Button variant="ghost" asChild>
          <Link href="/checkout/address">Back to Address</Link>
        </Button>
        <Button onClick={handlePayment} size="lg" disabled={total === 0 || isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Pay ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
}
