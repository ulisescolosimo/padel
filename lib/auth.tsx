"use client"; // 🚀 Obligatorio para usar React Context en Next.js (app router)

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession, signIn } from 'next-auth/react';
import { getBaseUrl } from './config';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
  level?: string;
  phone?: string;
  createdAt?: Date;
  isProfileComplete?: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  signIn: (provider: string, options?: any) => Promise<void>;
  update: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  signIn: async () => {},
  update: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image,
        role: session.user.role || 'user',
        level: session.user.level,
        phone: session.user.phone,
        createdAt: session.user.createdAt,
        isProfileComplete: session.user.isProfileComplete,
        avatar: session.user.avatar,
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [session, status]);

  const logout = async () => {
    try {
      const baseUrl = getBaseUrl();
      await signOut({ 
        callbackUrl: `${baseUrl}/`,
        redirect: true 
      });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleSignIn = async (provider: string, options?: any) => {
    try {
      await signIn(provider, {
        ...options,
        callbackUrl: options?.callbackUrl || '/dashboard'
      });
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const handleUpdate = async (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        signIn: handleSignIn,
        update: handleUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
