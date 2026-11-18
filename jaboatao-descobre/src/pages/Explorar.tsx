import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CATS } from '../data/categories'
import PlaceGrid from '../components/PlaceGrid'

export default function Explorar() {
  const { places } = useApp()
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') ?? ''
  const cat = sp.has('cat') ? Number(sp.get('cat')) : -1
  const set = (k: string, v: string) => { const n = new URLSearchParams(sp); v === '' ? n.delete(k) : n.set(k, v); setSp(n) }
  const list = places.filter((p) => (cat < 0 || p.cat === cat) && p.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Explorar atrativos</h1>
      <input className="input w-full max-w-md" value={q} onChange={(e) => set('q', e.target.value)} placeholder="Pesquisar…" aria-label="Pesquisar" />
      <div className="flex flex-wrap gap-2">
        {['Todos', ...CATS].map((c, i) => {
          const val = i - 1
          return <button key={c} onClick={() => set('cat', val < 0 ? '' : String(val))}
            className={`rounded-full border px-4 py-1.5 ${cat === val ? 'border-nature bg-nature text-white' : 'bg-white'}`}>{c}</button>
        })}
      </div>
      <PlaceGrid places={list} empty="Nenhum atrativo encontrado." />
    </div>
  )
}
