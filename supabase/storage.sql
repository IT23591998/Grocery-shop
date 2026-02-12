-- Enable the storage extension if not already enabled (usually enabled by default in Supabase)
-- create extension if not exists "storage";

-- Create the 'products' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Policy to allow public access to view files in the 'products' bucket
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'products' );

-- Policy to allow authenticated uploads (adjust 'authenticated' to 'anon' for demo/public usage if needed)
-- For this demo/dev environment, we'll allow public uploads to match the rest of the app's policy style
create policy "Public Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'products' );

-- Policy to allow public updates (optional, for replacing images)
create policy "Public Updates"
  on storage.objects for update
  with check ( bucket_id = 'products' );

-- Policy to allow public deletions (optional)
create policy "Public Deletes"
  on storage.objects for delete
  using ( bucket_id = 'products' );
