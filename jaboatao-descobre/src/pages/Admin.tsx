import { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CATS } from '../data/categories'
import { DEFAULT_DESC } from '../data/places'

export default function Admin() {
  const { user, places, extra, setExtra, favs, visited, reviews, setReviews, route, msg } = useApp()
  const [name, setName] = useState(''); const [cat, setCat] = useState(0); const [desc, setDesc] = useState('')
  const [lat, setLat] = useState(''); const [lng, setLng] = useState('')
  if (!user) return <Navigate to="/login" replace />
  const add = (e: FormEvent) => {
    e.preventDefault(); if (!name.trim()) return
    const la = parseFloat(lat), ln = parseFloat(lng)
    setExtra([...extra, { id: 'x' + Date.now(), name, cat, desc: desc || DEFAULT_DESC, ...(isNaN(la) || isNaN(ln) ? {} : { lat: la, lng: ln }) }])
    setName(''); setDesc(''); setLat(''); setLng(''); msg('Atrativo cadastrado')
  }
  const stats = [['Atrativos', places.length], ['Favoritos', favs.length], ['Visitas', visited.length], ['Avaliações', reviews.length], ['No roteiro', route.length]]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Painel administrativo</h1>
      <p className="note">Demonstração em localStorage. Veja supabase/schema.sql para a integração real.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map(([l, v]) => <div key={l} className="card p-4"><div className="text-3xl font-bold">{v}</div>{l}</div>)}
      </div>
      <form onSubmit={add} className="flex flex-wrap gap-2">
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" aria-label="Nome" />
        <select className="input" value={cat} onChange={(e) => setCat(Number(e.target.value))} aria-label="Categoria">{CATS.map((c, i) => <option key={c} value={i}>{c}</option>)}</select>
        <input className="input min-w-[200px] flex-1" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Descrição" aria-label="Descrição" />
        <input className="input w-28" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" aria-label="Latitude" />
        <input className="input w-28" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" aria-label="Longitude" />
        <button className="btn">Cadastrar</button>
      </form>
      {extra.map((p) => <div key={p.id} className="flex items-center justify-between rounded-2xl border bg-white px-4 py-2"><span>{p.name}</span><button className="btn btn-outline" onClick={() => setExtra(extra.filter((x) => x.id !== p.id))}>Remover</button></div>)}
      {reviews.length > 0 && <section className="space-y-2"><h2 className="text-xl font-semibold">Moderar avaliações</h2>
        {reviews.map((r, i) => <div key={i} className="flex items-center justify-between rounded-2xl border bg-white px-4 py-2"><span>{r.t}</span><button className="btn btn-outline" onClick={() => setReviews(reviews.filter((_, j) => j !== i))}>Remover</button></div>)}</section>}
    </div>
  )
}
