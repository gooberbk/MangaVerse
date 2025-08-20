# MangaVerse
A custom manga reading website project featuring a clean design, smooth chapter navigation, and a responsive layout for an optimized reading experience.

## Setup Instructions

### Prerequisites
- A Supabase account and project
- Basic knowledge of HTML, CSS, and JavaScript

### Configuration
1. **Set up Supabase credentials:**
   - Copy `supabaseClient.example.js` to `supabaseClient.js`
   - Replace `YOUR_SUPABASE_URL` with your actual Supabase project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your actual Supabase anonymous key

2. **Database Setup:**
   - Run the SQL commands in `policies.sql` in your Supabase SQL editor
   - Run the SQL commands in `admin_users.sql` to set up admin users table

### Running the Application
1. Start the local server:
   ```bash
   node server.js
   ```
2. Open your browser and navigate to `http://localhost:8000`

## Features
- Manga browsing and reading
- Chapter navigation
- Admin dashboard for content management
- User authentication system
- Responsive design for mobile and desktop

