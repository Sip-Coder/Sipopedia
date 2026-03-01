import { useState, useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import { Search, Filter, BookOpen, Clock, ArrowRight, ChevronRight, X, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const bookLists: Record<string, { title: string; author: string; year: string }[]> = {
  Wine: [
    { title: 'The World Atlas of Wine', author: 'Hugh Johnson & Jancis Robinson', year: '2019' },
    { title: 'Wine Folly: Magnum Edition', author: 'Madeline Puckette', year: '2018' },
  ],
  Spirits: [
    { title: 'The World Atlas of Whisky', author: 'Dave Broom', year: '2014' },
    { title: 'Imbibe!', author: 'David Wondrich', year: '2007' },
  ],
  Beer: [
    { title: 'The Oxford Companion to Beer', author: 'Garrett Oliver', year: '2011' },
    { title: 'Tasting Beer', author: 'Randy Mosher', year: '2017' },
  ],
};

const categories = [
  { id: 'wine', name: 'Wine', count: 2847, icon: '🍷' },
  { id: 'beer', name: 'Beer', count: 1456, icon: '🍺' },
  { id: 'spirits', name: 'Spirits', count: 1923, icon: '🥃' },
  { id: 'coffee', name: 'Coffee', count: 892, icon: '☕' },
  { id: 'tea', name: 'Tea', count: 634, icon: '🍵' },
  { id: 'other-drinks', name: 'Other Drinks', count: 1801, icon: '🧃' },
  { id: 'terminology', name: 'Terminology', count: 3500, icon: '📚' },
];

const articles = [
  {
    id: 1,
    title: 'Terroir: The Soul of Wine',
    category: 'Wine',
    excerpt: 'Understanding how geography, climate, and soil influence the character and quality of wine production across different regions.',
    readTime: '12 min',
    contributors: 45,
    lastUpdated: '2 days ago',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Japanese Whisky Auction Trends',
    category: 'Spirits',
    excerpt: 'Rare bottles from closed distilleries continue to command premium prices as collectors and investors drive the market.',
    readTime: '8 min',
    contributors: 12,
    lastUpdated: 'Today',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Single Malt vs Blended Whisky',
    category: 'Spirits',
    excerpt: 'A comprehensive comparison of single malt and blended whisky, exploring production methods, flavor profiles, and notable distilleries.',
    readTime: '15 min',
    contributors: 32,
    lastUpdated: '1 week ago',
    isFeatured: false,
  },
  {
    id: 4,
    title: 'Sustainable Vineyards Adapt to Climate',
    category: 'Wine',
    excerpt: 'How winemakers worldwide are adapting practices to environmental challenges and shifting weather patterns.',
    readTime: '10 min',
    contributors: 24,
    lastUpdated: '3 days ago',
    isFeatured: false,
  },
];

const terminology = [
  { id: 'tannins', term: 'Tannins', category: 'Wine', definition: 'Polyphenolic compounds found in grape skins, seeds, and stems that contribute to wine\'s structure and mouthfeel.', bookRefs: 2 },
  { id: 'abv', term: 'ABV', category: 'General', definition: 'Alcohol by Volume - a standard measure of how much alcohol is contained in a beverage.', bookRefs: 4 },
  { id: 'mash-bill', term: 'Mash Bill', category: 'Spirits', definition: 'The recipe of grains used in whiskey production, typically including corn, rye, wheat, and barley.', bookRefs: 2 },
  { id: 'cold-brew', term: 'Cold Brew', category: 'Coffee', definition: 'A coffee brewing method using cold water over an extended period, typically 12-24 hours.', bookRefs: 1 },
  { id: 'ibu', term: 'IBU', category: 'Beer', definition: 'International Bitterness Units - a scale measuring the bitterness of beer from hop acids.', bookRefs: 2 },
  { id: 'cuvee', term: 'Cuvée', category: 'Wine', definition: 'A blend or batch of wine, often referring to the best selection from a producer.', bookRefs: 2 },
];

export default function Encyclopedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredTerminology = terminology.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredBookLists = Object.entries(bookLists).filter(([guild]) => {
    if (!selectedCategory) return true;
    const guildKey = guild.toLowerCase();
    const categoryKey = selectedCategory.toLowerCase();
    return guildKey.includes(categoryKey) || categoryKey.includes(guildKey);
  }).reduce((acc, [guild, books]) => {
    const filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredBooks.length > 0) {
      acc[guild] = filteredBooks;
    }
    return acc;
  }, {} as typeof bookLists);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Sipopedia</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Sipopedia
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our comprehensive collection of 12,000+ articles covering every aspect of the beverage world.
            </p>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles, terms, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
                data-testid="input-encyclopedia-search"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="shrink-0"
              data-testid="button-filter-all"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="shrink-0"
                data-testid={`button-filter-${category.id}`}
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.name}
                <Badge variant="secondary" className="ml-2 text-xs">{category.count}</Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Tabs defaultValue="terminology" className="space-y-8">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="terminology" className="gap-2" data-testid="tab-terminology">
              📚 Terminology
            </TabsTrigger>
            <TabsTrigger value="articles" className="gap-2" data-testid="tab-articles">
              <BookOpen className="w-4 h-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="reading-list" className="gap-2" data-testid="tab-reading-list">
              📖 Reading List
            </TabsTrigger>
          </TabsList>

          <TabsContent value="terminology" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredTerminology.map((item) => (
                <Link key={item.id} href={`/encyclopedia/term/${item.id}`}>
                  <Card className="hover:shadow-md hover:border-gold/30 transition-all cursor-pointer border-border/50 h-full group" data-testid={`card-term-${item.term.toLowerCase()}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-foreground group-hover:text-gold transition-colors">{item.term}</h4>
                        <Badge variant="secondary" className="text-xs shrink-0">{item.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.definition}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {item.bookRefs} book{item.bookRefs !== 1 ? 's' : ''}
                        </span>
                        <Badge variant="outline" className="text-xs">Community Notes</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {filteredTerminology.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No terms found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/encyclopedia/article/${article.id}`} data-testid={`card-article-${article.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 bg-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{article.category}</Badge>
                            {article.isFeatured && (
                              <Badge variant="outline" className="border-gold/30 text-gold">Featured</Badge>
                            )}
                          </div>
                          <h3 className="text-xl lg:text-2xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime} read
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {article.contributors} contributors
                            </span>
                            <span>Updated {article.lastUpdated}</span>
                          </div>
                        </div>
                        <div className="lg:self-center">
                          <Button variant="ghost" size="sm" className="text-primary group-hover:bg-primary/10">
                            Read article <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reading-list" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(filteredBookLists).map(([guild, books]) => (
                <Card key={guild} className="border-border/50 hover:border-gold/30 transition-colors">
                  <CardHeader className="pb-2">
                    <h3 className="font-serif font-bold text-lg text-gold">{guild} Guild</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {books.map((book, i) => (
                        <li key={i} className="group">
                          <p className="font-medium text-foreground leading-tight group-hover:text-gold transition-colors">{book.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{book.author} • {book.year}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
              {Object.keys(filteredBookLists).length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No books found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
