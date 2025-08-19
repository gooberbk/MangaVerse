import { getMangaById, getChaptersByMangaId } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const mangaDetailContainer = document.querySelector('#manga-detail .container');
    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = urlParams.get('id');

    if (!mangaId) {
        mangaDetailContainer.innerHTML = '<p>No manga specified.</p>';
        return;
    }

    try {
        const manga = await getMangaById(mangaId);
        
        if (manga) {
            const chapters = await getChaptersByMangaId(mangaId);
            document.title = `${manga.title} - MangaVerse`;

            const chapterList = chapters.map(chapter => 
                `<li><a href="reader.html?id=${manga.id}&chapter=${chapter.chapter_number}">Chapter ${chapter.chapter_number}: ${chapter.title}</a></li>`
            ).join('');

            mangaDetailContainer.innerHTML = `
                <div class="manga-detail-layout">
                    <img src="${manga.cover_url}" alt="${manga.title}" class="manga-cover-large">
                    <div class="manga-details">
                        <h1>${manga.title}</h1>
                        <div class="manga-meta">
                            <span>Author: ${manga.author}</span>
                            <span>Genre: ${manga.genre}</span>
                        </div>
                        <h2>Synopsis</h2>
                        <p>${manga.description}</p>
                        <div class="actions">
                            <a href="reader.html?id=${manga.id}&chapter=1" class="read-now-btn">Start Reading</a>
                        </div>
                    </div>
                </div>
                <div class="chapter-list">
                    <h2>Chapters</h2>
                    <ul>${chapterList}</ul>
                </div>
            `;
        } else {
            mangaDetailContainer.innerHTML = '<p>Manga not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching manga details:', error);
        mangaDetailContainer.innerHTML = '<p style="color: red;">Failed to load manga details.</p>';
    }
});
