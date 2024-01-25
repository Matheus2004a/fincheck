import { useQuery } from '@tanstack/react-query';
import {
  createContext, useCallback, useEffect, useState,
} from 'react';
import toast from 'react-hot-toast';
import { LaunchScreen } from '../../view/components/LaunchScreen';
import { storage } from '../config/storage';
import { User } from '../entities/User';
import UsersService from '../services/UsersService';

interface AuthContextProps {
  signedIn: boolean;
  user: User | undefined;
  signin(token: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setIsSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(storage.ACCESS_TOKEN);

    return !!storedAccessToken;
  });

  const {
    data, isError, isFetching, isSuccess, remove,
  } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => UsersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(storage.ACCESS_TOKEN, accessToken);

    setIsSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(storage.ACCESS_TOKEN);

    setIsSignedIn(false);
    remove();
  }, [remove]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou');
      signout();
    }
  }, [isError, signout]);

  if (isFetching) {
    return <LaunchScreen isLoading />;
  }

  return (
    <AuthContext.Provider value={{
      signedIn: isSuccess && signedIn,
      user: data,
      signin,
      signout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
