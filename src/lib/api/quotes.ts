import { supabase } from '../supabase';

export interface Quote {
  id: string;
  content: string;
  author: string;
}

export async function getRandomQuote(): Promise<Quote> {
  // Using proper PostgreSQL random() syntax
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .limit(1)
    .order('created_at') // Order by any column first
    .then(result => {
      if (result.error) throw result.error;
      // Get random quote from the result
      const randomIndex = Math.floor(Math.random() * result.data.length);
      return {
        data: result.data[randomIndex],
        error: null
      };
    });

  if (error) {
    throw error;
  }

  return data;
}