interface DataPoint {
  label: string;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
  title: string;
}

export default function AreaChart({ data, title }: AreaChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const padding = 40;
  const width = 800;
  const height = 300;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = height - padding - (d.value / maxValue) * chartHeight;
    return { x, y, value: d.value };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaData = `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-semibold text-gray-900 mb-6">{title}</h3>

      <svg width="100%" height="350" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={areaData} fill="url(#areaGradient)" />

        <polyline points={points.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#f87171" />
        ))}

        {points.map((p, i) => (
          <text
            key={`label-${i}`}
            x={p.x}
            y={height - padding + 25}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {data[i].label}
          </text>
        ))}
      </svg>
    </div>
  );
}
