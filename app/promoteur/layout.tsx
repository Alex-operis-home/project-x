"use client";
import { SpaceShell, NavItem } from "@/components/SpaceShell";
import { RequireAuth } from "@/components/RequireAuth";
import { Briefcase, Building2, LineChart, ShoppingBag, ClipboardList, FileText, Bot } from "lucide-react";
import { promoteurUser } from "@/lib/mock-data";

const navItems: NavItem[] = [
  { label: "Vue portefeuille", href: "/promoteur", icon: Briefcase },
  { label: "Opérations", href: "/promoteur/operations", icon: Building2 },
  { label: "Financier", href: "/promoteur/financier", icon: LineChart },
  { label: "Commercialisation", href: "/promoteur/commercialisation", icon: ShoppingBag },
  { label: "Administratif", href: "/promoteur/administratif", icon: ClipboardList },
  { label: "Documents", href: "/promoteur/documents", icon: FileText },
  { label: "Raymond", href: "/promoteur/raymond", icon: Bot },
];

export default function PromoteurSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <SpaceShell spaceName="promoteur" spaceTag="Espace promoteur" navItems={navItems} userName={promoteurUser.firstName}>
        {children}
      </SpaceShell>
    </RequireAuth>
  );
}
