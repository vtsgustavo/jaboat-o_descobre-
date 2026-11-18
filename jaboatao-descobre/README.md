# Jaboatão Descobre

Guia turístico de Jaboatão dos Guararapes (React + Vite + TypeScript + Tailwind + React Router + Lucide + Leaflet + Supabase).

## Rodar
```
npm install
npm run dev
```
Sem credenciais, roda em modo demonstração (localStorage). Para o Supabase: copie `.env.example` para `.env`, preencha, e execute `supabase/schema.sql`.

## Estrutura
- `src/pages` — uma página por rota (`/`, `/explorar`, `/destino/:id`, `/mapa`, `/roteiros`, `/eventos`, `/comercio-local`, `/favoritos`, `/desafio-explorador`, `/login`, `/admin`)
- `src/components` — Layout, PlaceCard, PlaceGrid, LocalList
- `src/context` — estado global (favoritos, roteiro, visitas, avaliações, login)
- `src/data` — categorias, atrativos iniciais, rotas temáticas, conquistas
- `src/lib` — localStorage, cliente Supabase, cálculo de distância
- `supabase/schema.sql` — tabelas e políticas RLS

## Dados
Só os nomes dos 4 atrativos iniciais foram cadastrados. Histórico, horários, endereços, fotos e coordenadas devem ser inseridos pelo admin com informações verificadas.
O mapa só mostra atrativos com latitude/longitude cadastradas.
