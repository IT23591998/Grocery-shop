-- COMBINED FIX SCRIPT

-- 1. Create Categories Table (if not exists)
create table if not exists categories (
  id bigint primary key generated always as identity,
  name text not null
);

-- 2. Create Products Table (if not exists)
create table if not exists products (
  id bigint primary key generated always as identity,
  category_id bigint references categories(id),
  name text not null,
  description text,
  price numeric not null,
  unit_weight text,
  image_url text,
  is_featured boolean default false,
  in_stock boolean default true
);

-- 3. Enable RLS
alter table categories enable row level security;
alter table products enable row level security;

-- 4. Create Policies for Public Access (Dev/Demo Mode)
-- Drop existing policies to avoid conflicts
drop policy if exists "Allow public read access on categories" on categories;
drop policy if exists "Allow public insert on categories" on categories;
drop policy if exists "Allow public update on categories" on categories;
drop policy if exists "Allow public delete on categories" on categories;

drop policy if exists "Allow public read access on products" on products;
drop policy if exists "Allow public insert on products" on products;
drop policy if exists "Allow public update on products" on products;
drop policy if exists "Allow public delete on products" on products;

-- Re-create policies
create policy "Allow public read access on categories" on categories for select using (true);
create policy "Allow public insert on categories" on categories for insert with check (true);
create policy "Allow public update on categories" on categories for update using (true);
create policy "Allow public delete on categories" on categories for delete using (true);

create policy "Allow public read access on products" on products for select using (true);
create policy "Allow public insert on products" on products for insert with check (true);
create policy "Allow public update on products" on products for update using (true);
create policy "Allow public delete on products" on products for delete using (true);

-- 5. Storage Setup
-- Enable storage extension (usually on by default)
-- create extension if not exists "storage";

-- Create 'products' bucket
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Storage Policies
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Public Uploads" on storage.objects;
drop policy if exists "Public Updates" on storage.objects;
drop policy if exists "Public Deletes" on storage.objects;

create policy "Public Access" on storage.objects for select using ( bucket_id = 'products' );
create policy "Public Uploads" on storage.objects for insert with check ( bucket_id = 'products' );
create policy "Public Updates" on storage.objects for update with check ( bucket_id = 'products' );
create policy "Public Deletes" on storage.objects for delete using ( bucket_id = 'products' );

-- 6. Seed Data (Optional, but good to include)
INSERT INTO categories (name) 
SELECT 'Fruits & Vegetables' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Fruits & Vegetables');

INSERT INTO categories (name) 
SELECT 'Dairy & Eggs' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Dairy & Eggs');

INSERT INTO categories (name) 
SELECT 'Bakery' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Bakery');
