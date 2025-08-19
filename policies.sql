-- Enable RLS for all relevant tables
ALTER TABLE "Manga" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Chapters" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Pages" ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR 'Manga' TABLE
-- 1. Allow public, unauthenticated read access to all manga.
CREATE POLICY "Allow public read access to manga" ON "Manga"
FOR SELECT USING (true);

-- 2. Allow only admin users to insert, update, and delete manga.
CREATE POLICY "Allow admin users to manage manga" ON "Manga"
FOR ALL USING (
  auth.role() = 'authenticated' AND 
  EXISTS (
    SELECT 1 FROM "admin_users" 
    WHERE user_id = auth.uid()
  )
);

-- POLICIES FOR 'Chapters' TABLE
-- 1. Allow public, unauthenticated read access to all chapters.
CREATE POLICY "Allow public read access to chapters" ON "Chapters"
FOR SELECT USING (true);

-- 2. Allow only admin users to insert, update, and delete chapters.
CREATE POLICY "Allow admin users to manage chapters" ON "Chapters"
FOR ALL USING (
  auth.role() = 'authenticated' AND 
  EXISTS (
    SELECT 1 FROM "admin_users" 
    WHERE user_id = auth.uid()
  )
);

-- POLICIES FOR 'Pages' TABLE
-- 1. Allow public, unauthenticated read access to all pages.
CREATE POLICY "Allow public read access to pages" ON "Pages"
FOR SELECT USING (true);

-- 2. Allow only admin users to insert, update, and delete pages.
CREATE POLICY "Allow admin users to manage pages" ON "Pages"
FOR ALL USING (
  auth.role() = 'authenticated' AND 
  EXISTS (
    SELECT 1 FROM "admin_users" 
    WHERE user_id = auth.uid()
  )
);


