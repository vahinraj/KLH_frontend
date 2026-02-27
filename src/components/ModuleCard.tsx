
import { CheckCircle, Play } from 'lucide-react'

interface Module {
  id: string
  title: string
  description: string
  progress: number
}

export default function ModuleCard({ module, onOpen }: { module: Module; onOpen: () => void }) {
  const progressColor = module.progress >= 100 ? 'bg-green-400' : module.progress > 0 ? 'bg-blue-400' : 'bg-gray-300'

  return (
    <div className="relative bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{module.description}</p>
        </div>
        <div className="flex-shrink-0 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {module.progress >= 100 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Play className="w-5 h-5 text-blue-400" />}
            <span className="font-medium">{module.progress}%</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${progressColor} rounded-full`} style={{ width: `${module.progress}%` }} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={onOpen}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-full text-sm font-semibold transition-colors duration-150 shadow-sm"
        >
          {module.progress > 0 ? 'Continue' : 'Get Started'}
        </button>
      </div>
    </div>
  )
}
