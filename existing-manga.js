import { getAllManga, createManga, updateManga, deleteManga, getUser, signOut, uploadImage, isAdmin } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const mangaListBody = document.getElementById('manga-list-body');
    const searchInput = document.getElementById('search-manga');
    const genreFilter = document.getElementById('genre-filter');
    const sortBy = document.getElementById('sort-by');

    let allManga = [];
    let filteredManga = [];

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

    async function renderMangaList(mangaToRender = filteredManga) {
        if (!mangaListBody) return;
        
        try {
            mangaListBody.innerHTML = '';
            
            mangaToRender.forEach(manga => {
                const row = document.createElement('tr');
                const coverImg = manga.cover_url ? 
                    `<img src="${manga.cover_url}" alt="${manga.title}" class="manga-cover-thumb">` : 
                    '<div class="no-cover">No Cover</div>';
                
                row.innerHTML = `
                    <td>${coverImg}</td>
                    <td>${manga.title}</td>
                    <td>${manga.author}</td>
                    <td>${manga.genre}</td>
                    <td>0</td>
                    <td class="actions">
                        <button class="edit-btn" data-id="${manga.id}">Edit</button>
                        <button class="delete-btn" data-id="${manga.id}">Delete</button>
                    </td>
                `;
                mangaListBody.appendChild(row);
            });

            if (mangaToRender.length === 0) {
                mangaListBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #888;">No manga found.</td></tr>';
            }
        } catch (error) {
            console.error('Error rendering manga list:', error);
            mangaListBody.innerHTML = '<tr><td colspan="6" style="color: red;">Failed to load manga.</td></tr>';
        }
    }

    async function loadAllManga() {
        try {
            allManga = await getAllManga();
            filteredManga = [...allManga];
            await renderMangaList();
        } catch (error) {
            console.error('Error loading manga:', error);
        }
    }

    function filterAndSortManga() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;
        const sortOption = sortBy.value;

        // Filter by search term
        filteredManga = allManga.filter(manga => {
            const matchesSearch = manga.title.toLowerCase().includes(searchTerm) || 
                                manga.author.toLowerCase().includes(searchTerm);
            const matchesGenre = selectedGenre === 'all' || manga.genre === selectedGenre;
            return matchesSearch && matchesGenre;
        });

        // Sort manga
        filteredManga.sort((a, b) => {
            switch (sortOption) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'author':
                    return a.author.localeCompare(b.author);
                case 'created_at':
                    return new Date(b.created_at) - new Date(a.created_at);
                default:
                    return 0;
            }
        });

        renderMangaList();
    }

    // Event listeners for search and filter
    if (searchInput) {
        searchInput.addEventListener('input', filterAndSortManga);
    }

    if (genreFilter) {
        genreFilter.addEventListener('change', filterAndSortManga);
    }

    if (sortBy) {
        sortBy.addEventListener('change', filterAndSortManga);
    }

    // Manga list event handlers
    if (mangaListBody) {
        mangaListBody.addEventListener('click', async (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const mangaId = e.target.dataset.id;
                const manga = allManga.find(m => m.id == mangaId);
                if (manga) {
                    // Redirect to manga management page with edit data
                    localStorage.setItem('editManga', JSON.stringify(manga));
                    window.location.href = 'manga-management.html';
                }
            } else if (e.target.classList.contains('delete-btn')) {
                const mangaId = e.target.dataset.id;
                const manga = allManga.find(m => m.id == mangaId);
                
                if (manga && confirm(`Are you sure you want to delete "${manga.title}"?`)) {
                    try {
                        await deleteManga(mangaId);
                        await loadAllManga();
                        alert('Manga deleted successfully.');
                    } catch (error) {
                        console.error('Error deleting manga:', error);
                        alert(`Error deleting manga: ${error.message}`);
                    }
                }
            }
        });
    }

    await loadAllManga();
});
