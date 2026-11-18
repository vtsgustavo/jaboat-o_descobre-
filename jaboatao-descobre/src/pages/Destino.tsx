import { FormEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, MapPin, Plus, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATS, COLORS, ICONS } from '../data/categories'

export default function Destino() {
  const { id = '' } = useParams()
  const { places, favs, route, visited, reviews, toggleFav, toggleRoute, toggleVisit, addReview } = useApp()
  const [t, setT] = useState(''); const [n, setN] = useState(5)
  const p = places.find((x) => x.id === id)
  if (!p) return <p>Destino não encontrado. <Link className="text-brand underline" to="/explorar">Voltar</Link></p>
  const revs = reviews.filter((r) => r.pid === id)
  const osm = p.lat != null && p.lng != null
    ? `https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=16/${p.lat}/${p.lng}`
    : `https://www.openstreetmap.org/search?query=${encodeURIComponent(p.name + ', Jaboatão dos Guararapes')}`
  const submit = (e: FormEvent) => { e.preventDefault(); if (!t.trim()) return; addReview({ pid: id, n, t }); setT('') }
  return (
    <div className="space-y-4">
      <div className="flex h-56 items-center justify-center rounded-3xl text-7xl text-white" style={{ background: `linear-gradient(135deg, ${COLORS[p.cat]}, #2e9e5b)` }}>{ICONS[p.cat]}</div>
      <span className="text-xs font-bold text-nature">{CATS[p.cat]}</span>
      <h1 className="text-3xl font-bold">{p.name}</h1>
      <p>{p.desc}</p>
      <p className="note">Galeria de imagens, história, horários e endereço oficiais devem ser cadastrados no painel admin.</p>
      <div className="flex flex-wrap gap-2">
        <button className="btn" onClick={() => toggleFav(id)}><Heart size={18} fill={favs.includes(id) ? 'currentColor' : 'none'} /> {favs.includes(id) ? 'Favorito' : 'Favoritar'}</button>
        <button className="btn btn-green" onClick={() => toggleRoute(id)}><Plus size={18} /> {route.includes(id) ? 'Remover do roteiro' : 'Adicionar ao roteiro'}</button>
        <button className="btn btn-sun" onClick={() => toggleVisit(id)}><Check size={18} /> {visited.includes(id) ? 'Visitado' : 'Registrar visita'}</button>
        <a className="btn btn-outline" target="_blank" rel="noopener noreferrer" href={osm}><MapPin size={18} /> Ver no mapa</a>
      </div>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Avaliações</h2>
        <form onSubmit={submit} className="flex flex-wrap gap-2">
          <select className="input" value={n} onChange={(e) => setN(Number(e.target.value))} aria-label="Nota">
            {[5, 4, 3, 2, 1].map((x) => <option key={x} value={x}>{'★'.repeat(x)}</option>)}
          </select>
          <input className="input min-w-[200px] flex-1" value={t} onChange={(e) => setT(e.target.value)} placeholder="Seu comentário" aria-label="Comentário" />
          <button className="btn">Enviar</button>
        </form>
        {revs.length === 0 && <p>Seja o primeiro a avaliar.</p>}
        {revs.map((r, i) => <div key={i} className="flex justify-between rounded-2xl border bg-white px-4 py-2"><span>{r.t}</span><b>{'★'.repeat(r.n)}</b></div>)}
      </section>
    </div>
  )
}
