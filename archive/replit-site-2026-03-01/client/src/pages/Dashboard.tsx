import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { 
  User, BookOpen, GraduationCap, MessageCircle, Award, Settings, 
  ChevronRight, Clock, TrendingUp, Calendar, Star, ArrowRight, 
  BookMarked, Edit3, Bell, Upload, Wine, Target, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import type { TastingAnalytics } from '@shared/schema';

async function fetchAnalytics(): Promise<TastingAnalytics> {
  const response = await fetch('/api/tasting-notes/analytics', { credentials: 'include' });
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

const recentArticles = [
  { title: 'Understanding Wine Terroir', category: 'Wine', date: 'Today' },
  { title: 'The Art of Whisky Aging', category: 'Spirits', date: 'Yesterday' },
  { title: 'Craft Beer Revolution', category: 'Beer', date: '3 days ago' },
];

const trackedTerms = [
  { term: 'Tannins', progress: 80, category: 'Wine' },
  { term: 'Mash Bill', progress: 65, category: 'Spirits' },
  { term: 'IBU', progress: 45, category: 'Beer' },
  { term: 'Terroir', progress: 90, category: 'Wine' },
];

const communityNotes = [
  { term: 'Fermentation', status: 'approved', votes: 24 },
  { term: 'Cold Brew', status: 'pending', votes: 8 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { data: analytics } = useQuery({
    queryKey: ['/api/tasting-notes/analytics'],
    queryFn: fetchAnalytics,
  });

  const firstName = user?.name?.split(' ')[0] || 'there';
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Dashboard</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-gold">
                {user?.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">{initials}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <h1 className="text-2xl font-serif font-bold text-foreground">Welcome back, {firstName}!</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-gold text-navy">Member</Badge>
                  <span className="text-sm text-muted-foreground">{user?.email}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-notifications">
                <Bell className="w-4 h-4" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-settings">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Link href="/admin">
                <Button size="sm" className="gap-2 bg-primary" data-testid="button-admin">
                  <Settings className="w-4 h-4" />
                  Site Manager
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Tastings', value: analytics?.totalTastings || 0, icon: Wine, color: 'text-burgundy' },
            { label: 'Grape Accuracy', value: `${analytics?.grapeAccuracy?.toFixed(0) || 0}%`, icon: Target, color: 'text-gold' },
            { label: 'Certifications', value: '2', icon: GraduationCap, color: 'text-secondary' },
            { label: 'AI Questions', value: '∞', icon: MessageCircle, color: 'text-accent' },
          ].map((stat, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-gold/30 bg-gradient-to-r from-gold/5 to-burgundy/5 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-burgundy/10 flex items-center justify-center">
                  <Wine className="w-7 h-7 text-burgundy" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-foreground">Wine Tasting Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    Record blind tastings, track your accuracy, and improve your palate
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/dashboard/tasting-notes">
                  <Button variant="outline" className="gap-2 border-burgundy/30 text-burgundy hover:bg-burgundy/10" data-testid="button-view-notes">
                    <Wine className="w-4 h-4" />
                    View Notes
                  </Button>
                </Link>
                <Link href="/dashboard/analytics">
                  <Button variant="outline" className="gap-2 border-gold/30 text-gold hover:bg-gold/10" data-testid="button-view-analytics">
                    <TrendingUp className="w-4 h-4" />
                    Analytics
                  </Button>
                </Link>
                <Link href="/dashboard/tasting-notes/new">
                  <Button className="gap-2 bg-burgundy hover:bg-burgundy/90 text-white" data-testid="button-new-tasting">
                    <Plus className="w-4 h-4" />
                    New Tasting
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-gold" />
                  Current Certification
                </h3>
                <Link href="/certifications" className="text-sm text-primary hover:underline" data-testid="link-view-all-certifications">
                  View all
                </Link>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🍷</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Wine Fundamentals</h4>
                    <p className="text-sm text-muted-foreground mb-3">Master the basics of wine appreciation</p>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Module 5 of 8</span>
                      <span className="font-medium text-foreground">65%</span>
                    </div>
                    <Progress value={65} className="h-2 mb-3" />
                    <Button size="sm" className="bg-gold hover:bg-gold/90 text-navy" data-testid="button-continue-learning">
                      Continue Learning <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-primary" />
                  Tracked Terminology
                </h3>
                <Link href="/encyclopedia/terminology" className="text-sm text-primary hover:underline" data-testid="link-manage-terms">
                  Manage
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackedTerms.map((item, index) => (
                    <div key={index} className="flex items-center gap-4" data-testid={`tracked-term-${index}`}>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{item.term}</span>
                          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                        </div>
                        <Progress value={item.progress} className="h-1.5" />
                      </div>
                      <span className="text-sm text-muted-foreground w-10 text-right">{item.progress}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-secondary" />
                  Your Community Notes
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {communityNotes.map((note, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50" data-testid={`community-note-${index}`}>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{note.term}</span>
                        <Badge variant={note.status === 'approved' ? 'default' : 'secondary'} className="text-xs">
                          {note.status === 'approved' ? '✓ Approved' : 'Pending Review'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        {note.votes} votes
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2" data-testid="button-contribute-note">
                    Contribute a Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  Recent Reading
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentArticles.map((article, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" data-testid={`recent-article-${index}`}>
                      <BookOpen className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground line-clamp-1">{article.title}</p>
                        <p className="text-xs text-muted-foreground">{article.category} • {article.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold" />
                  Your Credentials
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                    <span className="text-2xl">🍺</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">Craft Beer Expert</p>
                      <p className="text-xs text-muted-foreground">Completed Dec 2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2" data-testid="button-share-credentials">
                    <Star className="w-4 h-4" />
                    Share to LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold/30 bg-gradient-to-br from-gold/5 to-transparent">
              <CardContent className="p-5">
                <MessageCircle className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Ask Sippy AI</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Got a beverage question? Your AI assistant is ready to help.
                </p>
                <Link href="/sippy-ai" data-testid="link-ask-sippy">
                  <Button className="w-full bg-gold hover:bg-gold/90 text-navy">
                    Start Conversation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
