-- Esquema para o Supabase (SQL Editor). Usuários ficam em auth.users.
create table categorias (id serial primary key, nome text not null unique);

create table atrativos (
  id uuid primary key default gen_random_uuid(),
  nome text not null, categoria_id int references categorias(id),
  descricao text, historia text, endereco text, visitacao text,
  lat double precision, lng double precision, fotos text[] default '{}',
  criado_em timestamptz default now()
);
create table eventos (
  id uuid primary key default gen_random_uuid(),
  nome text not null, imagem text, data_hora timestamptz, local text,
  descricao text, categoria text, participacao text
);
create table estabelecimentos (
  id uuid primary key default gen_random_uuid(),
  nome text not null, foto text, categoria text, descricao text,
  endereco text, contato text, redes_sociais text
);
create table roteiros (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references auth.users, nome text not null,
  atrativos uuid[] default '{}', criado_em timestamptz default now()
);
create table favoritos (
  usuario_id uuid references auth.users, atrativo_id uuid references atrativos(id) on delete cascade,
  primary key (usuario_id, atrativo_id)
);
create table avaliacoes (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references auth.users, atrativo_id uuid references atrativos(id) on delete cascade,
  nota int check (nota between 1 and 5), comentario text, criado_em timestamptz default now()
);
create table conquistas (
  usuario_id uuid references auth.users, codigo text not null, atrativo_id uuid references atrativos(id),
  criado_em timestamptz default now(), primary key (usuario_id, codigo)
);

-- RLS: leitura pública do conteúdo; escrita do usuário apenas nos próprios registros.
alter table atrativos enable row level security;
alter table eventos enable row level security;
alter table estabelecimentos enable row level security;
alter table roteiros enable row level security;
alter table favoritos enable row level security;
alter table avaliacoes enable row level security;
alter table conquistas enable row level security;

create policy "leitura publica" on atrativos for select using (true);
create policy "leitura publica" on eventos for select using (true);
create policy "leitura publica" on estabelecimentos for select using (true);
create policy "leitura publica" on avaliacoes for select using (true);
create policy "proprio" on roteiros for all using (auth.uid() = usuario_id);
create policy "proprio" on favoritos for all using (auth.uid() = usuario_id);
create policy "proprio" on conquistas for all using (auth.uid() = usuario_id);
create policy "avaliar" on avaliacoes for insert with check (auth.uid() = usuario_id);
-- Escrita em atrativos/eventos/estabelecimentos: crie uma role/claim de admin e as policies correspondentes.
-- Storage: crie o bucket "fotos" para as imagens.
