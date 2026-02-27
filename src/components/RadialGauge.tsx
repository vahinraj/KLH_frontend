interface RadialGaugeProps {
  percentage: number;
  label: string;
  unit: string;
}

export default function RadialGauge({ percentage, label, unit }: RadialGaugeProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center">
      <p className="text-sm font-medium text-gray-600 mb-4">{label}</p>

      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="8"
            strokeDasharray={circumference}
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#f87171"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
          <span className="text-xs text-gray-500">{unit}</span>
        </div>
      </div>
    </div>
  );
}
