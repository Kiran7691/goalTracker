import { supabase } from '../supabase';
import { User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  display_name: string;
  updated_at: string;
}

export async function updateProfile(userId: string, displayName: string): Promise<void> {
  // Update profile in Supabase
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      display_name: displayName,
      updated_at: new Date().toISOString(),
    });

  if (profileError) throw profileError;

  // Update user metadata
  const { error: metadataError } = await supabase.auth.updateUser({
    data: { display_name: displayName }
  });

  if (metadataError) throw metadataError;
}

export async function getProfile(user: User | null): Promise<Profile | null> {
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
}