"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RaymondBar } from "./RaymondBar";
import type { LucideIcon } from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon };

export function SpaceShell({
  spaceName,
  spaceTag,
  navItems,
  userName,
  children,
}: {
  spaceName: string;
  spaceTag: string;
  navItems: NavItem[];
  userName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="bg-ink text-white flex flex-col gap-8 px-6 py-8 fixed h-screen w-[260px]">
        <div>
          <div className="font-display text-lg font-semibold">
            Project <span className="text-brand">X</span>
          </div>
          <div className="text-xs text-white/50 mt-0.5">{spaceTag}</div>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/65 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto">
          <Link
            href="/"
            className="text-xs text-white/45 hover:text-white/80 transition-colors"
          >
            ← Changer d'espace
          </Link>
        </div>
      </aside>

      <main className="col-start-2 px-10 py-9 pb-28 max-w-[1240px]">
        {children}
      </main>

      <RaymondBar />
    </div>
  );
}
