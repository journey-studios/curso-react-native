import invariant from 'tiny-invariant';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { AppState } from 'react-native';
import type { Database } from './database.types';

type TypedSupabaseClient = SupabaseClient<Database>;
let client: TypedSupabaseClient;

const getSupabaseClient = () => {
  if(client) {
    return client;
  }

  invariant(process.env.EXPO_PUBLIC_SUPABASE_URL, 'Supabase url missing!');
  invariant(process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY, 'Supabase anonkey missing!');

  client = createClient<Database>(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })

  AppState.addEventListener('change', (state) => {
    if(state !== 'active') {
      client.auth.startAutoRefresh();
    } else {
      client.auth.stopAutoRefresh();
    }
  })

  return client;

}

export default getSupabaseClient;
