import { supabase } from '../supabaseClient.js';

export const getFavorites = async (userId) => {
  const { data, error } = await supabase
    .from('Favorites')
    .select('manga_id')
    .eq('user_id', userId);
  if (error) throw new Error(error.message);
  return data.map(fav => fav.manga_id);
};

export const addFavorite = async (userId, mangaId) => {
  const { data, error } = await supabase
    .from('Favorites')
    .insert({ user_id: userId, manga_id: mangaId })
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const removeFavorite = async (userId, mangaId) => {
  const { error } = await supabase
    .from('Favorites')
    .delete()
    .eq('user_id', userId)
    .eq('manga_id', mangaId);
  if (error) throw new Error(error.message);
  return true;
};
