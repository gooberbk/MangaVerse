import { supabase } from '../supabaseClient.js';

// Check if user is admin by checking admin_users table
export const isAdminUser = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return false;

    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('user_id', user.user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking admin status:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in isAdminUser:', error);
    return false;
  }
};

// Get all admin users
export const getAllAdmins = async () => {
  const { data, error } = await supabase
    .from('admin_users')
    .select(`
      id,
      email,
      created_at,
      user_id,
      created_by
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};

// Add new admin user
export const addAdmin = async (email) => {
  try {
    // First, check if user exists in auth.users
    const { data: authUsers, error: authError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (authError) {
      throw new Error('User with this email does not exist. They must sign up first.');
    }

    // Add to admin_users table
    const { data: currentUser } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          user_id: authUsers.id,
          email: email,
          created_by: currentUser.user.id
        }
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('This user is already an admin.');
      }
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Remove admin user
export const removeAdmin = async (adminId) => {
  const { error } = await supabase
    .from('admin_users')
    .delete()
    .eq('id', adminId);

  if (error) throw new Error(error.message);
};

// Get current user's admin info
export const getCurrentAdminInfo = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return null;

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error getting admin info:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getCurrentAdminInfo:', error);
    return null;
  }
};
