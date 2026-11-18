import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Place } from '../types'
import { CATS, COLORS, ICONS } from '../data/categories'
import { useApp } from '../context/AppContext'

export default function PlaceCard({ p }: { p: Place }) {
  const { favs, toggleFav } = useApp()
  const fav = favs.includes(p.id)
  return (
    <article className="card">
      <div className="flex h-36 items-center justify-center text-5xl text-white" aria-hidden
        style={{ background: `linear-gradient(135deg, ${COLORS[p.cat]}, #0b5ea8aa)` }}>{ICONS[p.cat]}</div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-bold text-nature">{CATS[p.cat]}</span>
        <h3 className="text-lg font-semibold leading-tight">{p.name}</h3>
        <p className="flex-1 text-sm text-slate-500">Jaboatão dos Guararapes, PE</p>
        <div className="mt-2 flex items-center gap-2">
          <Link className="btn" to={`/destino/${p.id}`}>Conhecer lugar</Link>
          <button className="btn btn-outline" aria-label={fav ? 'Remover favorito' : 'Favoritar'} onClick={() => toggleFav(p.id)}>
            <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </article>
  )
}
