import { useEffect, useState, Dispatch, SetStateAction } from 'react'

function read<T>(k: string, d: T): T {
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : d } catch { return d }
}
export function useLocalStorage<T>(k: string, d: T): [T, Dispatch<SetStateAction<T>>] {
  const [s, set] = useState<T>(() => read(k, d))
  useEffect(() => { try { localStorage.setItem(k, JSON.stringify(s)) } catch { /* ignore */ } }, [k, s])
  return [s, set]
}
