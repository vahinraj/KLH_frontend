import { useState } from 'react'
import ModuleCard from '../components/ModuleCard'
import ModuleDetail from '../components/ModuleDetail'

const sampleModules = [
  { id: 'm1', title: 'Safety Procedures', description: 'Learn essential on-site safety protocols and emergency responses.', progress: 45 },
  { id: 'm2', title: 'Customer Service', description: 'Best practices for interacting with customers in local languages.', progress: 0 },
  { id: 'm3', title: 'Equipment Handling', description: 'Step-by-step guides for operating and maintaining equipment.', progress: 100 },
  { id: 'm4', title: 'Data Privacy', description: 'Understand data protection and privacy in the workplace.', progress: 12 }
]

export default function Modules() {
  const [selected, setSelected] = useState<string | null>(null)

  if (selected) {
    const mod = sampleModules.find((m) => m.id === selected)!
    return <ModuleDetail module={mod} onBack={() => setSelected(null)} />
  }

  return (
    <main className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Modules</h1>
        <p className="text-sm text-muted-foreground">Browse training modules for vernacular employee training.</p>
      </header>

      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sampleModules.map((m) => (
          <ModuleCard key={m.id} module={m} onOpen={() => setSelected(m.id)} />
        ))}
      </section>
    </main>
  )
}
