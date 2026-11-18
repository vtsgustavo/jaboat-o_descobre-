export interface Place {
  id: string
  name: string
  cat: number
  desc: string
  lat?: number // preencher via admin com dados verificados
  lng?: number
}
export interface Review { pid: string; n: number; t: string }
export interface User { email: string }
export interface Entry { a: string; b: string }
