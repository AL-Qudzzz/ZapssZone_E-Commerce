import Link from "next/link";
import { Mountain } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary">
      <div className="mb-6">
        <Link href="/" className="flex items-center space-x-2 text-foreground">
          <Mountain className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline">Polonia</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
