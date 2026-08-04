import Link from "next/link";

const spaces = [
  {
    href: "/login",
    title: "Project X Home",
    audience: "Particulier",
    desc: "Suivre la construction de sa maison sans stress, étape par étape.",
  },
  {
    href: "/login",
    title: "Project X Pro",
    audience: "Constructeur / entreprise du bâtiment",
    desc: "Piloter tous ses chantiers et protéger sa marge, sans rien laisser filer.",
  },
  {
    href: "/login",
    title: "Project X Promoteur",
    audience: "Promoteur immobilier",
    desc: "Un directeur d'opération augmenté sur l'ensemble du portefeuille.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <div className="mb-12 text-center">
          <div className="font-display text-2xl font-semibold mb-2">
            Project <span className="text-brand">X</span>
          </div>
          <p className="text-ink-soft">Choisissez votre espace de démonstration.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {spaces.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-surface border border-line rounded-xl2 shadow-card p-7 hover:shadow-floating hover:-translate-y-0.5 transition-all"
            >
              <div className="text-xs font-semibold text-brand uppercase tracking-wide mb-3">{s.audience}</div>
              <h2 className="font-display text-xl font-semibold mb-2">{s.title}</h2>
              <p className="text-sm text-ink-soft leading-relaxed">{s.desc}</p>
              <div className="mt-5 text-sm font-semibold text-ink group-hover:text-brand transition-colors">
                Ouvrir →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
