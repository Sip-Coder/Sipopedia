import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  MapPin, Calendar, Users, ExternalLink, Heart, MessageCircle, Share2, 
  Bookmark, ChevronRight, Award, Briefcase, Image, Trophy, Sparkles,
  BookOpen, GraduationCap, Bot, Newspaper, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import sippyPhoto from '@assets/Sippy_1768188760577.jpeg';
import logoIcon from '@assets/Sip_Studies_Logo_03_-_Dark_1768189807484.png';

const achievements = [
  {
    id: 1,
    type: 'milestone',
    title: 'Sipopedia reaches 12,000+ articles!',
    content: 'We\'re thrilled to announce that our beverage encyclopedia now contains over 12,000 meticulously researched articles. Thank you to our amazing community of contributors!',
    date: 'January 2026',
    likes: 847,
    comments: 156,
  },
  {
    id: 2,
    type: 'news',
    title: 'Sip Studies partners with International Sommelier Guild',
    content: 'Exciting news! Our certifications are now officially recognized by the International Sommelier Guild. This opens new doors for our certified members.',
    date: 'December 2025',
    likes: 1234,
    comments: 298,
  },
  {
    id: 3,
    type: 'achievement',
    title: '50,000 Community Members Strong',
    content: 'Our community has grown to 50,000 beverage enthusiasts and professionals worldwide. Together, we\'re building the most comprehensive beverage knowledge platform.',
    date: 'November 2025',
    likes: 2156,
    comments: 412,
  },
  {
    id: 4,
    type: 'launch',
    title: 'Introducing Sippy AI - Your Personal Beverage Expert',
    content: 'Meet Sippy, our AI-powered assistant that helps you navigate the world of beverages. Ask anything, anytime, and get instant expert answers.',
    date: 'October 2025',
    likes: 3421,
    comments: 567,
  },
];

const photoAlbum = [
  { id: 1, title: 'Wine Tasting Event 2025', category: 'Events', count: 24 },
  { id: 2, title: 'Distillery Tours Collection', category: 'Tours', count: 18 },
  { id: 3, title: 'Coffee Origin Expedition', category: 'Research', count: 32 },
  { id: 4, title: 'Team & Office', category: 'Company', count: 15 },
  { id: 5, title: 'Certification Ceremonies', category: 'Community', count: 45 },
  { id: 6, title: 'Brewing Workshops', category: 'Education', count: 28 },
];

const skills = [
  { name: 'Sipopedia Encyclopedia', level: 'Expert', endorsements: 12847, icon: BookOpen, description: 'Comprehensive beverage knowledge base with 12,000+ articles' },
  { name: 'Sippy AI Assistant', level: 'Expert', endorsements: 8934, icon: Bot, description: 'AI-powered beverage expert for instant answers' },
  { name: 'Professional Certifications', level: 'Expert', endorsements: 7621, icon: GraduationCap, description: 'Industry-recognized certification paths' },
  { name: 'Community Notes', level: 'Advanced', endorsements: 5432, icon: Users, description: 'Collaborative terminology and knowledge building' },
  { name: 'Industry Blog & News', level: 'Advanced', endorsements: 4567, icon: Newspaper, description: 'Latest beverage industry insights and trends' },
  { name: 'Terminology Tracking', level: 'Advanced', endorsements: 3890, icon: Bookmark, description: 'Personal learning progress and vocabulary building' },
];

export default function SippyProfile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="h-48 lg:h-64 bg-gradient-to-r from-navy via-primary to-navy relative">
        <div className="absolute inset-0 bg-tartan-pattern opacity-10" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <Card className="border-border/50 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 pb-0">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative -mt-20 sm:-mt-16">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-card shadow-xl bg-card">
                    <img src={sippyPhoto} alt="Sippy" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center border-2 border-card">
                    <Sparkles className="w-5 h-5 text-secondary-foreground" />
                  </div>
                </div>
                
                <div className="flex-1 pt-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">Sippy</h1>
                      <p className="text-lg text-muted-foreground">Your Personal Beverage Expert at Sip Studies</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Worldwide
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          50,000+ connections
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <img src={logoIcon} alt="Sip Studies" className="w-12 h-12 rounded-lg" />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge className="bg-gold/20 text-gold border-gold/30">AI Assistant</Badge>
                    <Badge variant="secondary">Beverage Expert</Badge>
                    <Badge variant="outline">24/7 Available</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-4 border-t border-border mt-6">
              <Button className="bg-primary hover:bg-primary/90 gap-2" data-testid="button-chat-sippy">
                <MessageCircle className="w-4 h-4" />
                Chat with Sippy
              </Button>
              <Button variant="outline" className="gap-2" data-testid="button-follow">
                <Heart className="w-4 h-4" />
                Follow
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Tabs defaultValue="wall" className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="wall" className="gap-2" data-testid="tab-wall">
                <Trophy className="w-4 h-4" />
                Wall
              </TabsTrigger>
              <TabsTrigger value="photos" className="gap-2" data-testid="tab-photos">
                <Image className="w-4 h-4" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="skills" className="gap-2" data-testid="tab-skills">
                <Briefcase className="w-4 h-4" />
                Skills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wall" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold" />
                    Achievements & News
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors" data-testid={`achievement-${item.id}`}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                          <img src={sippyPhoto} alt="Sippy" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">Sippy</span>
                            <span className="text-sm text-muted-foreground">shared an update</span>
                            <Badge variant="outline" className="text-xs ml-auto">{item.type}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{item.date}</p>
                          <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.content}</p>
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <Heart className="w-4 h-4" />
                              {item.likes.toLocaleString()}
                            </button>
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              {item.comments}
                            </button>
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto">
                              <Share2 className="w-4 h-4" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Image className="w-5 h-5 text-primary" />
                    Photo Albums
                  </h3>
                  <p className="text-sm text-muted-foreground">Photos from events, tours, and projects</p>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photoAlbum.map((album) => (
                      <div 
                        key={album.id}
                        className="group relative aspect-[4/3] rounded-xl bg-gradient-to-br from-navy/20 to-primary/20 overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                        data-testid={`album-${album.id}`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <Badge variant="secondary" className="text-xs mb-2">{album.category}</Badge>
                          <h4 className="font-semibold text-white text-sm">{album.title}</h4>
                          <p className="text-xs text-white/70">{album.count} photos</p>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="secondary" className="h-8 w-8">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-secondary" />
                    Products & Services
                  </h3>
                  <p className="text-sm text-muted-foreground">What Sip Studies offers</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      data-testid={`skill-${index}`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <skill.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-foreground">{skill.name}</h4>
                          <Badge variant="outline" className="text-xs">{skill.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-gold" />
                          <span className="text-sm text-muted-foreground">{skill.endorsements.toLocaleString()} endorsements</span>
                        </div>
                      </div>
                      <Link href="/pricing">
                        <Button variant="ghost" size="sm" className="shrink-0">
                          Learn more <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
