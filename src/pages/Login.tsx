import { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [role, setRole] = useState<'employee' | 'hr'>('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // trigger fade-in
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
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div
        className={`w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl transition-opacity duration-500 ease-out ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="mb-6">
          <div className="flex justify-center bg-gray-100 rounded-full p-1">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                role === 'employee'
                  ? 'bg-red-700 text-white shadow-inner'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setRole('employee')}
            >
              Employee Login
            </button>
            <button
              className={`ml-1 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                role === 'hr'
                  ? 'bg-red-700 text-white shadow-inner'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setRole('hr')}
            >
              HR Admin Login
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="mt-1 w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-700 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              className="mt-1 w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-700 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition transform active:scale-95 shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 relative flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          {/** social buttons */}
          <button className="p-2 border border-gray-300 rounded-full hover:border-red-400 transition-shadow shadow-sm hover:shadow-md">
            {/* google svg */}
            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 48 48">
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
          <button className="p-2 border border-gray-300 rounded-full hover:border-red-400 transition-shadow shadow-sm hover:shadow-md">
            <Github className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 border border-gray-300 rounded-full hover:border-red-400 transition-shadow shadow-sm hover:shadow-md">
            {/* microsoft svg */}
            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24">
              <path fill="#F05032" d="M0 0h11v11H0z" />
              <path fill="#FFB900" d="M13 0h11v11H13z" />
              <path fill="#00A4EF" d="M0 13h11v11H0z" />
              <path fill="#7FBA00" d="M13 13h11v11H13z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
