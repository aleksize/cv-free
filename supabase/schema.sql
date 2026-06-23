-- CV Creator — Supabase schema
-- Выполнить в Supabase SQL Editor или через миграции

-- Создаём пространство имён (опционально)
-- create schema if not exists cv_creator;

-- Пользователи (используются через Clerk в Phase 3)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  subscription text default 'free', -- free / pro / premium
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Резюме пользователя
create table if not exists public.cvs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  title text default 'Без названия',
  data jsonb not null,
  template text not null default 'classic',
  pdf_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Индекс для быстрого поиска резюме пользователя
create index if not exists cvs_user_id_idx on public.cvs(user_id);

-- Шаблоны (админ-управляемые)
create table if not exists public.templates (
  id text primary key, -- 'classic', 'modern', 'minimal'
  name text not null,
  description text,
  category text default 'general', -- general / tech / creative
  is_premium boolean default false,
  is_active boolean default true,
  preview_gradient text, -- для карточки выбора
  created_at timestamptz default now()
);

-- Заполняем стартовыми шаблонами
insert into public.templates (id, name, description, category, is_premium) values
  ('classic', 'Классический', 'Традиционный резюме с заголовком и чёткими секциями.', 'general', false),
  ('modern', 'Современный', 'Яркий акцент, цветной заголовок, хедер с контактами.', 'general', false),
  ('minimal', 'Минималистичный', 'Только суть: шрифт, плотности, без лишнего.', 'general', false)
on conflict (id) do nothing;

-- Включить RLS
alter table public.profiles enable row level security;
alter table public.cvs enable row level security;
alter table public.templates enable row level security;

-- Политики доступа
create policy "Users view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users manage own cvs" on public.cvs
  for all using (auth.uid() = user_id);

-- Шаблоны читаемые всеми
create policy "Templates are readable" on public.templates
  for select using (is_active = true);
