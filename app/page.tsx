import Link from "next/link";
import { Brain, Search, ShieldCheck, Zap, Target, Home, HardHat, Building2, Check, ArrowRight, Sparkles, Lock } from "lucide-react";

const benefits = [
  { icon: Brain, title: "Des données fiables", text: "Vos projets, vos documents, vos chiffres, en un seul endroit." },
  { icon: Search, title: "Une analyse puissante", text: "L'IA détecte les risques, les opportunités et les écarts." },
  { icon: ShieldCheck, title: "Des recommandations claires", text: "Sachez quoi faire, et quand le faire." },
  { icon: Zap, title: "Une prise de décision éclairée", text: "Gagnez du temps, limitez les imprévus." },
  { icon: Target, title: "Des résultats concrets", text: "Des projets plus sûrs, plus rentables, plus sereins." },
];

const offers = [
  {
    icon: Home, name: "Particulier", tagline: "Votre projet immobilier dans votre poche.",
    desc: "Construisez votre maison avec plus de visibilité, moins de stress et un copilote IA à vos côtés.",
    points: ["Suivi de projet simple et clair", "Alertes et conseils personnalisés", "Budget et planning maîtrisés"],
    price: "9,90", cta: "Commencer mon projet", href: "/login?espace=home", banner: "from-brand-soft to-emerald-100",
  },
  {
    icon: HardHat, name: "Constructeur", tagline: "Vos chantiers. Sous contrôle.",
    desc: "Pilotez vos chantiers, vos clients et vos risques avec un copilote IA métier.",
    points: ["Gestion des chantiers et des clients", "Suivi budget et planning", "Alertes et analyse des risques"],
    price: "149", cta: "Démarrer mon espace Pro", href: "/login?espace=pro", banner: "from-amber-100 to-brand-soft",
  },
  {
    icon: Building2, name: "Promoteur", tagline: "Votre portefeuille. Votre marge. Vos décisions.",
    desc: "Pilotez vos opérations et anticipez les risques avant qu'ils ne coûtent cher.",
    points: ["Vision globale de votre portefeuille", "Analyse financière et rentabilité", "Alertes et recommandations IA"],
    price: "249", cta: "Analyser mes opérations", href: "/login?espace=promoteur", banner: "from-sky-100 to-brand-soft",
  },
];

function ScoreRing() {
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - 0.82);
  return (
    <div className="relative w-[84px] h-[84px] flex-shrink-0">
      <svg width="84" height="84" viewBox="0 0 84 84" className="-rotate-90">
        <circle cx="42" cy="42" r={r} fill="none" stroke="#E3E9E6" strokeWidth="7" />
        <circle cx="42" cy="42" r={r} fill="none" stroke="#0F6E4A" strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-semibold text-ink leading-none">82</span>
        <span className="text-[9px] text-ink-soft">/100</span>
      </div>
    </div>
  );
}

function Mascot() {
  return (
    <div className="animate-floaty w-20 h-20 rounded-full bg-brand-soft shadow-floating flex items-center justify-center ring-4 ring-white">
      <div className="w-12 h-10 rounded-2xl bg-ink flex items-center justify-center gap-2 relative">
        <span className="w-2 h-2.5 rounded-full bg-emerald-300" />
        <span className="w-2 h-2.5 rounded-full bg-emerald-300" />
        <span className="absolute bottom-1.5 w-4 h-1.5 border-b-2 border-emerald-300 rounded-b-full" />
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="relative">
      <div className="bg-surface border border-line rounded-2xl shadow-floating p-5 w-full max-w-[520px]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-ink-soft">Mon projet</div>
            <div className="font-display font-semibold">Villa des Pins</div>
          </div>
          <span className="text-[10px] font-semibold text-brand bg-brand-soft px-2 py-1 rounded-full">Indice de maîtrise</span>
        </div>
        <div className="flex items-center gap-5 mb-4">
          <ScoreRing />
          <ul className="space-y-1.5 text-xs">
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-signal-red" />1 risque critique</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-signal-orange" />3 points de vigilance</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-signal-green" />12 éléments maîtrisés</li>
          </ul>
        </div>
        <div className="rounded-xl border border-brand/20 bg-brand-soft/60 p-3.5 mb-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand mb-1"><Sparkles size={12} />Raymond recommande</div>
          <p className="text-sm text-ink leading-snug">Votre budget présente un <span className="text-signal-red font-semibold">risque de dérive de 8 à 12 %</span>.</p>
          <p className="text-[11px] text-ink-soft mt-1">Cause principale : hausse estimée du coût travaux.</p>
          <div className="flex gap-2 mt-3">
            <Link href="/login?espace=home" className="text-xs font-semibold px-3 py-1.5 rounded-full border border-brand text-brand bg-white">Comprendre</Link>
            <Link href="/login?espace=home" className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand text-white">Agir</Link>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="rounded-lg border border-line p-2"><div className="text-[10px] text-ink-soft">Budget</div><div className="font-display text-sm font-semibold">2,4 M€</div></div>
          <div className="rounded-lg border border-line p-2"><div className="text-[10px] text-ink-soft">Planning</div><div className="font-display text-sm font-semibold">En cours</div></div>
          <div className="rounded-lg border border-line p-2"><div className="text-[10px] text-ink-soft">Documents</div><div className="font-display text-sm font-semibold">24</div></div>
          <div className="rounded-lg border border-line p-2"><div className="text-[10px] text-ink-soft">Alertes</div><div className="font-display text-sm font-semibold text-signal-red">1</div></div>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-4 md:-left-10"><Mascot /></div>
      <div className="hidden lg:block absolute -right-10 top-10 w-[150px] bg-surface border border-line rounded-3xl shadow-floating p-3">
        <div className="text-[10px] text-ink-soft mb-2">Projet X</div>
        <div className="rounded-xl bg-signal-red-soft p-2.5">
          <div className="text-[9px] font-semibold text-signal-red">Raymond vous alerte</div>
          <div className="text-[11px] font-semibold text-signal-red mt-0.5">Risque de dérive budgétaire 8 à 12 %</div>
        </div>
        <div className="mt-2 rounded-xl bg-gradient-to-br from-brand-soft to-emerald-100 h-16" />
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center font-display font-bold">X</span>
            <span className="font-display text-xl font-semibold">Projet <span className="text-brand">X</span></span>
            <span className="hidden xl:block text-xs text-ink-soft">Le copilote IA de vos projets immobiliers</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            <a href="#top" className="font-semibold text-brand border-b-2 border-brand pb-1">Accueil</a>
            <a href="#fonctionnalites" className="text-ink-soft hover:text-ink transition-colors">Fonctionnalités</a>
            <a href="#tarifs" className="text-ink-soft hover:text-ink transition-colors">Tarifs</a>
            <a href="#apropos" className="text-ink-soft hover:text-ink transition-colors">À propos</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-ink hover:text-brand transition-colors">Se connecter</Link>
            <Link href="/login?espace=home" className="text-sm font-semibold bg-brand text-white px-5 py-2.5 rounded-full hover:bg-brand-dark transition-colors">Commencer</Link>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-24 grid lg:grid-cols-2 gap-14 items-center">
          <div className="animate-fade-up">
            <span className="inline-block text-[11px] font-bold tracking-widest text-brand bg-brand-soft px-3 py-1 rounded-full mb-6">PROJET X</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Le copilote IA de vos projets <span className="text-brand">immobiliers.</span>
            </h1>
            <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-md">
              Anticipez les risques. Sécurisez vos décisions. Sachez quoi faire maintenant.
            </p>
            <Link href="/login?espace=home" className="mt-8 inline-flex items-center gap-2 bg-brand text-white font-semibold px-7 py-3.5 rounded-full hover:bg-brand-dark transition-colors shadow-card">
              Découvrir Projet X <ArrowRight size={18} />
            </Link>
            <div className="mt-8 flex items-center gap-5 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5"><Lock size={14} className="text-brand" />Vos données sont sécurisées</span>
              <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-brand" />Propulsé par l'IA</span>
            </div>
          </div>
          <div className="animate-fade-up flex justify-center lg:justify-end lg:pr-8">
            <DashboardPreview />
          </div>
        </div>
      </section>

      <section id="fonctionnalites" className="bg-white border-y border-line">
        <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-soft text-brand flex items-center justify-center mb-4"><Icon size={26} /></div>
                <h3 className="font-semibold text-sm">{b.title}</h3>
                <p className="text-xs text-ink-soft mt-2 leading-relaxed">{b.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="tarifs" className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest text-ink-soft mb-3">TROIS UNIVERS, UNE SEULE VISION</div>
          <h2 className="font-display text-4xl font-bold">Un Projet X pour chaque besoin</h2>
          <p className="text-ink-soft mt-4 max-w-xl mx-auto">Que vous soyez particulier, professionnel ou promoteur, Projet X s'adapte à votre réalité et vous donne les clés pour réussir.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((o) => {
            const Icon = o.icon;
            return (
              <div key={o.name} className="bg-surface rounded-2xl border border-line shadow-card overflow-hidden flex flex-col hover:shadow-floating transition-shadow">
                <div className={`h-36 bg-gradient-to-br ${o.banner} relative`}>
                  <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-full bg-white shadow-card flex items-center justify-center text-brand"><Icon size={26} /></div>
                </div>
                <div className="p-6 pt-10 flex flex-col flex-1">
                  <h3 className="font-display text-2xl font-semibold">{o.name}</h3>
                  <p className="font-semibold text-sm mt-1">{o.tagline}</p>
                  <p className="text-sm text-ink-soft mt-2 leading-relaxed">{o.desc}</p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {o.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm"><Check size={16} className="text-brand flex-shrink-0" />{p}</li>
                    ))}
                  </ul>
                  <div className="mt-6 text-sm text-ink-soft">À partir de <span className="font-bold text-ink text-base">{o.price} €/mois</span></div>
                  <Link href={o.href} className="mt-3 inline-flex items-center justify-center gap-2 bg-brand text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-brand-dark transition-colors">
                    {o.cta} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="apropos" className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-5 py-16 text-center">
          <div className="w-10 h-0.5 bg-brand mx-auto mb-6" />
          <h2 className="font-display text-3xl font-semibold">Rejoignez les premiers utilisateurs</h2>
          <p className="text-white/70 mt-3 max-w-lg mx-auto text-sm">Les logiciels vous montrent ce qui se passe. Projet X vous aide à comprendre ce qui risque de se passer et quoi faire maintenant.</p>
          <Link href="/login?espace=home" className="mt-7 inline-flex items-center gap-2 bg-brand text-white font-semibold px-7 py-3.5 rounded-full hover:bg-brand-dark transition-colors">
            Commencer <ArrowRight size={18} />
          </Link>
          <div className="mt-12 text-xs text-white/40">© Projet X — Le copilote IA de vos projets immobiliers</div>
        </div>
      </section>
    </div>
  );
}
