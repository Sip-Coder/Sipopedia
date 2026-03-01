import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProtectedRouteProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function ProtectedRoute({ 
  children, 
  title = "Sign In Required", 
  description = "Please sign in to access this feature." 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, login } = useAuth();

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
            <Button 
              onClick={login}
              className="w-full bg-gold hover:bg-gold/90 text-navy" 
              data-testid="button-login"
            >
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
