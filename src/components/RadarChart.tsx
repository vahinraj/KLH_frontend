interface RadarChartProps {
  data: Array<{ label: string; value: number }>;
  title: string;
}

export default function RadarChart({ data, title }: RadarChartProps) {
  const numAxes = data.length;
  const centerX = 120;
  const centerY = 120;
  const radius = 80;

  const angle = (Math.PI * 2) / numAxes;

  const points = data.map((d, i) => {
    const currentAngle = angle * i - Math.PI / 2;
    const distance = (d.value / 100) * radius;
    return {
      x: centerX + distance * Math.cos(currentAngle),
      y: centerY + distance * Math.sin(currentAngle),
      label: d.label,
    };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  const levels = 5;
  const levelPoints = Array.from({ length: levels }, (_, i) => {
    const levelRadius = radius * ((i + 1) / levels);
    return Array.from({ length: numAxes + 1 }, (_, j) => {
      const currentAngle = angle * j - Math.PI / 2;
      return `${centerX + levelRadius * Math.cos(currentAngle)},${centerY + levelRadius * Math.sin(currentAngle)}`;
    }).join(' ');
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-semibold text-gray-900 mb-6">{title}</h3>

      <svg width="100%" height="300" viewBox="0 0 240 240" className="mx-auto">
        {levelPoints.map((points, i) => (
          <polyline
            key={`level-${i}`}
            points={points}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {data.map((_, i) => {
          const currentAngle = angle * i - Math.PI / 2;
          const endX = centerX + radius * Math.cos(currentAngle);
          const endY = centerY + radius * Math.sin(currentAngle);
          return (
            <line
              key={`axis-${i}`}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        <polygon points={polygonPoints} fill="#f87171" fillOpacity="0.3" stroke="#f87171" strokeWidth="2" />

        {points.map((p, i) => (
          <g key={`point-${i}`}>
            <circle cx={p.x} cy={p.y} r="3" fill="#f87171" />
            <text
              x={p.x + (p.x > centerX ? 8 : -8)}
              y={p.y + 4}
              textAnchor={p.x > centerX ? 'start' : 'end'}
              className="text-xs fill-gray-600 font-medium"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
