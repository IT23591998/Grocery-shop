-- Create categories table
create table categories (
  id bigint primary key generated always as identity,
  name text not null
);

-- Create products table
create table products (
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

-- Enable RLS
alter table categories enable row level security;
alter table products enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access on categories" on categories for select using (true);
create policy "Allow public read access on products" on products for select using (true);
