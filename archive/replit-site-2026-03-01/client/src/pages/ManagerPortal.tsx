import { useState } from 'react';
import { Link } from 'wouter';
import { 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  Plus,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';

const pendingNotes = [
  { id: 1, term: 'Mash Bill', author: 'SpiritSeeker', note: 'Japanese whisky often uses different mash bills...', date: '1 day ago' },
  { id: 2, term: 'Cold Extraction', author: 'CoffeeGuru', note: 'Alternative method using ice water for 48 hours...', date: '2 days ago' },
  { id: 3, term: 'Noble Rot', author: 'WineEnthusiast', note: 'Botrytis cinerea affects harvest timing...', date: '3 days ago' },
];

const recentEdits = [
  { id: 1, type: 'term', title: 'Tannins', action: 'Updated definition', editor: 'WineExpert_Sarah', date: '1 hour ago' },
  { id: 2, type: 'article', title: 'Understanding Wine Terroir', action: 'Added new section', editor: 'ContentTeam', date: '3 hours ago' },
  { id: 3, type: 'term', title: 'IBU', action: 'Added related terms', editor: 'BrewMaster_Tom', date: '5 hours ago' },
];

export default function ManagerPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

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
            <span className="text-gold">Site Manager</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-white mb-2">
                Site Manager Portal
              </h1>
              <p className="text-gray-400">
                Manage content, moderate community notes, and oversee Sipopedia
              </p>
            </div>
            <Badge variant="outline" className="border-gold/30 text-gold bg-gold/10">
              <Users className="w-3 h-3 mr-1" />
              Site Manager
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
                  <p className="text-sm text-muted-foreground">Total Terms</p>
                  <p className="text-3xl font-bold text-foreground">19</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-gold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Notes</p>
                  <p className="text-3xl font-bold text-foreground">5</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Articles</p>
                  <p className="text-3xl font-bold text-foreground">4</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved Today</p>
                  <p className="text-3xl font-bold text-foreground">12</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="pending" className="gap-2" data-testid="tab-pending-notes">
              <AlertCircle className="w-4 h-4" />
              Pending Notes
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2" data-testid="tab-content">
              <FileText className="w-4 h-4" />
              Content Management
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2" data-testid="tab-activity">
              <Clock className="w-4 h-4" />
              Recent Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Community Notes Awaiting Review</h2>
              <Badge variant="secondary">{pendingNotes.length} pending</Badge>
            </div>

            {pendingNotes.map((note) => (
              <Card key={note.id} className="border-border/50 border-l-4 border-l-amber-500" data-testid={`pending-note-${note.id}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{note.term}</Badge>
                        <span className="text-sm text-muted-foreground">by {note.author}</span>
                        <span className="text-sm text-muted-foreground">• {note.date}</span>
                      </div>
                      <p className="text-foreground">{note.note}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10">
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 border-destructive/30 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Content Management</h2>
              <Button className="bg-gold hover:bg-gold/90 text-navy gap-2">
                <Plus className="w-4 h-4" />
                Add New Term
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-border/50 hover:border-gold/30 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors">Manage Terms</h3>
                      <p className="text-sm text-muted-foreground">Add, edit, or remove terminology entries</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-gold/30 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors">Manage Articles</h3>
                      <p className="text-sm text-muted-foreground">Create and edit featured articles</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-gold/30 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors">Community Notes</h3>
                      <p className="text-sm text-muted-foreground">Review and moderate user contributions</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-gold/30 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors">Analytics</h3>
                      <p className="text-sm text-muted-foreground">View content performance metrics</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
            </div>

            <div className="space-y-3">
              {recentEdits.map((edit) => (
                <Card key={edit.id} className="border-border/50" data-testid={`activity-${edit.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        edit.type === 'term' ? 'bg-gold/10' : 'bg-primary/10'
                      }`}>
                        {edit.type === 'term' ? (
                          <BookOpen className="w-5 h-5 text-gold" />
                        ) : (
                          <FileText className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">
                          <span className="font-medium">{edit.editor}</span> {edit.action} on{' '}
                          <span className="font-medium text-gold">{edit.title}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{edit.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
