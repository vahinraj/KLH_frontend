interface ProgressCardProps {
  label: string;
  current: number;
  total: number;
  unit: string;
}

export default function ProgressCard({ label, current, total, unit }: ProgressCardProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <p className="text-sm font-medium text-gray-600 mb-4">{label}</p>

      <div className="mb-4">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-400 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-2xl font-bold text-gray-900">{current}</p>
          <p className="text-xs text-gray-500">of {total} {unit}</p>
        </div>
        <span className="text-sm font-medium text-gray-600">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}
