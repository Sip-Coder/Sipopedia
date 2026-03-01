import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'wouter';
import { Search, ArrowRight, BookOpen, MessageCircle, GraduationCap, Users, Sparkles, TrendingUp, Clock, Star, ChevronRight, BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@assets/generated_images/tartan-inspired_abstract_hero_background.png';

// Import data for searching
const terminology = [
  { id: 'tannins', term: 'Tannins', category: 'Wine', type: 'term' },
  { id: 'abv', term: 'ABV', category: 'General', type: 'term' },
  { id: 'mash-bill', term: 'Mash Bill', category: 'Spirits', type: 'term' },
  { id: 'cold-brew', term: 'Cold Brew', category: 'Coffee', type: 'term' },
  { id: 'ibu', term: 'IBU', category: 'Beer', type: 'term' },
  { id: 'cuvee', term: 'Cuvée', category: 'Wine', type: 'term' },
  { id: 'proof', term: 'Proof', category: 'Spirits', type: 'term' },
  { id: 'ethanol', term: 'Ethanol', category: 'General', type: 'term' },
  { id: 'fermentation', term: 'Fermentation', category: 'General', type: 'term' },
  { id: 'distillation', term: 'Distillation', category: 'Spirits', type: 'term' },
  { id: 'maceration', term: 'Maceration', category: 'Wine', type: 'term' },
  { id: 'polyphenols', term: 'Polyphenols', category: 'Wine', type: 'term' },
  { id: 'hops', term: 'Hops', category: 'Beer', type: 'term' },
  { id: 'ipa', term: 'IPA', category: 'Beer', type: 'term' },
  { id: 'bourbon', term: 'Bourbon', category: 'Spirits', type: 'term' },
  { id: 'extraction', term: 'Extraction', category: 'Coffee', type: 'term' },
  { id: 'acidity', term: 'Acidity', category: 'Coffee', type: 'term' },
  { id: 'champagne', term: 'Champagne', category: 'Wine', type: 'term' },
  { id: 'blend', term: 'Blend', category: 'Wine', type: 'term' },
];

const books = [
  { id: 'wine-atlas', title: 'The World Atlas of Wine', type: 'book' },
  { id: 'wine-folly', title: 'Wine Folly: Magnum Edition', type: 'book' },
  { id: 'whisky-atlas', title: 'The World Atlas of Whisky', type: 'book' },
  { id: 'imbibe', title: 'Imbibe!', type: 'book' },
  { id: 'oxford-beer', title: 'The Oxford Companion to Beer', type: 'book' },
  { id: 'tasting-beer', title: 'Tasting Beer', type: 'book' },
  { id: 'coffee-atlas', title: 'The World Atlas of Coffee', type: 'book' },
];

const articles = [
  { id: 1, title: 'Understanding Wine Terroir', type: 'article' },
  { id: 2, title: 'The Art of Whisky Aging', type: 'article' },
  { id: 3, title: 'Craft Beer Revolution', type: 'article' },
  { id: 4, title: 'Coffee Origins: Ethiopia to Colombia', type: 'article' },
];

const searchPool = [
  ...terminology.map(t => ({ id: t.id, title: t.term, type: 'term', category: t.category })),
  ...books.map(b => ({ id: b.id, title: b.title, type: 'book' })),
  ...articles.map(a => ({ id: a.id, title: a.title, type: 'article' })),
];

const featuredArticles = [
  {
    id: 1,
    title: 'Understanding Wine Terroir',
    category: 'Wine',
    excerpt: 'Discover how geography, climate, and soil create the unique characteristics of wines from different regions.',
    readTime: '8 min read',
    trending: true,
  },
  {
    id: 2,
    title: 'The Art of Whisky Aging',
    category: 'Spirits',
    excerpt: 'Explore how time, wood, and environment transform raw spirit into complex, nuanced whisky.',
    readTime: '12 min read',
    trending: true,
  },
  {
    id: 3,
    title: 'Craft Beer Revolution',
    category: 'Beer',
    excerpt: 'How small breweries are reshaping the global beer landscape with innovation and tradition.',
    readTime: '6 min read',
    trending: false,
  },
  {
    id: 4,
    title: 'Coffee Origins: Ethiopia to Colombia',
    category: 'Coffee',
    excerpt: 'Trace the journey of coffee beans from their birthplace to your cup.',
    readTime: '10 min read',
    trending: false,
  },
];

const categories = [
  { name: 'Wine', count: 2847, color: 'bg-burgundy', icon: '🍷' },
  { name: 'Beer', count: 1456, color: 'bg-gold', icon: '🍺' },
  { name: 'Spirits', count: 1923, color: 'bg-amber-600', icon: '🥃' },
  { name: 'Coffee', count: 892, color: 'bg-forest', icon: '☕' },
  { name: 'Tea', count: 634, color: 'bg-secondary', icon: '🍵' },
  { name: 'Other Drinks', count: 1801, color: 'bg-blue-500', icon: '🧃' },
];

const stats = [
  { value: '12,000+', label: 'Encyclopedia Entries' },
  { value: '500+', label: 'Certified Terms' },
  { value: '50,000+', label: 'Community Members' },
  { value: '98%', label: 'Accuracy Rate' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [, setLocation] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 1) {
      const filtered = searchPool.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleSelect = (item: any) => {
    setShowResults(false);
    setSearchQuery('');
    if (item.type === 'term') {
      setLocation(`/encyclopedia/term/${item.id}`);
    } else if (item.type === 'article') {
      setLocation(`/encyclopedia/article/${item.id}`);
    } else if (item.type === 'book') {
      setLocation(`/encyclopedia`);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-navy">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-gold/30 text-gold bg-gold/10">
              <Sparkles className="w-3 h-3 mr-1" />
              Trusted by 50,000+ beverage professionals worldwide
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              The World's Premier{' '}
              <span className="text-gradient-gold">Beverage Encyclopedia</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/70 mb-8 leading-relaxed">
              From wine terroir to coffee origins, from whisky aging to craft brewing—master every aspect of the beverage world with our comprehensive knowledge platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1 max-w-lg" ref={searchRef}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="search"
                  placeholder="Search wines, spirits, terms..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold/20 text-lg"
                  data-testid="input-hero-search"
                />
                
                {showResults && results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-navy border border-white/20 rounded-xl overflow-hidden shadow-2xl z-50">
                    <div className="max-h-80 overflow-y-auto">
                      {results.map((item) => (
                        <button
                          key={`${item.type}-${item.id}`}
                          onClick={() => handleSelect(item)}
                          className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3 transition-colors border-b border-white/5 last:border-0"
                          data-testid={`search-result-${item.type}-${item.id}`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                            {item.type === 'term' && <BookOpen className="w-4 h-4 text-gold" />}
                            {item.type === 'book' && <BookMarked className="w-4 h-4 text-primary" />}
                            {item.type === 'article' && <Sparkles className="w-4 h-4 text-secondary" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium truncate">{item.title}</span>
                              <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-white/20 text-white/60">
                                {item.type}
                              </Badge>
                            </div>
                            {item.category && (
                              <p className="text-xs text-white/40 truncate">{item.category}</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Button size="lg" className="h-14 px-8 bg-gold hover:bg-gold/90 text-navy font-semibold" data-testid="button-search-submit">
                Search
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-white/50">Popular:</span>
              {['Terroir', 'Single Malt', 'Tannins', 'Fermentation', 'ABV'].map((term) => (
                <Link
                  key={term}
                  href={`/encyclopedia/search?q=${term.toLowerCase()}`}
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                  data-testid={`link-popular-${term.toLowerCase()}`}
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                Explore Categories
              </h2>
              <p className="text-muted-foreground">Dive into our comprehensive beverage knowledge base</p>
            </div>
            <Link href="/encyclopedia" className="hidden sm:flex items-center gap-1 text-primary hover:text-primary/80 font-medium" data-testid="link-view-all-categories">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/encyclopedia/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                data-testid={`card-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.count.toLocaleString()} entries</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                Trending Articles
              </h2>
              <p className="text-muted-foreground">What the community is reading right now</p>
            </div>
            <Link href="/encyclopedia" className="hidden sm:flex items-center gap-1 text-primary hover:text-primary/80 font-medium" data-testid="link-view-all-articles">
              Browse all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/encyclopedia/article/${article.id}`}
                data-testid={`card-article-${article.id}`}
              >
                <Card className="group h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 bg-card overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                      {article.trending && (
                        <Badge variant="outline" className="text-xs border-gold/30 text-gold">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3">
              More Than an Encyclopedia
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sip Studies offers a complete ecosystem for beverage learning and professional development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Sipopedia</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  12,000+ meticulously researched articles covering every aspect of beverages worldwide.
                </p>
                <Link href="/encyclopedia" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1" data-testid="link-explore-encyclopedia">
                  Explore <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Sippy AI</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your personal beverage expert. Ask anything and get instant, accurate answers.
                </p>
                <Link href="/sippy-ai" className="text-sm font-medium text-gold hover:text-gold/80 flex items-center gap-1" data-testid="link-try-sippy">
                  Try Sippy <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Certifications</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Track your learning journey and earn verifiable certifications for your resume.
                </p>
                <Link href="/certifications" className="text-sm font-medium text-secondary hover:text-secondary/80 flex items-center gap-1" data-testid="link-view-certifications">
                  View paths <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Community</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Collaborate on terminology, contribute notes, and connect with fellow enthusiasts.
                </p>
                <Link href="/community" className="text-sm font-medium text-accent hover:text-accent/80 flex items-center gap-1" data-testid="link-join-community">
                  Join now <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-navy via-primary to-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-tartan-pattern opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 border-gold/40 text-gold bg-gold/10">
            <Star className="w-3 h-3 mr-1" />
            Premium Features
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
            Unlock Your Full Potential
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Get unlimited access to Sippy AI, advanced certification tracking, exclusive content, and more for just $10/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" data-testid="link-cta-pricing">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-semibold px-8">
                View Pricing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/encyclopedia" data-testid="link-cta-browse">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Browse Free Content
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
