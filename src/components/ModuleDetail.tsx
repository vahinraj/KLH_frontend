import { ArrowLeft, Headphones } from 'lucide-react'

interface Module {
  id: string
  title: string
  description: string
  progress: number
}

export default function ModuleDetail({ module, onBack }: { module: Module; onBack: () => void }) {
  return (
    <div className="p-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" />
        Back to Modules
      </button>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">{module.title}</h2>
          <p className="mt-2 text-gray-700">{module.description}</p>

          <div className="mt-6 h-[60vh] bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
            Embedded content placeholder (PDF / Rich Text Viewer)
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-6 space-y-4">
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">Progress</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-lg font-semibold">{module.progress}%</div>
                <div className="text-xs text-gray-500">{module.progress >= 100 ? 'Completed' : module.progress > 0 ? 'In Progress' : 'Not Started'}</div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-4 shadow-sm space-y-3">
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold">
                Take Quiz
              </button>

              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold">
                <Headphones className="w-4 h-4" />
                Listen to Audio
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
