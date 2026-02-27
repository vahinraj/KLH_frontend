import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import KPICard from '../components/KPICard';
import RadialGauge from '../components/RadialGauge';
import ProgressCard from '../components/ProgressCard';
import SelectableCard from '../components/SelectableCard';
import ControlPanel from '../components/ControlPanel';
import EmptyStateBox from '../components/EmptyStateBox';
import AreaChart from '../components/AreaChart';
import RadarChart from '../components/RadarChart';
import ActivityTimeline from '../components/ActivityTimeline';
import DataTable from '../components/DataTable';
import ChatbotPage from './ChatBot'; // ← import your chatbot page
import Modules from './Modules';

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const [selectedModel, setSelectedModel] = useState('gpt4');

  const chartData = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 48 },
    { label: 'Apr', value: 61 },
    { label: 'May', value: 55 },
    { label: 'Jun', value: 67 },
  ];

  const radarData = [
    { label: 'Accuracy', value: 85 },
    { label: 'Speed', value: 72 },
    { label: 'Reliability', value: 88 },
    { label: 'Efficiency', value: 79 },
    { label: 'Quality', value: 92 },
  ];

  const timelineEvents = [
    {
      id: '1',
      timestamp: '2 mins ago',
      title: 'Model Training Complete',
      description: 'GPT-4 model finished training with 92% accuracy',
      type: 'success' as const,
    },
    {
      id: '2',
      timestamp: '15 mins ago',
      title: 'API Request Spike',
      description: '2000+ requests processed in the last hour',
      type: 'action' as const,
    },
    {
      id: '3',
      timestamp: '1 hour ago',
      title: 'Token Quota Alert',
      description: 'Usage exceeded 85% of monthly quota',
      type: 'warning' as const,
    },
    {
      id: '4',
      timestamp: '3 hours ago',
      title: 'New Feature Deployed',
      description: 'Advanced analytics dashboard is now live',
      type: 'info' as const,
    },
  ];

  const tableData = [
    { id: '1', request: 'REQ-001', model: 'GPT-4', tokens: '1,250', status: 'completed' },
    { id: '2', request: 'REQ-002', model: 'Claude', tokens: '892', status: 'active' },
    { id: '3', request: 'REQ-003', model: 'GPT-3.5', tokens: '2,150', status: 'completed' },
    { id: '4', request: 'REQ-004', model: 'GPT-4', tokens: '567', status: 'pending' },
    { id: '5', request: 'REQ-005', model: 'Claude', tokens: '1,890', status: 'completed' },
  ];

  const tableColumns = [
    { key: 'request', label: 'Request ID', sortable: true },
    { key: 'model', label: 'Model', sortable: true },
    { key: 'tokens', label: 'Tokens Used', sortable: true },
    { key: 'status', label: 'Status', sortable: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* ── Chatbot view: full height, no extra chrome ── */}
      {activeNav === 'chat' ? (
        <div className="flex-1 ml-64 h-screen overflow-hidden">
          <ChatbotPage />
        </div>
      ) : activeNav === 'modules' ? (
        <div className="flex-1 ml-64 h-screen overflow-hidden">
          <Modules />
        </div>
      ) : (
        /* ── All other views keep the normal header + scroll layout ── */
        <div className="flex-1 flex flex-col ml-64">
          <DashboardHeader />

          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <KPICard label="Total Requests" value="12,450" delta={12} isPositive={true} />
                  <KPICard label="Avg Response Time" value="245ms" delta={8} isPositive={false} />
                  <RadialGauge percentage={85} label="Resource Usage" unit="CPU" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProgressCard label="Token Usage" current={850} total={1000} unit="K tokens" />
                  <ProgressCard label="Storage Used" current={45} total={100} unit="GB" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectableCard
                    id="gpt4"
                    title="GPT-4"
                    description="Advanced reasoning and code generation"
                    isSelected={selectedModel === 'gpt4'}
                    onClick={setSelectedModel}
                  />
                  <SelectableCard
                    id="claude"
                    title="Claude"
                    description="Fast and efficient for various tasks"
                    isSelected={selectedModel === 'claude'}
                    onClick={setSelectedModel}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <ControlPanel />
                  </div>
                  <EmptyStateBox
                    title="Create New"
                    description="Add a new custom workflow"
                    onCreateNew={() => console.log('Create new workflow')}
                  />
                </div>

                <AreaChart data={chartData} title="Request Volume Trend" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RadarChart data={radarData} title="Model Performance Metrics" />
                  <ActivityTimeline events={timelineEvents} />
                </div>

                <DataTable columns={tableColumns} rows={tableData} title="Recent API Requests" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}