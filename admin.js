import { getAllManga, createManga, updateManga, deleteManga, getUser, signOut, uploadImage, isAdmin } from './utils.js';
import { getAllAdmins, addAdmin, removeAdmin } from './services/adminService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const mangaListBody = document.getElementById('manga-list-body');
    const addMangaForm = document.getElementById('add-manga-form');
    const adminListBody = document.getElementById('admin-list-body');
    const addAdminForm = document.getElementById('add-admin-form');
    const logoutBtn = document.getElementById('logout-btn');

    let allManga = [];
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

    async function renderMangaList() {
        if (!mangaListBody) return;
        
        try {
            allManga = await getAllManga();
            mangaListBody.innerHTML = '';
            
            allManga.forEach(manga => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${manga.title}</td>
                    <td>${manga.author}</td>
                    <td>${manga.genre}</td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${manga.id}">Edit</button>
                        <button class="delete-btn" data-id="${manga.id}">Delete</button>
                    </td>
                `;
                mangaListBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error rendering manga list:', error);
            mangaListBody.innerHTML = '<tr><td colspan="4" style="color: red;">Failed to load manga.</td></tr>';
        }
    }

    if (addMangaForm) {
        addMangaForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const coverFile = document.getElementById('manga-cover-file').files[0];
            const formData = {
                title: document.getElementById('manga-title').value.trim(),
                author: document.getElementById('manga-author').value.trim(),
                genre: document.getElementById('manga-genre').value.trim(),
                description: document.getElementById('manga-description').value.trim(),
            };

            const editId = addMangaForm.dataset.editId ? parseInt(addMangaForm.dataset.editId) : null;

            try {
                // For new manga, require cover image
                if (!editId && !coverFile) {
                    alert('A cover image is required when adding new manga.');
                    return;
                }

                if (coverFile) {
                    const cover_url = await uploadImage(coverFile, `covers/${Date.now()}_${coverFile.name}`);
                    formData.cover_url = cover_url;
                }

                if (editId) {
                    await updateManga(editId, formData);
                    alert('Manga updated successfully!');
                } else {
                    await createManga(formData);
                    alert('Manga added successfully!');
                }
                
                await renderMangaList();
                resetForm();

            } catch (error) {
                console.error('Error saving manga:', error);
                alert(`Error saving manga: ${error.message}`);
            }
        });
    }

    function resetForm() {
        addMangaForm.reset();
        addMangaForm.querySelector('h3').textContent = 'Add New Manga';
        addMangaForm.querySelector('button[type="submit"]').textContent = 'Add Manga';
        delete addMangaForm.dataset.editId;
    }

    mangaListBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const mangaId = e.target.dataset.id;
            editManga(mangaId);
        } else if (e.target.classList.contains('delete-btn')) {
            const mangaId = e.target.dataset.id;
            handleDeleteManga(mangaId);
        }
    });

    function editManga(id) {
        const manga = allManga.find(m => m.id == id);
        if (!manga) return;

        document.getElementById('manga-title').value = manga.title;
        document.getElementById('manga-author').value = manga.author;
        document.getElementById('manga-genre').value = manga.genre;
        document.getElementById('manga-description').value = manga.description;

        const form = document.getElementById('add-manga-form');
        form.querySelector('h3').textContent = 'Edit Manga';
        form.querySelector('button[type="submit"]').textContent = 'Update Manga';
        form.dataset.editId = id;
        form.scrollIntoView({ behavior: 'smooth' });
    }

    async function handleDeleteManga(id) {
        const manga = allManga.find(m => m.id == id);
        if (!manga) return;

        if (confirm(`Are you sure you want to delete "${manga.title}"?`)) {
            try {
                await deleteManga(id);
                await renderMangaList();
                alert('Manga deleted successfully.');
            } catch (error) {
                console.error('Error deleting manga:', error);
                alert(`Error deleting manga: ${error.message}`);
            }
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await signOut();
            window.location.href = 'login.html';
        });
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
                    <td class="actions">
                        <button class="delete-admin-btn" data-id="${admin.id}">Remove</button>
                    </td>
                `;
                adminListBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error rendering admin list:', error);
            adminListBody.innerHTML = '<tr><td colspan="3" style="color: red;">Failed to load admins.</td></tr>';
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
    await renderMangaList();
});
