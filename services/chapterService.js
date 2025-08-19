import { supabase } from '../supabaseClient.js';

export const getChaptersByMangaId = async (mangaId) => {
  const { data, error } = await supabase
    .from('Chapters')
    .select('*')
    .eq('manga_id', mangaId)
    .order('chapter_number', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

export const createChapter = async (chapterData) => {
  const { data, error } = await supabase.from('Chapters').insert(chapterData).single();
  if (error) throw new Error(error.message);
  return data;
};
