import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATS, ICONS } from '../data/categories'
import { THEMED_ROUTES } from '../data/routes'
import PlaceGrid from '../components/PlaceGrid'

export default function Home() {
  const { places } = useApp()
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const go = (e: FormEvent) => { e.preventDefault(); nav(`/explorar?q=${encodeURIComponent(q)}`) }
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-brand to-nature px-6 py-12 text-white">
        <h1 className="text-3xl font-extrabold sm:text-5xl">Jaboatão tem muito mais para você descobrir!</h1>
        <p className="mt-3 max-w-xl">Moradores e visitantes: explore praias, história, cultura e sabores da cidade e monte seu roteiro.</p>
        <form onSubmit={go} className="mt-5 flex flex-wrap gap-2">
          <input className="input min-w-[220px] flex-1 text-slate-800" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar atrativos…" aria-label="Buscar atrativos" />
          <button className="btn btn-sun"><Search size={18} /> Explorar destinos</button>
        </form>
      </section>
      <section><h2 className="mb-3 text-2xl font-bold">Destinos em destaque</h2><PlaceGrid places={places.slice(0, 6)} /></section>
      <section>
        <h2 className="mb-3 text-2xl font-bold">Descubra Jaboatão por categorias</h2>
        <div className="flex flex-wrap gap-2">
          {CATS.map((c, i) => <Link key={c} to={`/explorar?cat=${i}`} className="rounded-full border bg-white px-4 py-2 hover:bg-slate-100">{ICONS[i]} {c}</Link>)}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-2xl font-bold">Roteiros recomendados</h2>
        <div className="flex flex-wrap gap-2">
          {THEMED_ROUTES.map((r) => <Link key={r.name} to="/roteiros" className="rounded-full border bg-white px-4 py-2 hover:bg-slate-100">🧭 {r.name}</Link>)}
        </div>
      </section>
    </div>
  )
}
