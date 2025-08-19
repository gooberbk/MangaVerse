import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Replace with your Supabase project details
// In a static project without a build step, process.env is not available.
// Replace these values with your actual Supabase credentials.
// IMPORTANT: For a production application, use a build system to handle environment variables securely.
const supabaseUrl = 'https://lazbpigpddvxrcenbkor.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhemJwaWdwZGR2eHJjZW5ia29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NzIyNDYsImV4cCI6MjA3MTA0ODI0Nn0.ILZh4AaJWQ78h1ysQgpn18tgHWgetNFfbGvHLOOV9_4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
