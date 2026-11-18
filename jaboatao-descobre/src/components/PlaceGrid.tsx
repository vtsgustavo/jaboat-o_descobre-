import { Place } from '../types'
import PlaceCard from './PlaceCard'

export default function PlaceGrid({ places, empty = 'Nada por aqui ainda.' }: { places: Place[]; empty?: string }) {
  if (!places.length) return <p>{empty}</p>
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{places.map((p) => <PlaceCard key={p.id} p={p} />)}</div>
}
