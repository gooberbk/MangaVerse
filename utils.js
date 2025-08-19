import { supabase } from './supabaseClient.js';

// Shared utility functions for MangaVerse

// Hamburger menu functionality
function initHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    let overlay = null;

    const toggleMenu = () => {
        if (!hamburgerMenu || !navLinks) return;
        
        const isActive = navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        
        if (isActive) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'overlay';
                document.body.appendChild(overlay);
                overlay.addEventListener('click', toggleMenu);
            }
            overlay.style.display = 'block';
        } else {
            if (overlay) {
                overlay.style.display = 'none';
            }
        }
    };

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', toggleMenu);
    }

    return { toggleMenu, overlay };
}

// Error handling for missing images
function handleImageError(img) {
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/200x280/333333/ffffff?text=Image+Error';
        this.onerror = null; // Prevent infinite loop
    };
}

// Function to update UI based on auth state
function updateUserNav(session) {
    const user = session?.user;
    const userActions = document.querySelector('.user-actions');

    if (userActions) {
        if (user) {
            // Extract user info
            const email = user.email;
            const displayName = user.user_metadata?.full_name || email.split('@')[0];
            const avatarUrl = user.user_metadata?.avatar_url;
            
            // Create user profile dropdown
            userActions.innerHTML = `
                <div class="user-profile">
                    <div class="profile-trigger" id="profile-trigger">
                        <div class="user-avatar">
                            ${avatarUrl ? 
                                `<img src="${avatarUrl}" alt="Profile" class="avatar-img">` : 
                                `<div class="avatar-placeholder">${displayName.charAt(0).toUpperCase()}</div>`
                            }
                        </div>
                        <span class="user-name">${displayName}</span>
                        <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                            <path d="M6 8l-4-4h8z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="profile-dropdown" id="profile-dropdown">
                        <div class="profile-info">
                            <div class="profile-email">${email}</div>
                        </div>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item" id="logout-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16,17 21,12 16,7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            `;

            // Add dropdown functionality
            const profileTrigger = document.getElementById('profile-trigger');
            const profileDropdown = document.getElementById('profile-dropdown');
            
            profileTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                profileDropdown.classList.remove('show');
            });

            // Logout functionality
            document.getElementById('logout-btn').addEventListener('click', async () => {
                await supabase.auth.signOut();
            });
        } else {
            userActions.innerHTML = `
                <a href="login.html" class="login-btn">Login</a>
                <a href="signup.html" class="signup-btn">Sign Up</a>
            `;
        }
    }
}

// Initialize common functionality when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    
    const images = document.querySelectorAll('img');
    images.forEach(handleImageError);

    // Handle auth state changes and initial load
    supabase.auth.onAuthStateChange((_event, session) => {
        updateUserNav(session);
        if (_event === 'SIGNED_OUT') {
            window.location.href = '/index.html';
        }
        if (_event === 'SIGNED_IN') {
             // To prevent the token from staying in the URL, we can redirect.
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    });
});

export * from './services/mangaService.js';
export * from './services/chapterService.js';
export * from './services/pageService.js';
export * from './services/authService.js';
export * from './services/storageService.js';
