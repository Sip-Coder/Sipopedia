import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Users, 
  Shield, 
  UserPlus, 
  Trash2, 
  ChevronRight,
  Crown,
  Settings,
  Search,
  MoreVertical,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/hooks/use-auth';
import type { User, UserRole } from '@shared/models/auth';

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/admin/users', { credentials: 'include' });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

async function updateUserRole(id: string, role: UserRole): Promise<User> {
  const response = await fetch(`/api/admin/users/${id}/role`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ role }),
  });
  if (!response.ok) throw new Error('Failed to update role');
  return response.json();
}

async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`/api/admin/users/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete user');
}

const roleColors: Record<UserRole, string> = {
  user: 'bg-slate-500/10 text-slate-600 border-slate-500/30',
  site_manager: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  admin: 'bg-gold/10 text-gold border-gold/30',
};

const roleIcons: Record<UserRole, React.ReactNode> = {
  user: <Users className="w-3 h-3" />,
  site_manager: <Shield className="w-3 h-3" />,
  admin: <Crown className="w-3 h-3" />,
};

export default function AdminPortal() {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['/api/admin/users'],
    queryFn: fetchUsers,
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) => updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      setDeleteUserId(null);
    },
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const userCounts = {
    total: users.length,
    users: users.filter(u => u.role === 'user').length,
    siteManagers: users.filter(u => u.role === 'site_manager').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-navy py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gold/60 mb-4">
            <Link href="/dashboard" className="hover:text-gold">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Admin</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-white mb-2">
                Admin Portal
              </h1>
              <p className="text-gray-400">
                Manage all user accounts, roles, and system settings
              </p>
            </div>
            <Badge variant="outline" className="border-gold/30 text-gold bg-gold/10">
              <Crown className="w-3 h-3 mr-1" />
              Administrator
            </Badge>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">{userCounts.total}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Regular Users</p>
                  <p className="text-3xl font-bold text-foreground">{userCounts.users}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-slate-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Site Managers</p>
                  <p className="text-3xl font-bold text-foreground">{userCounts.siteManagers}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Administrators</p>
                  <p className="text-3xl font-bold text-foreground">{userCounts.admins}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-gold" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-xl font-serif">User Management</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                    data-testid="input-search-users"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-40" data-testid="select-role-filter">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="user">Users</SelectItem>
                    <SelectItem value="site_manager">Site Managers</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No users found</div>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
                    data-testid={`user-row-${user.id}`}
                  >
                    <div className="flex items-center gap-4">
                      {user.profileImageUrl ? (
                        <img 
                          src={user.profileImageUrl} 
                          alt={user.firstName || 'User'} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-gold" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">
                          {user.firstName} {user.lastName}
                          {user.id === currentUser?.id && (
                            <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={roleColors[user.role]}>
                        {roleIcons[user.role]}
                        <span className="ml-1 capitalize">{user.role.replace('_', ' ')}</span>
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" disabled={user.id === currentUser?.id}>
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => updateRoleMutation.mutate({ id: user.id, role: 'user' })}
                            disabled={user.role === 'user'}
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Set as User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateRoleMutation.mutate({ id: user.id, role: 'site_manager' })}
                            disabled={user.role === 'site_manager'}
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            Set as Site Manager
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateRoleMutation.mutate({ id: user.id, role: 'admin' })}
                            disabled={user.role === 'admin'}
                          >
                            <Crown className="w-4 h-4 mr-2" />
                            Set as Admin
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => setDeleteUserId(user.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone and will remove all of their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => deleteUserId && deleteUserMutation.mutate(deleteUserId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
