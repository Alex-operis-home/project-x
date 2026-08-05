import { Card } from "@/components/ui/Card";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { ProgressRing } from "@/components/ProgressRing";
import { RaymondCard } from "@/components/RaymondCard";
import { homeUser, homeProject, homeAlerts, homeTasks, homeDocuments, homeFrise } from "@/lib/mock-data";

export default function HomeDashboard() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="font-display text-2xl font-semibold">Salut {homeUser.firstName} 👋</h1>
        <p className="text-ink-soft mt-1">
          Ta maison avance à <span className="font-semibold text-ink">{homeProject.progress}%</span>. Voici les prochaines étapes.
        </p>
      </div>

      {/* HERO — cercle de progression + prochaine étape */}
      <div className="grid md:grid-cols-[260px_1fr] gap-5">
        <Card className="flex flex-col items-center justify-center gap-3">
          <ProgressRing value={homeProject.progress} label="du parcours" />
          <div className="text-sm text-ink-soft text-center">Étape en cours : {homeProject.step}</div>
        </Card>

        <Card className="flex flex-col justify-center gap-2">
          <div className="text-xs font-bold uppercase tracking-wide text-gold">Prochaine étape</div>
          <h2 className="font-display text-xl font-semibold">{homeProject.nextStep.title}</h2>
          <div className="text-sm text-ink-soft">Échéance estimée : {homeProject.nextStep.deadline}</div>
          <p className="text-sm text-ink-soft max-w-[480px] mt-1">{homeProject.nextStep.advice}</p>
          <button className="mt-2 bg-gold text-white text-sm font-semibold px-4 py-2.5 rounded-lg w-fit hover:opacity-90 transition-opacity">
            Commencer cette étape
          </button>
        </Card>
      </div>

      {/* FRISE IMAGÉE */}
      <Card>
        <div className="flex items-center overflow-x-auto gap-0 pb-1">
          {homeFrise.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5 min-w-[86px] relative">
              {i > 0 && (
                <div
                  className={`absolute top-5 right-1/2 w-full h-0.5 ${
                    homeFrise[i - 1].done || homeFrise[i - 1].current ? "bg-gold" : "bg-line"
                  }`}
                />
              )}
              <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  s.current ? "bg-ink ring-4 ring-brand-soft" : s.done ? "bg-gold/15" : "bg-canvas"
                }`}
              >
                {s.icon}
              </div>
              <span className={`text-xs text-center ${s.current ? "font-semibold text-ink" : "text-ink-soft"}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Mes alertes */}
        <Card>
          <h3 className="font-semibold mb-4">Mes alertes</h3>
          <div className="space-y-3">
            {homeAlerts.map((a) => (
              <div key={a.id} className="flex items-start gap-2.5">
                <AlertBadge level={a.level} pulse={a.level === "rouge"} />
                <div className="text-sm">
                  <div className="font-medium leading-snug">{a.title}</div>
                  <div className="text-ink-soft text-xs mt-0.5">{a.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions du jour */}
        <Card>
          <h3 className="font-semibold mb-4">Mes actions du jour</h3>
          <div className="space-y-3">
            {homeTasks.map((t) => (
              <label key={t.id} className="flex items-center gap-2.5 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked={t.done} className="accent-brand w-4 h-4" readOnly />
                <span className={t.done ? "line-through text-ink-soft" : ""}>{t.title}</span>
                {t.due && !t.done && <span className="ml-auto text-xs text-ink-soft">{t.due}</span>}
              </label>
            ))}
          </div>
        </Card>

        {/* Documents récents */}
        <Card>
          <h3 className="font-semibold mb-4">Documents récents</h3>
          <div className="space-y-2">
            {homeDocuments.slice(0, 3).map((d) => (
              <div key={d.id} className="flex items-center justify-between py-1.5">
                <div className="text-sm font-medium">{d.name}</div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    d.status === "conforme"
                      ? "bg-signal-green-soft text-signal-green"
                      : d.status === "manquant"
                      ? "bg-signal-orange-soft text-signal-orange"
                      : "bg-signal-red-soft text-signal-red"
                  }`}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Conversation avec Raymond */}
      <RaymondCard
        userName={homeUser.firstName}
        intro="J'ai analysé ton dossier. Voici ce qui mérite ton attention aujourd'hui."
        bullets={[
          "Décennale manquante — à régulariser avant coulage",
          "Appel de fonds n°4 dans 5 jours",
          "Menuiseries à valider cette semaine",
        ]}
      />
    </div>
  );
}
