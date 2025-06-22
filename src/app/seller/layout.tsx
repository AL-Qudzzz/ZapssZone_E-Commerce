import { SellerSidebar } from "@/components/layout/seller-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SellerSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/50">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
