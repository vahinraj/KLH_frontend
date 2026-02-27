import { Check } from 'lucide-react';

interface SelectableCardProps {
  id: string;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export default function SelectableCard({
  id,
  title,
  description,
  isSelected,
  onClick,
}: SelectableCardProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
        isSelected
          ? 'border-red-400 bg-red-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`font-semibold mb-1 ${isSelected ? 'text-red-600' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        {isSelected && (
          <div className="ml-3 bg-red-400 rounded-full p-1">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </button>
  );
}
