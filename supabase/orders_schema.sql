-- Create orders table
create table orders (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  customer_address text not null,
  total_amount numeric not null,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))
);

-- Create order items table
create table order_items (
  id bigint primary key generated always as identity,
  order_id bigint references orders(id) on delete cascade,
  product_id bigint references products(id),
  quantity integer not null,
  price_at_time numeric not null
);

-- Enable RLS
alter table orders enable row level security;
alter table order_items enable row level security;

-- Policies (For simple ship, allow public insert for now, restrict read to admin later or via secure methods)
-- Ideally, authentication should be used. For now, we allow anyone to place an order (public insert).
create policy "Allow public insert on orders" on orders for insert with check (true);
create policy "Allow public insert on order_items" on order_items for insert with check (true);

-- Allow public read for verifying their own order (simplified) or Admin only
create policy "Allow public read access on orders" on orders for select using (true); 
create policy "Allow public read access on order_items" on order_items for select using (true);
