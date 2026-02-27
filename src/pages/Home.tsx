import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Login from './Login';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 bg-dot-matrix">
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-red-400" strokeWidth={2} />
              <span className="text-xl font-semibold text-gray-900">Aurora</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)] py-16">
          <div className="space-y-8 max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Build Smarter with AI-Powered Solutions
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your workflow with intelligent automation. Experience the future of productivity today.
            </p>

            <button
              onClick={() => setShowLogin(true)}
              className="group inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started — It's Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-lg aspect-square bg-gradient-to-br from-red-50 to-white rounded-3xl border-2 border-dashed border-red-200 flex items-center justify-center p-12">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 mx-auto bg-red-100 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-red-400" />
                </div>
                <p className="text-sm text-gray-400 font-medium">Image Placeholder</p>
                <p className="text-xs text-gray-300">Drop your illustration here</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="relative">
            <Login />
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-white text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
