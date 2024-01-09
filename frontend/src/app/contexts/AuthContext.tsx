import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useState } from 'react';
import { storage } from '../config/storage';
import UsersService from '../services/UsersService';

interface AuthContextProps {
  signedIn: boolean;
  signin(token: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(storage.ACCESS_TOKEN);

    return !!storedAccessToken;
  });

  useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => UsersService.me(),
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(storage.ACCESS_TOKEN, accessToken);

    setIsAuthenticated(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(storage.ACCESS_TOKEN);

    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      signedIn: isAuthenticated,
      signin,
      signout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
