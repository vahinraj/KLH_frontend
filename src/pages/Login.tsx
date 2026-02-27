import { useState, useEffect } from 'react';
import { Github, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onClose }: { onClose?: () => void }) {
  const [role, setRole] = useState<'employee' | 'hr'>('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'hr') {
      navigate('/hr-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div
        className={`w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-red-600/30">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue to Aurora</p>
        </div>

        <div className="mb-6">
          <div className="flex bg-gray-100 rounded-2xl p-1.5">
            <button
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                role === 'employee'
                  ? 'bg-red-700 text-white shadow-lg shadow-red-700/30'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setRole('employee')}
            >
              Employee
            </button>
            <button
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                role === 'hr'
                  ? 'bg-red-700 text-white shadow-lg shadow-red-700/30'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setRole('hr')}
            >
              HR Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-xl shadow-red-700/30 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 relative flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-xs text-gray-400 font-medium">or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="mt-5 flex justify-center gap-3">
          <button className="p-3 border border-gray-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-all duration-200 hover:scale-110">
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.9 0 7.1 1.3 9.6 3.4l7.2-7.2C35 2.8 29.8 0 24 0 14.7 0 6.7 4.9 2.6 12l8.4 6.5C12.3 13 17.6 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.5 2.7-2 5-4.2 6.5l6.4 5c3.7-3.4 5.6-8.4 5.6-14z"
              />
              <path
                fill="#FBBC05"
                d="M10.9 28.5c-.5-1.5-.8-3-.8-4.5s.3-3 .8-4.5L2.6 13c-1.6 3.1-2.6 6.6-2.6 10.5s1 7.4 2.6 10.5l8.3-5z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.5 0 12-2.1 16-5.8l-7.6-6c-2.2 1.5-4.9 2.4-8.4 2.4-6.4 0-11.7-4.2-13.6-9.8l-8.4 6.5C6.7 43.1 14.7 48 24 48z"
              />
            </svg>
          </button>
          <button className="p-3 border border-gray-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-all duration-200 hover:scale-110">
            <Github className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-3 border border-gray-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-all duration-200 hover:scale-110">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#F05032" d="M0 0h11v11H0z" />
              <path fill="#FFB900" d="M13 0h11v11H13z" />
              <path fill="#00A4EF" d="M0 13h11v11H0z" />
              <path fill="#7FBA00" d="M13 13h11v11H13z" />
            </svg>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to Aurora's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
