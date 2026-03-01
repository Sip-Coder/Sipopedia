import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X, User, BookOpen, GraduationCap, MessageCircle, LogOut, Shield, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, isAuthenticated, isLoading, login, logout, role, canAccessManager, canAccessAdmin } = useAuth();

  const navLinks = [
    { href: '/encyclopedia', label: 'Sipopedia', icon: BookOpen },
    { href: '/certifications', label: 'Certifications', icon: GraduationCap },
  ];

  const isActive = (path: string) => location === path;

  const getRoleBadge = () => {
    if (role === 'admin') {
      return <Badge variant="outline" className="text-[10px] border-gold/30 text-gold"><Crown className="w-2.5 h-2.5 mr-1" />Admin</Badge>;
    }
    if (role === 'site_manager') {
      return <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-500"><Shield className="w-2.5 h-2.5 mr-1" />Manager</Badge>;
    }
    return null;
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group" data-testid="link-home">
            <img 
              src="/assets/Sip_Studies_Logo_03_-_Dark_1768189807484.png" 
              alt="Sip Studies" 
              className="w-10 h-10 rounded-xl shadow-md group-hover:shadow-lg transition-shadow object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-serif font-semibold text-foreground tracking-tight">Sip Studies</h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5 tracking-widest uppercase">Beverage Encyclopedia</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive(link.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className={`hidden md:flex items-center transition-all duration-300 ${searchOpen ? 'w-64' : 'w-10'}`}>
              {searchOpen ? (
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search beverages, terms..."
                    className="pl-10 pr-8 h-10 bg-muted/50 border-transparent focus:border-gold focus:ring-gold/20"
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                    data-testid="input-search"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="text-muted-foreground hover:text-foreground"
                  data-testid="button-search"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            <Link href="/pricing" data-testid="link-pricing">
              <Button variant="outline" size="sm" className="hidden sm:flex border-gold/30 text-gold hover:bg-gold/10 hover:border-gold">
                Upgrade
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative" data-testid="button-user-menu">
                  {isAuthenticated && user?.profileImageUrl ? (
                    <img src={user.profileImageUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isLoading ? (
                  <div className="px-2 py-4 text-sm text-muted-foreground text-center">Loading...</div>
                ) : isAuthenticated ? (
                  <>
                    <div className="px-2 py-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{user?.name}</span>
                        {getRoleBadge()}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer" data-testid="link-dashboard">
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/certifications" className="flex items-center gap-2 cursor-pointer" data-testid="link-my-certifications">
                        <GraduationCap className="w-4 h-4" />
                        Certifications
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/sippy-ai" className="flex items-center gap-2 cursor-pointer" data-testid="link-sippy-ai">
                        <MessageCircle className="w-4 h-4" />
                        Sippy AI
                      </Link>
                    </DropdownMenuItem>
                    
                    {canAccessManager && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/manager" className="flex items-center gap-2 cursor-pointer" data-testid="link-manager">
                            <Shield className="w-4 h-4" />
                            Site Manager
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    {canAccessAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2 cursor-pointer" data-testid="link-admin">
                          <Crown className="w-4 h-4" />
                          Admin Portal
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer" data-testid="button-sign-out">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={login} className="cursor-pointer" data-testid="button-sign-in">
                    Sign In
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search beverages, terms..."
                  className="pl-10 h-10 bg-muted/50 w-full"
                  data-testid="input-search-mobile"
                />
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                    isActive(link.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              {canAccessManager && (
                <Link
                  href="/manager"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-blue-500 hover:bg-blue-500/10 flex items-center gap-3"
                  data-testid="link-mobile-manager"
                >
                  <Shield className="w-5 h-5" />
                  Site Manager
                </Link>
              )}
              {canAccessAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gold hover:bg-gold/10 flex items-center gap-3"
                  data-testid="link-mobile-admin"
                >
                  <Crown className="w-5 h-5" />
                  Admin Portal
                </Link>
              )}
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-gold hover:bg-gold/10 flex items-center gap-3"
                data-testid="link-mobile-pricing"
              >
                Upgrade to Premium
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
