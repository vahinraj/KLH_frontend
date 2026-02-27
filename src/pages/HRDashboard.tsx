import { useState } from 'react';
import { Users, FileText, LayoutGrid, Settings, Upload, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Toast } from '../components/Toast';

function HRSidebar({ active }: { active: string }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'policies', label: 'Policies', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-20 bg-slate-900 text-gray-300 flex flex-col items-center py-8 fixed h-screen border-r border-slate-800">
      <div className="mb-12">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">A</span>
        </div>
      </div>
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.id;
        return (
          <button
            key={it.id}
            className={`mb-6 p-3 rounded-xl transition-all duration-300 group relative ${
              isActive
                ? 'bg-red-700 text-white shadow-lg shadow-red-900/50'
                : 'text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Icon className="w-6 h-6" strokeWidth={1.5} />
            <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-xl">
              {it.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function KPICard({
  label,
  value,
  delta,
  isPositive,
  index
}: {
  label: string;
  value: string;
  delta: number;
  isPositive: boolean;
  index: number;
}) {
  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{
        animation: `slideUpFade 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">{label}</p>
      <h3 className="text-4xl font-bold text-gray-900 mb-3">{value}</h3>
      <div className="flex items-center gap-2">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-600" strokeWidth={2.5} />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600" strokeWidth={2.5} />
        )}
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{delta}%
        </span>
        <span className="text-xs text-gray-400 ml-1">vs last month</span>
      </div>
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
    <div className="flex min-h-screen bg-gray-50">
      <HRSidebar active="dashboard" />

      <div className="flex-1 ml-20">
        <header className="bg-white border-b border-gray-100 px-8 py-6 sticky top-0 z-30 backdrop-blur-lg bg-white/80">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
              <p className="text-gray-500 mt-1 text-sm">Training program overview and risk monitoring</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                Export
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                HR
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <KPICard label="Total Employees" value="1,240" delta={12} isPositive={true} index={0} />
            <KPICard label="Active Policies" value="12" delta={0} isPositive={true} index={1} />
            <KPICard label="Avg. Completion" value="84%" delta={5} isPositive={true} index={2} />
            <KPICard label="Critical Risks" value="3" delta={0} isPositive={false} index={3} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div
              className="lg:col-span-5 bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-100 p-6 hover:shadow-2xl transition-all duration-300"
              style={{ animation: 'slideUpFade 0.6s ease-out 0.4s both' }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-600/30">
                  <AlertCircle className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">Risk Radar</h2>
                  <p className="text-sm text-gray-600 mt-1">Critical alerts requiring immediate attention</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-red-200/50 hover:border-red-300 transition-all duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        <p className="font-semibold text-red-700 text-sm">Critical Alert</p>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        3 Forklift Operators failed 'Heavy Machinery Safety' module twice
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-lg whitespace-nowrap transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-xl hover:scale-105">
                      Take Action
                    </button>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50 hover:border-yellow-300 transition-all duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        <p className="font-semibold text-yellow-700 text-sm">Warning</p>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        5 new hires pending 'Orientation' module completion
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-lg whitespace-nowrap transition-all duration-200 shadow-lg shadow-red-600/30 hover:scale-105">
                      Take Action
                    </button>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-all duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <p className="font-semibold text-blue-700 text-sm">Info</p>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Quarterly safety review scheduled for next week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
              style={{ animation: 'slideUpFade 0.6s ease-out 0.5s both' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Knowledge Gaps</h2>
                <button
                  onClick={handleClarify}
                  className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-red-600/30 hover:scale-105 flex items-center gap-1.5"
                >
                  <span className="text-sm">✨</span>
                  AI Clarify
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-900">Safety Protocols</span>
                    <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-1 rounded-full">Critical</span>
                  </div>
                  <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: '85%',
                        background: 'linear-gradient(90deg, #fde68a, #dc2626)',
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">1,054 employees struggling with this topic</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-900">Payroll & Leave</span>
                    <span className="text-xs font-bold text-yellow-700 bg-yellow-50 px-2 py-1 rounded-full">Moderate</span>
                  </div>
                  <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: '55%',
                        background: 'linear-gradient(90deg, #fef3c7, #f59e0b)',
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">682 employees need clarification</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-900">Code of Conduct</span>
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full">Low</span>
                  </div>
                  <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-green-500 rounded-full" style={{ width: '25%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">310 employees need clarification</p>
                </div>
              </div>
            </div>

            <div
              className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
              style={{ animation: 'slideUpFade 0.6s ease-out 0.6s both' }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Policy</h2>
              <div
                className={`flex flex-col items-center justify-center h-56 border-2 border-dashed rounded-xl transition-all duration-300 ${
                  dropState === 'extracting'
                    ? 'border-red-500 bg-red-50 shadow-xl'
                    : 'border-gray-300 hover:border-red-500 hover:bg-red-50/30'
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <Upload
                  className={`w-12 h-12 mb-3 transition-all duration-300 ${
                    dropState === 'extracting' ? 'text-red-700 animate-bounce' : 'text-gray-400'
                  }`}
                  strokeWidth={1.5}
                />
                {dropState === 'idle' ? (
                  <>
                    <p className="text-sm text-gray-600 text-center font-medium">Drag & drop policy PDFs</p>
                    <p className="text-xs text-gray-400 text-center mt-1">or click to browse</p>
                  </>
                ) : (
                  <p className="text-sm text-red-700 font-semibold text-center">Extracting concepts...</p>
                )}
              </div>
            </div>

            <div
              className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
              style={{ animation: 'slideUpFade 0.6s ease-out 0.7s both' }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Workforce Completion</h2>
              <div className="flex items-center justify-center mb-4">
                <svg viewBox="0 0 160 160" className="w-56 h-56">
                  <defs>
                    <linearGradient id="donut-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#991b1b" />
                    </linearGradient>
                  </defs>
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#f3f4f6" strokeWidth="16" />
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="url(#donut-gradient)"
                    strokeWidth="16"
                    strokeDasharray={`${(84 / 100) * 2 * Math.PI * 60} ${2 * Math.PI * 60}`}
                    strokeLinecap="round"
                    style={{
                      transformOrigin: '80px 80px',
                      transform: 'rotate(-90deg)',
                      transition: 'stroke-dasharray 1s ease-out',
                    }}
                  />
                  <text x="80" y="75" textAnchor="middle" className="text-4xl font-bold" fill="#111827">
                    84%
                  </text>
                  <text x="80" y="95" textAnchor="middle" className="text-xs" fill="#6b7280">
                    Complete
                  </text>
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">1,040</p>
                  <p className="text-xs text-gray-500 mt-1">Completed</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <p className="text-2xl font-bold text-red-700">200</p>
                  <p className="text-xs text-gray-500 mt-1">Pending</p>
                </div>
              </div>
            </div>

            <div
              className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
              style={{ animation: 'slideUpFade 0.6s ease-out 0.8s both' }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Modality Preference</h2>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-red-700 shadow-lg shadow-red-700/50"></div>
                      <span className="font-semibold text-gray-900">Voice / Audio</span>
                    </div>
                    <span className="text-lg font-bold text-red-700">75%</span>
                  </div>
                  <div className="relative w-full h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-700 to-red-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">930 employees prefer audio-based training modules</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                      <span className="font-semibold text-gray-900">Text / Reading</span>
                    </div>
                    <span className="text-lg font-bold text-gray-600">25%</span>
                  </div>
                  <div className="relative w-full h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '25%' }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">310 employees prefer traditional text-based content</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 italic">
                    Insight: Consider prioritizing audio content generation for new policies to maximize engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && <Toast message="AI clarification generated and sent to affected workers." />}
    </div>
  );
}
