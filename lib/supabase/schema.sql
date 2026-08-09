-- =========================================================
-- PROJECT X — Schéma Supabase (Home / Pro / Promoteur)
-- Ce fichier peut être rejoué en entier à tout moment sans erreur.
-- =========================================================
create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  space text not null check (space in ('home', 'pro', 'promoteur')),
  full_name text,
  company_name text,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
drop policy if exists "profil visible par son propriétaire" on profiles;
create policy "profil visible par son propriétaire" on profiles for select using (auth.uid() = id);
drop policy if exists "profil modifiable par son propriétaire" on profiles;
create policy "profil modifiable par son propriétaire" on profiles for update using (auth.uid() = id);
drop policy if exists "profil créé par son propriétaire" on profiles;
create policy "profil créé par son propriétaire" on profiles for insert with check (auth.uid() = id);

-- Un "projet" = une maison (Home), un chantier (Pro) ou une opération (Promoteur)
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references profiles(id) on delete cascade,
  space text not null check (space in ('home', 'pro', 'promoteur')),
  name text not null,
  client_name text,
  address text,
  budget_planned numeric default 0,
  budget_spent numeric default 0,
  progress int default 0,
  status text default 'actif',
  created_at timestamptz default now()
);
alter table projects enable row level security;
drop policy if exists "voir ses projets" on projects;
create policy "voir ses projets" on projects for select using (auth.uid() = owner_id);
drop policy if exists "gérer ses projets" on projects;
create policy "gérer ses projets" on projects for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create table if not exists alerts (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  level text not null check (level in ('vert', 'orange', 'rouge')),
  title text not null,
  detail text,
  resolved boolean default false,
  created_at timestamptz default now()
);
alter table alerts enable row level security;
drop policy if exists "voir les alertes de ses projets" on alerts;
drop policy if exists "gérer les alertes de ses projets" on alerts;
create policy "gérer les alertes de ses projets" on alerts for all using (
  project_id in (select id from projects where owner_id = auth.uid())
) with check (
  project_id in (select id from projects where owner_id = auth.uid())
);

create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  category text,
  status text default 'manquant',
  file_url text,
  created_at timestamptz default now()
);
alter table documents enable row level security;
drop policy if exists "voir les documents de ses projets" on documents;
drop policy if exists "gérer les documents de ses projets" on documents;
create policy "gérer les documents de ses projets" on documents for all using (
  project_id in (select id from projects where owner_id = auth.uid())
) with check (
  project_id in (select id from projects where owner_id = auth.uid())
);

create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  done boolean default false,
  due_date date,
  created_at timestamptz default now()
);
alter table tasks enable row level security;
drop policy if exists "voir les tâches de ses projets" on tasks;
drop policy if exists "gérer les tâches de ses projets" on tasks;
create policy "gérer les tâches de ses projets" on tasks for all using (
  project_id in (select id from projects where owner_id = auth.uid())
) with check (
  project_id in (select id from projects where owner_id = auth.uid())
);

-- Les 11 étapes du parcours Home, persistées par projet
create table if not exists project_steps (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  step_order int not null,
  step_name text not null,
  status text not null default 'todo' check (status in ('todo', 'current', 'done')),
  advice text,
  created_at timestamptz default now()
);
alter table project_steps enable row level security;
drop policy if exists "voir les étapes de ses projets" on project_steps;
drop policy if exists "modifier les étapes de ses projets" on project_steps;
create policy "gérer les étapes de ses projets" on project_steps for all using (
  project_id in (select id from projects where owner_id = auth.uid())
) with check (
  project_id in (select id from projects where owner_id = auth.uid())
);
