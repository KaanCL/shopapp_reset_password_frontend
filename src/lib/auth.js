
import { createClient } from '@supabase/supabase-js';
import { preinit } from 'react-dom';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);




export const updatePassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
  return "Password updated successfully.";
};


export const getAccessTokenFromPKCE = async (pkceToken) => {
  const { data, error } = await supabase.auth.verifyOtp({
    type:'recovery',
    token_hash:pkceToken

  })

  if (error) {
    throw error;
  }

  return data; 
};