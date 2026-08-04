"use client";
import { SpaceShell, NavItem } from "@/components/SpaceShell";
import { RequireAuth } from "@/components/RequireAuth";
import { Gauge, Users, HardHat, Wallet, FileText, Zap, Bot } from "lucide-react";
import { proUser } from "@/lib/mock-data";

const navItems: NavItem[] = [
  { label: "Cockpit dirigeant", href: "/pro", icon: Gauge },
  { label: "Clients", href: "/pro/clients", icon: Users },
  { label: "Chantiers", href: "/pro/chantiers", icon: HardHat },
  { label: "Budget / rentabilité", href: "/pro/budget", icon: Wallet },
  { label: "Documents", href: "/pro/documents", icon: FileText },
  { label: "Actions automatiques", href: "/pro/actions", icon: Zap },
  { label: "Raymond", href: "/pro/raymond", icon: Bot },
];

export default function ProSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <SpaceShell spaceName="pro" spaceTag="Espace constructeur" navItems={navItems} userName={proUser.firstName}>
        {children}
      </SpaceShell>
    </RequireAuth>
  );
}
