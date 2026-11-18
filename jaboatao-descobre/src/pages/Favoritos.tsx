import { useApp } from '../context/AppContext'
import PlaceGrid from '../components/PlaceGrid'
export default function Favoritos() {
  const { places, favs } = useApp()
  return <div className="space-y-4"><h1 className="text-2xl font-bold">Favoritos</h1><PlaceGrid places={places.filter((p) => favs.includes(p.id))} empty="Você ainda não salvou lugares." /></div>
}
