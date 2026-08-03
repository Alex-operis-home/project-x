export function RaymondCard({
  userName,
  intro,
  bullets,
}: {
  userName: string;
  intro: string;
  bullets: string[];
}) {
  return (
    <div className="bg-ink text-white rounded-xl2 shadow-floating p-6 relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-brand/30 blur-3xl pointer-events-none" />
      <div className="flex items-start gap-4 relative">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand font-display font-semibold flex-shrink-0">
          R
        </div>
        <div className="flex-1">
          <p className="font-display text-lg leading-snug">
            Salut {userName} 👋
            <br />
            {intro}
          </p>
          <ul className="mt-4 space-y-2">
            {bullets.map((b) => (
              <li key={b} className="text-sm text-white/80 flex gap-2">
                <span className="text-brand">→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
