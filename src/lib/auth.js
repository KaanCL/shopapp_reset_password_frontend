
import { supabase } from './supabaseClient';

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
