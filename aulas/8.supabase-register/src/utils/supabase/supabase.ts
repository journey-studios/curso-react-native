import invariant from 'tiny-invariant';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types';

type TypedSupabaseClient = SupabaseClient<Database>;
let client: TypedSupabaseClient;

const getSupabaseClient = () => {
  if(client) {
    return client;
  }

  invariant(process.env.EXPO_PUBLIC_SUPABASE_URL, 'Supabase url missing!');
  invariant(process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY, 'Supabase anonkey missing!');

  client = createClient<Database>(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
  )

  return client;

}

export default getSupabaseClient;
