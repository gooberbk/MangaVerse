import { supabase } from '../supabaseClient.js';

export const getPagesByChapterId = async (chapterId) => {
  const { data, error } = await supabase
    .from('Pages')
    .select('*')
    .eq('chapter_id', chapterId)
    .order('page_number', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};
