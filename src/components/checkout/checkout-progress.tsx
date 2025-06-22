import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type CheckoutProgressProps = {
  currentStep: number;
};

const steps = ["Address", "Payment", "Confirmation"];

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;
          
          return (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2",
                  isCompleted ? "bg-primary border-primary text-primary-foreground" : "",
                  isActive ? "border-primary" : "border-muted",
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
              </div>
              <p className={cn("ml-2 font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                {step}
              </p>
              {index < steps.length - 1 && (
                <div className={cn("flex-auto border-t-2 mx-4", isCompleted ? "border-primary" : "border-muted")} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
