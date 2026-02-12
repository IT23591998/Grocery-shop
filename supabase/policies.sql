-- Allow full access to categories for authenticated users (or everyone for demo)
-- For simplicity in this demo, we will allow public access (anon key) to INSERT/UPDATE/DELETE
-- In a real production app, you would restrict this to authenticated users only.

-- Categories Policies
CREATE POLICY "Allow public insert on categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on categories" ON categories FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on categories" ON categories FOR DELETE USING (true);

-- Products Policies
CREATE POLICY "Allow public insert on products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on products" ON products FOR DELETE USING (true);
