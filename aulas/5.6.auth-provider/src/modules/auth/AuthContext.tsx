import { Session, User } from '@supabase/supabase-js';
import {
  useState,
  createContext,
  useContext,
  useEffect
} from 'react';
import useSupabase from 'src/hooks/useSupabase';

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  isAuthenticated: false,
  user: null,
  session: null
})

export const useAuth = () => {
  return useContext(AuthContext);
}

// Destructuring
// props.children
// { children }
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const supabase = useSupabase();

  const verifySession = async () => {
    setLoading(true);
    const { data } = await supabase.auth.getSession()
    if(data.session) {
      setUser(data.session.user);
      setSession(data.session);
      setAuthenticated(true);
    }
    data.session?.user
    data.session
    
    setLoading(false);
  }

  useEffect(() => {
    verifySession();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthenticated(session ? true : false)
      setSession(session);
      setUser(session ? session.user : null)
    })

    return () => {
      authListener.subscription;
      setLoading(false);
    }
  }, [])

  console.info('data', isAuthenticated)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        session,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}



