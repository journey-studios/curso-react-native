import { useMemo } from "react";
import getSupabaseClient from "src/utils/supabase/supabase";

const useSupabase = () => {
  return useMemo(getSupabaseClient, []);
}

export default useSupabase;