"use client";

import { usePathname } from "next/navigation";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const getCurrentStep = () => {
    if (pathname.includes("address")) return 1;
    if (pathname.includes("payment")) return 2;
    if (pathname.includes("confirmation")) return 3;
    return 0;
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <CheckoutProgress currentStep={getCurrentStep()} />
      <div className="mt-12">{children}</div>
    </div>
  );
}
