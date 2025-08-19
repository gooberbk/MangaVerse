import { getMangaById, getChaptersByMangaId, getPagesByChapterId } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const mangaTitleHeader = document.querySelector('.manga-title-header');
    const mangaPagesContainer = document.querySelector('.manga-pages');
    const pageIndicator = document.getElementById('page-indicator');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const chapterSelect = document.getElementById('chapter-select');
    const exitReaderBtn = document.querySelector('.exit-reader');

    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = urlParams.get('id');
    let currentChapterNumber = parseInt(urlParams.get('chapter') || '1');

    let pages = [];
    let currentPage = 1;

    async function loadChapter(mangaId, chapterNumber) {
        try {
            const manga = await getMangaById(mangaId);
            const chapters = await getChaptersByMangaId(mangaId);
            const chapter = chapters.find(c => c.chapter_number === chapterNumber);

            if (!manga || !chapter) {
                mangaPagesContainer.innerHTML = '<p>Chapter not found.</p>';
                return;
            }

            document.title = `${manga.title} - Chapter ${chapter.chapter_number} - MangaVerse`;
            mangaTitleHeader.textContent = `${manga.title} - Chapter ${chapter.chapter_number}`;
            exitReaderBtn.href = `manga.html?id=${mangaId}`;

            populateChapterSelect(chapters, chapterNumber);

            pages = await getPagesByChapterId(chapter.id);
            currentPage = 1;
            loadPage(currentPage);
            updateNavButtons();

        } catch (error) {
            console.error('Error loading chapter:', error);
            mangaPagesContainer.innerHTML = '<p style="color: red;">Failed to load chapter.</p>';
        }
    }

    function populateChapterSelect(chapters, selectedChapterNumber) {
        chapterSelect.innerHTML = chapters
            .sort((a, b) => a.chapter_number - b.chapter_number)
            .map(c => `<option value="${c.chapter_number}" ${c.chapter_number === selectedChapterNumber ? 'selected' : ''}>Chapter ${c.chapter_number}: ${c.title}</option>`)
            .join('');
    }

    function loadPage(pageNumber) {
        if (pages.length === 0) {
            mangaPagesContainer.innerHTML = '<p>This chapter has no pages yet.</p>';
            pageIndicator.textContent = 'Page 0 / 0';
            return;
        }
        const page = pages[pageNumber - 1];
        mangaPagesContainer.innerHTML = `<img src="${page.image_url}" alt="Page ${page.page_number}">`;
        pageIndicator.textContent = `Page ${currentPage} / ${pages.length}`;
        window.scrollTo(0, 0);
    }

    function updateNavButtons() {
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === pages.length;
    }

    if (mangaId) {
        await loadChapter(mangaId, currentChapterNumber);
    }

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < pages.length) {
            currentPage++;
            loadPage(currentPage);
            updateNavButtons();
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadPage(currentPage);
            updateNavButtons();
        }
    });

    chapterSelect.addEventListener('change', (e) => {
        const newChapterNumber = parseInt(e.target.value);
        if (newChapterNumber !== currentChapterNumber) {
            currentChapterNumber = newChapterNumber;
            const url = new URL(window.location);
            url.searchParams.set('chapter', currentChapterNumber);
            window.history.pushState({}, '', url);
            loadChapter(mangaId, currentChapterNumber);
        }
    });
});
