import { Sparkles, LayoutGrid, MessageCircle, BarChart3, Settings, LogOut, User, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
}

export default function Sidebar({ activeNav, onNavChange }: SidebarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutGrid },
    { id: 'chat', label: 'AI Chat Bot', icon: MessageCircle },
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-red-400" strokeWidth={2} />
          <span className="text-lg font-bold text-gray-900">Aurora</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-red-50 text-red-600 border-l-2 border-red-400'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200"
          >
            <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
