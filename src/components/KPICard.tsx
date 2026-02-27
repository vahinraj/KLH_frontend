import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  delta: number;
  isPositive: boolean;
  sparkline?: string; // SVG path for mini chart
}

export default function KPICard({ label, value, delta, isPositive, sparkline }: KPICardProps) {
  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
      {sparkline && (
        <svg className="absolute top-2 right-2 w-16 h-8 opacity-20" viewBox="0 0 100 40">
          <path d={sparkline} fill="none" stroke="#4ade80" strokeWidth="2" />
        </svg>
      )}
      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">{label}</p>
        <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
      </div>

      <div className="flex items-center gap-2 mt-4">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-red-400" />
        ) : (
          <TrendingDown className="w-4 h-4 text-gray-400" />
        )}
        <span className={`text-sm font-medium ${isPositive ? 'text-red-600' : 'text-gray-600'}`}>
          {isPositive ? '+' : ''}{delta}%
        </span>
      </div>
    </div>
  );
}
