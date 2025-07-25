import { signOut as firebaseSignOut, signInWithPopup } from 'firebase/auth';
import { createContext, type ReactNode, useContext, useState } from 'react';
import { firebaseAuth, googleAuthProvider } from '../config/firebase';
import type { AuthState } from '../types/auth';

interface AuthContextProps {
  authState: AuthState;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    loading: false,
  });

  const signWithGoogle = async (): Promise<void> => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    try {
      const result = await signInWithPopup(firebaseAuth, googleAuthProvider);
      setAuthState({ user: result.user, error: null, loading: false });
    } catch (err) {
      setAuthState({ user: null, error: err, loading: false });
    }
  };

  const signOut = async (): Promise<void> => {
    setAuthState((prevState) => ({ ...prevState, loading: true }));
    try {
      await firebaseSignOut(firebaseAuth);
      setAuthState({ user: null, error: null, loading: false });
    } catch (err) {
      setAuthState({ user: null, error: err, loading: false });
    }
  };

  return (
    <AuthContext.Provider value={{ authState, signWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};
