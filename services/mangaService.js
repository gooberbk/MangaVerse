import { supabase } from '../supabaseClient.js';

export const getAllManga = async () => {
  const { data, error } = await supabase.from('Manga').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const getMangaById = async (id) => {
  const { data, error } = await supabase.from('Manga').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
};

export const createManga = async (mangaData) => {
  const { data, error } = await supabase.from('Manga').insert(mangaData).single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateManga = async (id, updates) => {
  const { data, error } = await supabase.from('Manga').update(updates).eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteManga = async (id) => {
  const { error } = await supabase.from('Manga').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
};
