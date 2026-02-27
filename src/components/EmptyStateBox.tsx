import { Plus } from 'lucide-react';

interface EmptyStateBoxProps {
  title: string;
  description: string;
  onCreateNew?: () => void;
}

export default function EmptyStateBox({ title, description, onCreateNew }: EmptyStateBoxProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:border-gray-400 transition-all duration-200">
      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <Plus className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{description}</p>
      <button
        onClick={onCreateNew}
        className="inline-flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
      >
        <Plus className="w-4 h-4" />
        Create New
      </button>
    </div>
  );
}
