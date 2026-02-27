import { useState } from 'react';

interface ControlPanelProps {
  onThresholdChange?: (value: number) => void;
  onToggleChange?: (enabled: boolean) => void;
}

export default function ControlPanel({ onThresholdChange, onToggleChange }: ControlPanelProps) {
  const [threshold, setThreshold] = useState(75);
  const [isEnabled, setIsEnabled] = useState(true);

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setThreshold(value);
    onThresholdChange?.(value);
  };

  const handleToggleChange = () => {
    setIsEnabled(!isEnabled);
    onToggleChange?.(!isEnabled);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-semibold text-gray-900 mb-6">Control Panel</h3>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Confidence Threshold</label>
            <span className="text-sm font-semibold text-red-600">{threshold}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={threshold}
            onChange={handleThresholdChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-400"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <label htmlFor="toggle" className="text-sm font-medium text-gray-700">
            Auto-Process
          </label>
          <button
            id="toggle"
            onClick={handleToggleChange}
            className={`relative w-12 h-7 rounded-full transition-all duration-200 ${
              isEnabled ? 'bg-red-400' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-200 ${
                isEnabled ? 'right-1' : 'left-1'
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
}
