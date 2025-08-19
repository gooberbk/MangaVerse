-- Create admin_users table for dynamic admin management
CREATE TABLE IF NOT EXISTS "admin_users" (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    UNIQUE(user_id),
    UNIQUE(email)
);

-- Enable RLS for admin_users table
ALTER TABLE "admin_users" ENABLE ROW LEVEL SECURITY;

-- Allow public read access to check admin status
CREATE POLICY "Allow public read access to admin_users" ON "admin_users"
FOR SELECT USING (true);

-- Only allow existing admins to manage admin users
CREATE POLICY "Allow admins to manage admin_users" ON "admin_users"
FOR ALL USING (
  auth.role() = 'authenticated' AND (
    auth.jwt() ->> 'email' = 'mahdigoober@gmail.com' OR -- Your super admin email
    EXISTS (
      SELECT 1 FROM "admin_users" 
      WHERE user_id = auth.uid()
    )
  )
);

-- Insert initial super admin (you)
INSERT INTO "admin_users" (user_id, email, created_by) 
VALUES (
  (SELECT id FROM auth.users WHERE email = 'mahdigoober@gmail.com'),
  'mahdigoober@gmail.com',
  (SELECT id FROM auth.users WHERE email = 'mahdigoober@gmail.com')
) ON CONFLICT (email) DO NOTHING;
