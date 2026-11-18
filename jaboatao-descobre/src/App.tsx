import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explorar from './pages/Explorar'
import Destino from './pages/Destino'
import Mapa from './pages/Mapa'
import Roteiros from './pages/Roteiros'
import Eventos from './pages/Eventos'
import ComercioLocal from './pages/ComercioLocal'
import Favoritos from './pages/Favoritos'
import DesafioExplorador from './pages/DesafioExplorador'
import Login from './pages/Login'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/destino/:id" element={<Destino />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/roteiros" element={<Roteiros />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/comercio-local" element={<ComercioLocal />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/desafio-explorador" element={<DesafioExplorador />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<p>Página não encontrada.</p>} />
      </Route>
    </Routes>
  )
}
