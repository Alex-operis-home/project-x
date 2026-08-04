"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { RaymondBar } from "./RaymondBar";
import { supabase } from "@/lib/supabase/client";
import type { LucideIcon } from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon };

export function SpaceShell({
  spaceName,
  spaceTag,
  navItems,
  userName,
  children,
}: {
  spaceName: "home" | "pro" | "promoteur";
  spaceTag: string;
  navItems: NavItem[];
  userName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen md:grid md:grid-cols-[260px_1fr]">
      {/* Barre mobile */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-ink text-white px-4 py-3.5">
        <div className="font-display text-base font-semibold">
          Project <span className="text-brand">X</span>
        </div>
        <button onClick={() => setOpen(true)} aria-label="Ouvrir le menu">
          <Menu size={22} />
        </button>
      </div>

      {/* Fond assombri quand le menu mobile est ouvert */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar : tiroir sur mobile, fixe sur desktop */}
      <aside
        className={`bg-ink text-white flex flex-col gap-8 px-6 py-8 fixed h-screen w-[260px] z-50 transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-lg font-semibold">
              Project <span className="text-brand">X</span>
            </div>
            <div className="text-xs text-white/50 mt-0.5">{spaceTag}</div>
          </div>
          <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Fermer le menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
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
        <div className="mt-auto space-y-2">
          <Link href="/" className="block text-xs text-white/45 hover:text-white/80 transition-colors">
            ← Changer d'espace
          </Link>
          <button
            onClick={async () => {
              if (supabase) await supabase.auth.signOut();
              router.push("/login");
            }}
            className="text-xs text-white/45 hover:text-white/80 transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </aside>

      <main className="md:col-start-2 px-4 py-6 md:px-10 md:py-9 pb-32 max-w-[1240px]">
        {children}
      </main>

      <RaymondBar space={spaceName} />
    </div>
  );
}
