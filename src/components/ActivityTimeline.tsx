import { Clock, CheckCircle, AlertCircle, Zap } from 'lucide-react';

interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info' | 'action';
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

export default function ActivityTimeline({ events }: ActivityTimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'action':
        return <Zap className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-semibold text-gray-900 mb-6">Activity Timeline</h3>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-gray-50 rounded-full">{getIcon(event.type)}</div>
              {index < events.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>}
            </div>

            <div className="flex-1 py-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{event.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
