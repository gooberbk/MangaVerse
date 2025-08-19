import { getUser, signOut, isAdmin } from './utils.js';
import { getAllAdmins, addAdmin, removeAdmin } from './services/adminService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const adminListBody = document.getElementById('admin-list-body');
    const addAdminForm = document.getElementById('add-admin-form');

    let allAdmins = [];

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

    // Admin management functions
    async function renderAdminList() {
        if (!adminListBody) return;
        
        try {
            allAdmins = await getAllAdmins();
            adminListBody.innerHTML = '';
            
            allAdmins.forEach(admin => {
                const row = document.createElement('tr');
                const addedDate = new Date(admin.created_at).toLocaleDateString();
                row.innerHTML = `
                    <td>${admin.email}</td>
                    <td>${addedDate}</td>
                    <td>${admin.created_by || 'System'}</td>
                    <td class="actions">
                        <button class="delete-admin-btn" data-id="${admin.id}">Remove</button>
                    </td>
                `;
                adminListBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error rendering admin list:', error);
            adminListBody.innerHTML = '<tr><td colspan="4" style="color: red;">Failed to load admins.</td></tr>';
        }
    }

    // Add admin form handler
    if (addAdminForm) {
        addAdminForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('admin-email').value.trim();
            
            try {
                await addAdmin(email);
                alert('Admin added successfully!');
                await renderAdminList();
                addAdminForm.reset();
            } catch (error) {
                console.error('Error adding admin:', error);
                alert(`Error adding admin: ${error.message}`);
            }
        });
    }

    // Admin list event handlers
    if (adminListBody) {
        adminListBody.addEventListener('click', async (e) => {
            if (e.target.classList.contains('delete-admin-btn')) {
                const adminId = e.target.dataset.id;
                const admin = allAdmins.find(a => a.id == adminId);
                
                if (admin && confirm(`Are you sure you want to remove admin "${admin.email}"?`)) {
                    try {
                        await removeAdmin(adminId);
                        await renderAdminList();
                        alert('Admin removed successfully.');
                    } catch (error) {
                        console.error('Error removing admin:', error);
                        alert(`Error removing admin: ${error.message}`);
                    }
                }
            }
        });
    }

    await renderAdminList();
});
