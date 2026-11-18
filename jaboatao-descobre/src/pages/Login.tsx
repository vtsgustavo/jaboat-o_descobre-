import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'

export default function Login() {
  const { user, setUser, msg } = useApp()
  const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [err, setErr] = useState('')
  const nav = useNavigate()
  const submit = async (e: FormEvent) => {
    e.preventDefault(); setErr('')
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw })
      if (error) return setErr(error.message)
    }
    setUser({ email }); msg('Login realizado'); nav('/admin')
  }
  if (user) return <div className="space-y-3"><p>Conectado como {user.email}</p><button className="btn" onClick={() => { supabase?.auth.signOut(); setUser(null) }}>Sair</button></div>
  return (
    <form onSubmit={submit} className="mx-auto flex max-w-sm flex-col gap-3">
      <h1 className="text-2xl font-bold">Entrar</h1>
      {!supabase && <p className="note">Modo demonstração: qualquer e-mail entra. Configure o Supabase para autenticação real.</p>}
      <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" aria-label="E-mail" />
      <input className="input" type="password" required value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Senha" aria-label="Senha" />
      {err && <p role="alert" className="text-red-600">{err}</p>}
      <button className="btn justify-center">Entrar</button>
    </form>
  )
}
