import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TrackOrderPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Track Your Order</CardTitle>
            <CardDescription>Enter your tracking number below to see the status of your shipment.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trackingNumber">Tracking Number</Label>
                <Input id="trackingNumber" placeholder="e.g., ZAP12345XYZ" />
              </div>
              <Button type="submit" className="w-full">Track</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
