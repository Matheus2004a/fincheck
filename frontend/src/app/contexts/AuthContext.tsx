import { useQuery } from '@tanstack/react-query';
import {
  createContext, useCallback, useEffect, useState,
} from 'react';
import toast from 'react-hot-toast';
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

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(storage.ACCESS_TOKEN, accessToken);

    setIsAuthenticated(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(storage.ACCESS_TOKEN);

    setIsAuthenticated(false);
  }, []);

  const { isError } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => UsersService.me(),
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou');
      signout();
    }
  }, [isError, signout]);

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
