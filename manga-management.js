import { getAllManga, createManga, updateManga, deleteManga, getUser, signOut, uploadImage, isAdmin } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const addMangaForm = document.getElementById('add-manga-form');
    const editMangaForm = document.getElementById('edit-manga-form');
    const editMangaSection = document.getElementById('edit-manga-section');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');

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

    // Add manga form handler
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

            try {
                // For new manga, require cover image
                if (!coverFile) {
                    alert('A cover image is required when adding new manga.');
                    return;
                }

                const cover_url = await uploadImage(coverFile, `covers/${Date.now()}_${coverFile.name}`);
                formData.cover_url = cover_url;

                await createManga(formData);
                alert('Manga added successfully!');
                addMangaForm.reset();

            } catch (error) {
                console.error('Error saving manga:', error);
                alert(`Error saving manga: ${error.message}`);
            }
        });
    }

    // Edit manga form handler
    if (editMangaForm) {
        editMangaForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const mangaId = document.getElementById('edit-manga-id').value;
            const coverFile = document.getElementById('edit-manga-cover-file').files[0];
            const formData = {
                title: document.getElementById('edit-manga-title').value.trim(),
                author: document.getElementById('edit-manga-author').value.trim(),
                genre: document.getElementById('edit-manga-genre').value.trim(),
                description: document.getElementById('edit-manga-description').value.trim(),
            };

            try {
                if (coverFile) {
                    const cover_url = await uploadImage(coverFile, `covers/${Date.now()}_${coverFile.name}`);
                    formData.cover_url = cover_url;
                }

                await updateManga(mangaId, formData);
                alert('Manga updated successfully!');
                hideEditForm();

            } catch (error) {
                console.error('Error updating manga:', error);
                alert(`Error updating manga: ${error.message}`);
            }
        });
    }

    // Cancel edit button
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', hideEditForm);
    }

    function hideEditForm() {
        editMangaSection.style.display = 'none';
        editMangaForm.reset();
    }

    // Function to show edit form (can be called from existing-manga.html)
    window.showEditForm = (manga) => {
        document.getElementById('edit-manga-id').value = manga.id;
        document.getElementById('edit-manga-title').value = manga.title;
        document.getElementById('edit-manga-author').value = manga.author;
        document.getElementById('edit-manga-genre').value = manga.genre;
        document.getElementById('edit-manga-description').value = manga.description;
        editMangaSection.style.display = 'block';
        editMangaSection.scrollIntoView({ behavior: 'smooth' });
    };
});
