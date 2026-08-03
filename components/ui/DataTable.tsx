export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-ink-soft border-b border-line">
            {columns.map((c) => (
              <th key={c} className="px-2 py-3 font-semibold">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-0 hover:bg-canvas/60 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-3.5">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
