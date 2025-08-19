import { getUser, signOut, isAdmin } from './utils.js';
import { getAllAdmins } from './services/adminService.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is authenticated and is an admin
    const user = await getUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'index.html';
        return;
    }

    // Load dashboard statistics
    await loadDashboardStats();
    await loadRecentActivity();
});

async function loadDashboardStats() {
    try {
        // Get total manga count
        const { getAllManga } = await import('./utils.js');
        const manga = await getAllManga();
        document.getElementById('total-manga').textContent = manga.length;

        // Get total chapters count (if you have chapters)
        // For now, we'll set it to 0 or calculate from manga
        document.getElementById('total-chapters').textContent = '0';

        // Get total admins count
        const admins = await getAllAdmins();
        document.getElementById('total-admins').textContent = admins.length;

        // Get total users count (this would need a separate query to auth.users)
        document.getElementById('total-users').textContent = '0';

    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

async function loadRecentActivity() {
    const activityList = document.getElementById('activity-list');
    
    // For now, show placeholder activity
    activityList.innerHTML = `
        <div class="activity-item">
            <div class="activity-icon">📚</div>
            <div class="activity-content">
                <p><strong>System initialized</strong></p>
                <small>Welcome to your MangaVerse admin dashboard</small>
            </div>
        </div>
    `;
}
