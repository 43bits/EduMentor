"use client";

type RadarMetric = {
  label: string;
  value: number; // 0–100
};

export default function RadarChart({
  data,
  size = 280,
}: {
  data: RadarMetric[];
  size?: number;
}) {
  const center = size / 2;
  const radius = size / 2 - 30;
  const angleStep = (Math.PI * 2) / data.length;

  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (d.value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  });

  const gridLevels = 4;

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Grid */}
      {[...Array(gridLevels)].map((_, level) => {
        const r = ((level + 1) / gridLevels) * radius;
        const gridPoints = data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return `${x},${y}`;
        });

        return (
          <polygon
            key={level}
            points={gridPoints.join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {data.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.2)"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={points.join(" ")}
        fill="rgba(59,130,246,0.45)"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      {/* Dots */}
      {points.map((p, i) => {
        const [x, y] = p.split(",");
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={4}
            fill="#60a5fa"
          />
        );
      })}

      {/* Labels */}
      {data.map((d, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + (radius + 18) * Math.cos(angle);
        const y = center + (radius + 18) * Math.sin(angle);

        return (
          <text
            key={d.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="#e5e7eb"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
