import { supabase } from '../supabaseClient.js';

export const uploadImage = async (file, path) => {
  const { data, error } = await supabase.storage.from('manga-images').upload(path, file);
  if (error) throw new Error(error.message);

  const { publicURL, error: urlError } = supabase.storage.from('manga-images').getPublicUrl(path);
  if (urlError) throw new Error(urlError.message);

  return publicURL;
};
