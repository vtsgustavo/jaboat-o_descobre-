import { ArrowDown, ArrowUp, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { THEMED_ROUTES } from '../data/routes'

export default function Roteiros() {
  const { places, route, setRoute, toggleRoute, msg } = useApp()
  const list = route.map((id) => places.find((p) => p.id === id)).filter((p) => !!p) as typeof places
  const move = (i: number, d: number) => {
    const r = [...route], j = i + d
    if (j < 0 || j >= r.length) return
    ;[r[i], r[j]] = [r[j], r[i]]; setRoute(r)
  }
  const share = async () => {
    const text = 'Meu roteiro em Jaboatão: ' + list.map((p, i) => `${i + 1}. ${p.name}`).join(' → ')
    try { await navigator.clipboard.writeText(text); msg('Roteiro copiado!') } catch { msg(text) }
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Monte seu roteiro</h1>
      <div className="flex flex-wrap gap-2">
        {THEMED_ROUTES.map((r) => (
          <button key={r.name} className="rounded-full border bg-white px-4 py-2 hover:bg-slate-100"
            onClick={() => { setRoute(places.filter((p) => r.cats.includes(p.cat)).map((p) => p.id)); msg(`${r.name} carregada`) }}>🧭 {r.name}</button>
        ))}
      </div>
      {list.length === 0 && <p>Roteiro vazio. Escolha uma rota ou adicione atrativos em <Link className="text-brand underline" to="/explorar">Explorar</Link>.</p>}
      {list.map((p, i) => (
        <div key={p.id} className="flex items-center justify-between gap-2 rounded-2xl border bg-white px-4 py-2">
          <span>{i + 1}. {p.name}</span>
          <span className="flex gap-1">
            <button className="btn btn-outline" aria-label="Subir" onClick={() => move(i, -1)}><ArrowUp size={16} /></button>
            <button className="btn btn-outline" aria-label="Descer" onClick={() => move(i, 1)}><ArrowDown size={16} /></button>
            <Link className="btn btn-outline" to={`/destino/${p.id}`}>Info</Link>
            <button className="btn btn-outline" aria-label="Remover" onClick={() => toggleRoute(p.id)}><X size={16} /></button>
          </span>
        </div>
      ))}
      {list.length > 0 && <div className="flex gap-2"><button className="btn btn-green" onClick={share}>Compartilhar</button><Link className="btn btn-outline" to="/mapa">Ver no mapa</Link></div>}
    </div>
  )
}
