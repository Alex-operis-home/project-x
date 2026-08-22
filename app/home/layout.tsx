"use client";
import { SpaceShell, NavItem } from "@/components/SpaceShell";
import { RequireAuth } from "@/components/RequireAuth";
import { LayoutDashboard, Home as HomeIcon, Wallet, CalendarClock, FileText, Users2, Bot } from "lucide-react";
import { homeUser } from "@/lib/mock-data";

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/home", icon: LayoutDashboard },
  { label: "Mon projet", href: "/home/projet", icon: HomeIcon },
  { label: "Budget", href: "/home/budget", icon: Wallet },
  { label: "Planning", href: "/home/planning", icon: CalendarClock },
  { label: "Documents", href: "/home/documents", icon: FileText },
  { label: "Intervenants", href: "/home/intervenants", icon: Users2 },
  { label: "Raymond", href: "/home/raymond", icon: Bot },
];

export default function HomeSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <SpaceShell spaceName="home" spaceTag="Espace particulier" navItems={navItems} userName={homeUser.firstName}>
        {children}
      </SpaceShell>
    </RequireAuth>
  );
}
