/**
 * Decorative isometric-triangle field for navy heroes (blueprint: "composição geométrica
 * inspirada no símbolo"). An abstract lattice — not a copy of the logo, which must only
 * be used in its official form.
 */
const COLORS = ["#4f8b2e", "#b8db9f", "#3f7124", "#6fae45"];

export function GeometricPattern({ className = "" }: { className?: string }) {
  const s = 64; // triangle side
  const h = (s * Math.sqrt(3)) / 2;
  const cols = 12;
  const rows = 9;
  const tris: { d: string; fill: string; o: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols * 2; c++) {
      const x = (c * s) / 2;
      const y = r * h;
      const up = (c + r) % 2 === 0;
      const d = up
        ? `M${x} ${y + h}L${x + s / 2} ${y}L${x + s} ${y + h}Z`
        : `M${x} ${y}L${x + s} ${y}L${x + s / 2} ${y + h}Z`;
      // deterministic sparse selection, denser toward the right/top
      const seed = (r * 131 + c * 71) % 97;
      const density = c / (cols * 2) - r / rows / 2;
      if (seed / 97 < density * 0.55) tris.push({ d, fill: COLORS[seed % COLORS.length], o: 0.18 + (seed % 5) * 0.12 });
    }
  }
  return (
    <svg aria-hidden focusable="false" viewBox={`0 0 ${cols * s} ${rows * h}`} preserveAspectRatio="xMaxYMid slice" className={className}>
      <g stroke="#ffffff" strokeOpacity="0.06" fill="none">
        {Array.from({ length: rows + 1 }, (_, r) => (
          <line key={`h${r}`} x1="0" x2={cols * s} y1={r * h} y2={r * h} />
        ))}
      </g>
      {tris.map((t, i) => (
        <path key={i} d={t.d} fill={t.fill} fillOpacity={t.o} />
      ))}
    </svg>
  );
}
