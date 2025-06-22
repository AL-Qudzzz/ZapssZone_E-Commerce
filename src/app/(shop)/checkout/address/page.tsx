import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function AddressPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
          <CardDescription>Enter your address and choose a shipping method.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Anytown" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="id">Indonesia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP / Postal Code</Label>
              <Input id="zip" placeholder="12345" />
            </div>

            <div className="col-span-2">
              <Separator className="my-4"/>
              <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
              <RadioGroup defaultValue="standard" className="space-y-2">
                <Label htmlFor="shipping-standard" className="flex items-center justify-between p-4 border rounded-md has-[:checked]:border-primary">
                  <div>
                    <p className="font-medium">Standard Shipping</p>
                    <p className="text-sm text-muted-foreground">5-7 business days</p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold mr-4">$5.00</p>
                    <RadioGroupItem value="standard" id="shipping-standard" />
                  </div>
                </Label>
                <Label htmlFor="shipping-express" className="flex items-center justify-between p-4 border rounded-md has-[:checked]:border-primary">
                  <div>
                    <p className="font-medium">Express Shipping</p>
                    <p className="text-sm text-muted-foreground">1-3 business days</p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold mr-4">$15.00</p>
                    <RadioGroupItem value="express" id="shipping-express" />
                  </div>
                </Label>
              </RadioGroup>
            </div>

            <div className="col-span-2 flex justify-end mt-4">
              <Button asChild size="lg">
                <Link href="/checkout/payment">Continue to Payment</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
