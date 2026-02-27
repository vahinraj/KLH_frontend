import { useState } from 'react';
import { Users, FileText, LayoutGrid, Settings, Upload, AlertCircle } from 'lucide-react';
import { Toast } from '../components/Toast';
import KPICard from '../components/KPICard';

// Dark sidebar navigation
function HRSidebar({ active }: { active: string }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'policies', label: 'Policies', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-20 bg-slate-900 text-gray-300 flex flex-col items-center py-6 fixed h-screen">
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.id;
        return (
          <button
            key={it.id}
            className={`mb-6 p-2 rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-red-700 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Icon className="w-6 h-6" />
          </button>
        );
      })}
    </div>
  );
}

export default function HRDashboard() {
  const [dropState, setDropState] = useState<'idle' | 'extracting'>('idle');
  const [showToast, setShowToast] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropState('extracting');
    setTimeout(() => setDropState('idle'), 3000);
  };

  const handleClarify = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <HRSidebar active="dashboard" />

      <div className="flex-1 ml-20 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, HR Admin</h1>
          <p className="text-gray-600 mt-1">Here's your training program overview</p>
        </header>

        {/* KPI Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-stagger-1">
            <KPICard
              label="Total Employees"
              value="1,240"
              delta={12}
              isPositive={true}
              sparkline="M0,30 L20,25 L40,20 L60,15 L80,10 L100,5"
            />
          </div>
          <div className="card-stagger-2">
            <KPICard
              label="Active Policies"
              value="12"
              delta={0}
              isPositive={true}
              sparkline="M0,20 L20,22 L40,18 L60,24 L80,20 L100,22"
            />
          </div>
          <div className="card-stagger-3">
            <KPICard
              label="Avg. Completion"
              value="84%"
              delta={5}
              isPositive={true}
              sparkline="M0,25 L20,20 L40,15 L60,10 L80,5 L100,0"
            />
          </div>
          <div className="card-stagger-4">
            <KPICard
              label="Critical Risks"
              value="3"
              delta={0}
              isPositive={false}
              sparkline="M0,5 L20,10 L40,5 L60,10 L80,5 L100,2"
            />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Risk Radar - High Impact */}
          <div className="lg:col-span-4 card-elevated card-stagger-5 bg-red-50/50 hover:shadow-2xl transition-all">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="w-6 h-6 text-red-700 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">Risk Radar</h2>
                <p className="text-sm text-gray-600 mt-1">Critical alerts requiring immediate attention</p>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex items-start justify-between p-3 bg-white/60 rounded-lg">
                <div>
                  <p className="font-semibold text-red-700">🚨 Critical Alert</p>
                  <p className="text-sm text-gray-700 mt-1">3 Forklift Operators failed 'Heavy Machinery Safety' twice</p>
                </div>
                <button className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-full whitespace-nowrap ml-2 animate-pulse">
                  Take Action
                </button>
              </div>

              <div className="flex items-start justify-between p-3 bg-white/60 rounded-lg">
                <div>
                  <p className="font-semibold text-red-700">⚠️ Warning</p>
                  <p className="text-sm text-gray-700 mt-1">5 new hires pending 'Orientation' module completion</p>
                </div>
                <button className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-full whitespace-nowrap ml-2">
                  Take Action
                </button>
              </div>
            </div>
          </div>

          {/* Knowledge Gap Heatmap */}
          <div className="lg:col-span-2 card-elevated card-stagger-2 hover:shadow-2xl transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Knowledge Gaps</h2>
              <button
                onClick={handleClarify}
                className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-full animate-pulse"
              >
                ✨ AI Clarify
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-900">Safety Protocols</span>
                  <span className="text-xs font-bold text-red-700">Critical</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: '85%',
                      background: 'linear-gradient(90deg, #fde68a, #b91c1c)',
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-900">Payroll & Leave</span>
                  <span className="text-xs font-bold text-yellow-600">Moderate</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: '55%',
                      background: 'linear-gradient(90deg, #fef3c7, #f59e0b)',
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-900">Code of Conduct</span>
                  <span className="text-xs font-bold text-green-600">Low</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Policy Dropzone */}
          <div className="lg:col-span-2 card-elevated card-stagger-3 hover:shadow-2xl transition-all">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Upload Policy</h2>
            <div
              className={`flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-xl transition-all duration-200 ${
                dropState === 'extracting'
                  ? 'border-red-700 bg-red-50 shadow-lg'
                  : 'border-gray-300 hover:border-red-700 hover:bg-red-50/30'
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <Upload
                className={`w-12 h-12 mb-2 transition-all ${
                  dropState === 'extracting' ? 'text-red-700 animate-float' : 'text-gray-400'
                }`}
              />
              {dropState === 'idle' ? (
                <p className="text-sm text-gray-600 text-center">Drag & drop policy PDFs here</p>
              ) : (
                <p className="text-sm text-red-700 font-semibold text-center">Extracting vernacular concepts...</p>
              )}
            </div>
          </div>

          {/* Completion Donut Chart */}
          <div className="lg:col-span-3 card-elevated card-stagger-4 hover:shadow-2xl transition-all">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Workforce Completion</h2>
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="w-48 h-48">
                <defs>
                  <linearGradient id="donut-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b91c1c" />
                    <stop offset="100%" stopColor="#7f1d1d" />
                  </linearGradient>
                </defs>
                {/* Background circle */}
                <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="url(#donut-gradient)"
                  strokeWidth="12"
                  strokeDasharray={`${(85 / 100) * 2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '60px 60px',
                    transform: 'rotate(-90deg)',
                    transition: 'stroke-dasharray 0.8s ease-out',
                  }}
                />
                {/* Center text */}
                <text
                  x="60"
                  y="62"
                  textAnchor="middle"
                  className="text-2xl font-bold"
                  fill="#1f2937"
                >
                  85%
                </text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              1,040 of 1,240 employees completed all required modules
            </p>
          </div>

          {/* Modality Preference - Bar Chart */}
          <div className="lg:col-span-3 card-elevated card-stagger-5 hover:shadow-2xl transition-all">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Modality Preference</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-700"></div>
                    <span className="font-semibold text-gray-900">Voice/Audio</span>
                  </div>
                  <span className="text-sm font-bold text-red-700">75%</span>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div className="h-full bg-red-700" style={{ width: '75%' }} />
                </div>
                <p className="text-xs text-gray-500 mt-2">930 employees prefer audio training</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="font-semibold text-gray-900">Text</span>
                  </div>
                  <span className="text-sm font-bold text-gray-600">25%</span>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400" style={{ width: '25%' }} />
                </div>
                <p className="text-xs text-gray-500 mt-2">310 employees prefer text-based learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && <Toast message="✨ AI clarification generated and sent to affected workers." />}
    </div>
  );
}
