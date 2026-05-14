import { Shell } from "@/components/shell";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
