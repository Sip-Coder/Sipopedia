import { createContext, useContext, ReactNode } from 'react';
import { useAuth as useReplitAuth } from './use-auth';
import type { User, UserRole } from '@shared/models/auth';

interface AuthUser extends User {
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  role: UserRole | null;
  isAdmin: boolean;
  isSiteManager: boolean;
  canAccessAdmin: boolean;
  canAccessManager: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const replitAuth = useReplitAuth();

  const user = replitAuth.user ? {
    ...replitAuth.user,
    name: `${replitAuth.user.firstName || ''} ${replitAuth.user.lastName || ''}`.trim() || 'User',
  } : null;

  const login = () => {
    window.location.href = '/api/login';
  };

  const logout = () => {
    replitAuth.logout();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: replitAuth.isAuthenticated, 
      isLoading: replitAuth.isLoading,
      login, 
      logout,
      role: replitAuth.role,
      isAdmin: replitAuth.isAdmin,
      isSiteManager: replitAuth.isSiteManager,
      canAccessAdmin: replitAuth.canAccessAdmin,
      canAccessManager: replitAuth.canAccessManager,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
