import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronRight, MessageSquare, ThumbsUp, ThumbsDown, Clock, User, Plus, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const communityNotes = [
  {
    id: 1,
    term: 'Tannins',
    note: 'In addition to grape skins and seeds, tannins can also be introduced through oak barrel aging, which adds wood tannins with vanilla and spice characteristics.',
    author: 'WineExpert_Sarah',
    votes: 47,
    status: 'approved',
    date: '2 days ago',
  },
  {
    id: 2,
    term: 'Cold Brew',
    note: 'The ideal brew ratio for cold brew is typically 1:8 (coffee to water) for a concentrate, or 1:15 for ready-to-drink strength.',
    author: 'CoffeeAficionado',
    votes: 32,
    status: 'approved',
    date: '1 week ago',
  },
  {
    id: 3,
    term: 'IBU',
    note: 'The human palate generally cannot distinguish bitterness differences above 100 IBU, making extremely high IBU claims more marketing than perceptible flavor.',
    author: 'BrewMaster_Tom',
    votes: 28,
    status: 'approved',
    date: '3 days ago',
  },
  {
    id: 4,
    term: 'Mash Bill',
    note: 'Japanese whisky often uses different mash bills than American bourbon, sometimes including rice or other grains traditional to Japanese brewing.',
    author: 'SpiritSeeker',
    votes: 15,
    status: 'pending',
    date: '1 day ago',
  },
];

const topContributors = [
  { name: 'WineExpert_Sarah', contributions: 156, badge: 'Wine Specialist' },
  { name: 'BrewMaster_Tom', contributions: 124, badge: 'Beer Expert' },
  { name: 'CoffeeAficionado', contributions: 98, badge: 'Coffee Guru' },
  { name: 'SpiritSeeker', contributions: 87, badge: 'Spirits Scholar' },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('notes');

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-navy py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gold/60 mb-6">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Community Notes</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Community Notes
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl font-light">
                Collaborative knowledge from beverage enthusiasts worldwide. Help improve our encyclopedia by contributing your expertise.
              </p>
            </div>
            
            <Button className="bg-gold hover:bg-gold/90 text-navy h-12 px-6 gap-2 shrink-0" data-testid="button-contribute">
              <Plus className="w-5 h-5" />
              Add a Note
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="approved" className="space-y-6">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="approved" className="gap-2" data-testid="tab-approved">
                    Approved
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="gap-2" data-testid="tab-pending">
                    Pending Review
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="approved" className="space-y-4">
                  {communityNotes.filter(n => n.status === 'approved').map((note) => (
                    <Card key={note.id} className="border-border/50 hover:border-gold/30 transition-colors" data-testid={`note-${note.id}`}>
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-gold">
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium text-foreground">{note.votes}</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Link href={`/encyclopedia/term/${note.term.toLowerCase()}`}>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-gold/20">
                                  {note.term}
                                </Badge>
                              </Link>
                              <Badge variant="outline" className="border-emerald-500/30 text-emerald-600">
                                Approved
                              </Badge>
                            </div>
                            
                            <p className="text-foreground mb-3">{note.note}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {note.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {note.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  {communityNotes.filter(n => n.status === 'pending').map((note) => (
                    <Card key={note.id} className="border-border/50 border-l-4 border-l-amber-500" data-testid={`note-pending-${note.id}`}>
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-gold">
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium text-foreground">{note.votes}</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{note.term}</Badge>
                              <Badge variant="outline" className="border-amber-500/30 text-amber-600">
                                Pending Review
                              </Badge>
                            </div>
                            
                            <p className="text-foreground mb-3">{note.note}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {note.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {note.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gold" />
                    Top Contributors
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topContributors.map((contributor, index) => (
                      <div key={contributor.name} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-sm font-bold text-gold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{contributor.name}</p>
                          <p className="text-xs text-muted-foreground">{contributor.contributions} contributions</p>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">{contributor.badge}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gold/20 bg-gradient-to-br from-gold/5 to-transparent">
                <CardContent className="p-5">
                  <Award className="w-8 h-8 text-gold mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Earn Badges</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contribute quality notes to earn recognition badges and build your reputation in the community.
                  </p>
                  <Link href="/certifications">
                    <Button variant="outline" size="sm" className="w-full border-gold/30 text-gold hover:bg-gold/10" data-testid="button-view-badges">
                      View All Badges
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3">Guidelines</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      Notes should add new information or clarification
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      Cite sources when possible
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      Be respectful and constructive
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      Notes are reviewed before publishing
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
