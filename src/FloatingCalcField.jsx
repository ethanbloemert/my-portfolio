import { useState } from "react";

const CALC_SYMBOLS = ["∫", "dx", "dy", "∂", "∞", "Σ", "π", "lim", "→"];

function makeSymbol(id) {
  return {
    id,
    char: CALC_SYMBOLS[id % CALC_SYMBOLS.length],
    // position as % of the container
    x: Math.random() * 100,
    y: 100 + Math.random() * 40, // start slightly below view so they float up
    brushed: false,
  };
}

export default function FloatingCalcField() {
  const [symbols, setSymbols] = useState(
    () => Array.from({ length: 18 }, (_, i) => makeSymbol(i))
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;

    setSymbols((prev) =>
      prev.map((s) => {
        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // if mouse comes within a radius, “brush” it away
        if (dist < 10 && !s.brushed) {
          const angle = Math.atan2(dy, dx);
          const power = 45; // how hard it gets yeeted

          return {
            ...s,
            x: s.x + Math.cos(angle) * power,
            y: s.y + Math.sin(angle) * power,
            brushed: true,
          };
        }

        return s;
      })
    );
  };

  const handleAnimationEnd = (id) => {
    // when a brushed symbol finishes its animation, respawn it at the bottom
    setSymbols((prev) =>
      prev.map((s) =>
        s.id === id ? { ...makeSymbol(id), y: 110 } : s
      )
    );
  };

  return (
    <div className="calc-field" onMouseMove={handleMouseMove}>
      {symbols.map((s) => (
        <div
          key={s.id}
          className={`calc-symbol ${s.brushed ? "brushed" : ""}`}
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          onAnimationEnd={() => handleAnimationEnd(s.id)}
        >
          {s.char}
        </div>
      ))}
    </div>
  );
}