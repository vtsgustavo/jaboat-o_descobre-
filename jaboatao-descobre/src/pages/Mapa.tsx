import { useMemo, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { LocateFixed } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATS, ICONS } from '../data/categories'
import { distanceKm } from '../lib/geo'

// Vista inicial aproximada da região metropolitana; ajuste se desejar.
const DEFAULT_CENTER: [number, number] = [-8.11, -35.015]
const icon = (cat: number) => L.divIcon({ html: `<div style="font-size:26px">${ICONS[cat]}</div>`, className: '', iconSize: [30, 30], iconAnchor: [15, 15] })

export default function Mapa() {
  const { places, route } = useApp()
  const [me, setMe] = useState<[number, number] | null>(null)
  const [err, setErr] = useState('')
  const [cat, setCat] = useState(-1)
  const located = places.filter((p) => p.lat != null && p.lng != null && (cat < 0 || p.cat === cat))
  const line = route.map((id) => places.find((p) => p.id === id)).filter((p) => p && p.lat != null).map((p) => [p!.lat!, p!.lng!] as [number, number])
  const near = useMemo(() => me ? located.map((p) => ({ p, d: distanceKm(me, [p.lat!, p.lng!]) })).sort((a, b) => a.d - b.d) : [], [me, located])

  const locate = () => {
    if (!navigator.geolocation) return setErr('Geolocalização não suportada.')
    navigator.geolocation.getCurrentPosition((r) => { setMe([r.coords.latitude, r.coords.longitude]); setErr('') }, () => setErr('Permissão de localização negada.'))
  }
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Mapa turístico</h1>
      <div className="flex flex-wrap gap-2">
        <button className="btn" onClick={locate}><LocateFixed size={18} /> Descubra perto de você</button>
        <select className="input" value={cat} onChange={(e) => setCat(Number(e.target.value))} aria-label="Categoria">
          <option value={-1}>Todas as categorias</option>
          {CATS.map((c, i) => <option key={c} value={i}>{c}</option>)}
        </select>
      </div>
      {err && <p className="note" role="alert">{err}</p>}
      {located.length === 0 && <p className="note">Nenhum atrativo tem coordenadas ainda. Cadastre latitude e longitude verificadas no painel admin.</p>}
      <MapContainer center={me ?? DEFAULT_CENTER} zoom={12} style={{ height: 460 }} className="rounded-3xl">
        <TileLayer attribution="&copy; OpenStreetMap" url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {located.map((p) => (
          <Marker key={p.id} position={[p.lat!, p.lng!]} icon={icon(p.cat)}>
            <Popup>
              <b>{p.name}</b><br />{CATS[p.cat]}<br />
              <Link to={`/destino/${p.id}`}>Detalhes</Link>{' · '}
              <a target="_blank" rel="noopener noreferrer" href={`https://www.openstreetmap.org/directions?to=${p.lat}%2C${p.lng}`}>Traçar rota</a>
            </Popup>
          </Marker>
        ))}
        {me && <Marker position={me}><Popup>Você está aqui</Popup></Marker>}
        {line.length > 1 && <Polyline positions={line} color="#2e9e5b" />}
      </MapContainer>
      {near.length > 0 && (
        <section><h2 className="text-xl font-semibold">Perto de você</h2>
          {near.map(({ p, d }) => <p key={p.id}><Link className="text-brand underline" to={`/destino/${p.id}`}>{p.name}</Link> — {d.toFixed(1)} km</p>)}
        </section>
      )}
    </div>
  )
}
