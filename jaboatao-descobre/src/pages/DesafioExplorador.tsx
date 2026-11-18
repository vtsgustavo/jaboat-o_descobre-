import { useApp } from '../context/AppContext'
import { ACHIEVEMENTS } from '../data/achievements'

export default function DesafioExplorador() {
  const { places, visited } = useApp()
  const v = places.filter((p) => visited.includes(p.id))
  const pct = places.length ? Math.round((v.length / places.length) * 100) : 0
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Desafio Explorador</h1>
      <p>{v.length} de {places.length} destinos visitados</p>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-nature transition-all" style={{ width: `${pct}%` }} /></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((a) => {
          const ok = a.test(v, places)
          return <div key={a.title} className={`card items-center gap-1 p-5 text-center ${ok ? '' : 'opacity-40 grayscale'}`}>
            <div className="text-5xl">{a.icon}</div><b>{a.title}</b><span className="text-sm">{ok ? 'Conquistado!' : 'Bloqueado'}</span>
          </div>
        })}
      </div>
    </div>
  )
}
