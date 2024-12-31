import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from '@supabase/supabase-js';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserDisplayName(user: User | null): string {
  if (!user) return 'Guest';
  
  // First try user metadata
  const displayName = user.user_metadata?.display_name;
  if (displayName) return displayName;
  
  // Fall back to email username
  if (user.email) {
    const username = user.email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
  
  return 'User';
}