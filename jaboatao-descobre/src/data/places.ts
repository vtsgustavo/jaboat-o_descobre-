import { Place } from '../types'

export const DEFAULT_DESC =
  'Informações detalhadas (história, horários, endereço e visitação) serão cadastradas pelo administrador.'

// Apenas nomes e categorias. Nenhum dado turístico foi inventado.
export const SEED_PLACES: Place[] = [
  { id: 'piedade', name: 'Praia de Piedade', cat: 0, desc: DEFAULT_DESC },
  { id: 'candeias', name: 'Praia de Candeias', cat: 0, desc: DEFAULT_DESC },
  { id: 'barra-de-jangada', name: 'Praia de Barra de Jangada', cat: 0, desc: DEFAULT_DESC },
  { id: 'prazeres', name: 'Igreja de Nossa Senhora dos Prazeres (Monte dos Guararapes)', cat: 5, desc: DEFAULT_DESC },
]
