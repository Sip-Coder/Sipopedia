import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { UserRole } from '@shared/models/auth';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
  title?: string;
  description?: string;
}

export default function RoleProtectedRoute({ 
  children, 
  requiredRole,
  title = "Access Restricted",
  description = "You need additional permissions to access this area."
}: RoleProtectedRouteProps) {
  const { user, isLoading, isAuthenticated, canAccessAdmin, canAccessManager, canAccessUser } = useAuth();
  const [, setLocation] = useLocation();

  const hasAccess = () => {
    if (!isAuthenticated) return false;
    
    switch (requiredRole) {
      case 'admin':
        return canAccessAdmin;
      case 'site_manager':
        return canAccessManager;
      case 'user':
        return canAccessUser;
      default:
        return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-gold/20 bg-card">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>
            <a href="/api/login">
              <Button className="w-full bg-gold hover:bg-gold/90 text-navy" data-testid="button-login">
                Sign In to Continue
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasAccess()) {
    const roleLabels: Record<UserRole, string> = {
      user: 'User',
      site_manager: 'Site Manager',
      admin: 'Administrator'
    };

    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-destructive/20 bg-card">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-2">
              This area requires <span className="font-semibold text-gold">{roleLabels[requiredRole]}</span> permissions.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Your current role: <span className="font-medium">{roleLabels[user?.role || 'user']}</span>
            </p>
            <Button 
              variant="outline" 
              className="w-full border-gold/30 text-gold hover:bg-gold/10"
              onClick={() => setLocation('/dashboard')}
              data-testid="button-go-dashboard"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
