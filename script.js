import { getAllManga } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const mangaGrid = document.querySelector('.manga-grid');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const genreFilter = document.getElementById('genre-filter');
    const sortBy = document.getElementById('sort-by');

    let allManga = [];

    function displayManga(mangaList) {
        if (!mangaGrid) return;
        
        mangaGrid.innerHTML = '';
        
        if (mangaList.length === 0) {
            mangaGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #b0b0b0;">No manga found.</p>';
            return;
        }

        mangaList.forEach(manga => {
            const mangaCard = document.createElement('div');
            mangaCard.classList.add('manga-card');
            mangaCard.addEventListener('click', () => {
                window.location.href = `manga.html?id=${manga.id}`;
            });

            mangaCard.innerHTML = `
                <img src="${manga.cover_url}" alt="${manga.title}" onerror="this.src='https://via.placeholder.com/200x280/333333/ffffff?text=Image+Error'">
                <div class="manga-info">
                    <h3>${manga.title}</h3>
                    <p>Author: ${manga.author}</p>
                    <p class="genre">${manga.genre}</p>
                </div>
            `;
            mangaGrid.appendChild(mangaCard);
        });
    }

    async function fetchAndDisplayManga() {
        try {
            allManga = await getAllManga();
            filterAndSortManga();
        } catch (error) {
            console.error('Error fetching manga:', error);
            if (mangaGrid) {
                mangaGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: red;">Failed to load manga. Please try again later.</p>';
            }
        }
    }

    function filterAndSortManga() {
        let filteredManga = [...allManga];

        // Search filter
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        if (searchTerm) {
            filteredManga = filteredManga.filter(manga => 
                manga.title.toLowerCase().includes(searchTerm) ||
                manga.author.toLowerCase().includes(searchTerm) ||
                manga.genre.toLowerCase().includes(searchTerm)
            );
        }

        // Genre filter
        const selectedGenre = genreFilter ? genreFilter.value : 'all';
        if (selectedGenre !== 'all') {
            filteredManga = filteredManga.filter(manga => 
                manga.genre.includes(selectedGenre)
            );
        }

        // Sorting
        const sortValue = sortBy ? sortBy.value : 'title';
        filteredManga.sort((a, b) => {
            if (a[sortValue] < b[sortValue]) return -1;
            if (a[sortValue] > b[sortValue]) return 1;
            return 0;
        });

        displayManga(filteredManga);
    }

    // Event listeners
    if (searchButton) {
        searchButton.addEventListener('click', filterAndSortManga);
    }
    if (searchInput) {
        searchInput.addEventListener('input', filterAndSortManga);
    }
    if (genreFilter) {
        genreFilter.addEventListener('change', filterAndSortManga);
    }
    if (sortBy) {
        sortBy.addEventListener('change', filterAndSortManga);
    }

    // Initial display
    if (mangaGrid) {
        fetchAndDisplayManga();
    }
});

