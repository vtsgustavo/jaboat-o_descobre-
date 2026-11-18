import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { Place, Review, User } from '../types'
import { SEED_PLACES } from '../data/places'
import { useLocalStorage } from '../lib/storage'

const toggle = (a: string[], id: string) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id])

function useAppState() {
  const [extra, setExtra] = useLocalStorage<Place[]>('jd-extra', [])
  const [favs, setFavs] = useLocalStorage<string[]>('jd-favs', [])
  const [route, setRoute] = useLocalStorage<string[]>('jd-route', [])
  const [visited, setVisited] = useLocalStorage<string[]>('jd-visited', [])
  const [reviews, setReviews] = useLocalStorage<Review[]>('jd-reviews', [])
  const [user, setUser] = useLocalStorage<User | null>('jd-user', null)
  const [toast, setToast] = useState('')

  const msg = useCallback((s: string) => { setToast(s); setTimeout(() => setToast(''), 2200) }, [])
  const places = [...SEED_PLACES, ...extra]

  return {
    places, extra, setExtra, favs, route, setRoute, visited, reviews, setReviews, user, setUser, toast, msg,
    toggleFav: (id: string) => { setFavs(toggle(favs, id)); msg(favs.includes(id) ? 'Removido dos favoritos' : 'Salvo nos favoritos') },
    toggleRoute: (id: string) => { setRoute(toggle(route, id)); msg(route.includes(id) ? 'Removido do roteiro' : 'Adicionado ao roteiro') },
    toggleVisit: (id: string) => { setVisited(toggle(visited, id)); msg(visited.includes(id) ? 'Visita removida' : 'Visita registrada!') },
    addReview: (r: Review) => { setReviews([...reviews, r]); msg('Avaliação enviada') },
  }
}

type Ctx = ReturnType<typeof useAppState>
const AppCtx = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  return <AppCtx.Provider value={useAppState()}>{children}</AppCtx.Provider>
}
export function useApp() {
  const c = useContext(AppCtx)
  if (!c) throw new Error('useApp fora do AppProvider')
  return c
}
