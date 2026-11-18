import { Place } from '../types'

export interface Achievement { icon: string; title: string; test: (visited: Place[], all: Place[]) => boolean }
const n = (l: Place[], cats: number[]) => l.filter((p) => cats.includes(p.cat)).length

export const ACHIEVEMENTS: Achievement[] = [
  { icon: '🥇', title: 'Primeiro destino explorado', test: (v) => v.length > 0 },
  { icon: '🏖️', title: 'Explorador das praias', test: (v, a) => n(v, [0]) > 0 && n(v, [0]) === n(a, [0]) },
  { icon: '🏛️', title: 'Conhecedor da história local', test: (v) => n(v, [1, 5]) > 0 },
  { icon: '🎭', title: 'Explorador cultural', test: (v) => n(v, [2]) > 0 },
]
