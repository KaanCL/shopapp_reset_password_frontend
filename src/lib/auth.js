
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);


export const setSessionWithToken = async (accessToken) => {
  return await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: '',
  });
};

export const updatePassword = async (newPassword) => {
  return await supabase.auth.updateUser({
    password: newPassword,
  });
};
