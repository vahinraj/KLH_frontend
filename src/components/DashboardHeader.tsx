import { Bell, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function DashboardHeader() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState('This Month');

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>{dateRange}</span>
            </button>

            {showDatePicker && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-max z-50">
                <div className="space-y-2">
                  {['Today', 'This Week', 'This Month', 'Last 3 Months'].map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setDateRange(range);
                        setShowDatePicker(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-gray-700 rounded transition-all"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
