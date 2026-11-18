import { FormEvent, useState } from 'react'
import { Entry } from '../types'
import { useLocalStorage } from '../lib/storage'
import { useApp } from '../context/AppContext'

interface Props { storageKey: string; title: string; labelA: string; labelB: string }

// Lista genérica (eventos e comércio local). Troque por tabelas do Supabase quando houver credenciais.
export default function LocalList({ storageKey, title, labelA, labelB }: Props) {
  const [list, setList] = useLocalStorage<Entry[]>(storageKey, [])
  const [a, setA] = useState(''); const [b, setB] = useState('')
  const { msg } = useApp()
  const submit = (e: FormEvent) => {
    e.preventDefault(); if (!a.trim()) return
    setList([...list, { a, b }]); setA(''); setB(''); msg('Cadastrado')
  }
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="note">Modo demonstração: itens ficam só neste navegador. Nenhum dado fictício foi pré-cadastrado.</p>
      <form onSubmit={submit} className="flex flex-wrap gap-2">
        <input className="input" value={a} onChange={(e) => setA(e.target.value)} placeholder={labelA} aria-label={labelA} />
        <input className="input" value={b} onChange={(e) => setB(e.target.value)} placeholder={labelB} aria-label={labelB} />
        <button className="btn">Adicionar</button>
      </form>
      {list.length === 0 && <p>Nada cadastrado ainda.</p>}
      {list.map((x, i) => (
        <div key={i} className="flex items-center justify-between rounded-2xl border bg-white px-4 py-2">
          <span><b>{x.a}</b> {x.b}</span>
          <button className="btn btn-outline" onClick={() => setList(list.filter((_, j) => j !== i))}>Remover</button>
        </div>
      ))}
    </div>
  )
}
