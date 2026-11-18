import { Link, NavLink, Outlet } from 'react-router-dom'
import { Compass, Heart, Map, Route, Trophy, CalendarDays, Store, Shield } from 'lucide-react'
import { useApp } from '../context/AppContext'

const NAV = [
  { to: '/explorar', label: 'Explorar', Icon: Compass },
  { to: '/mapa', label: 'Mapa', Icon: Map },
  { to: '/roteiros', label: 'Roteiros', Icon: Route },
  { to: '/eventos', label: 'Eventos', Icon: CalendarDays },
  { to: '/comercio-local', label: 'Comércio local', Icon: Store },
  { to: '/favoritos', label: 'Favoritos', Icon: Heart },
  { to: '/desafio-explorador', label: 'Desafio', Icon: Trophy },
  { to: '/admin', label: 'Admin', Icon: Shield },
]

export default function Layout() {
  const { toast } = useApp()
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-[1000] flex flex-wrap items-center gap-x-4 gap-y-2 border-b bg-white px-4 py-3">
        <Link to="/" className="text-xl font-extrabold text-brand">Jaboatão <span className="text-nature">Descobre</span></Link>
        <nav aria-label="Principal" className="flex flex-wrap gap-1">
          {NAV.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) =>
              `flex items-center gap-1 rounded-full px-3 py-1 text-sm ${isActive ? 'bg-brand text-white' : 'hover:bg-slate-100'}`}>
              <Icon size={16} aria-hidden /> {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-4"><Outlet /></main>
      <footer className="border-t py-8 text-center text-sm text-slate-500">
        Jaboatão Descobre — guia turístico de Jaboatão dos Guararapes, PE
      </footer>
      {toast && <div role="status" className="fixed bottom-4 left-1/2 z-[2000] -translate-x-1/2 rounded-full bg-slate-800 px-4 py-2 text-white">{toast}</div>}
    </div>
  )
}
