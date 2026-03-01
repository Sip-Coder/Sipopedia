import { Link } from 'wouter';
import { Clock, User, ArrowRight, ChevronRight, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const featuredPost = {
  id: 1,
  title: 'The Future of Sustainable Wine: How Climate Change is Reshaping Vineyards',
  excerpt: 'As temperatures rise and weather patterns shift, winemakers worldwide are adapting their practices. From drought-resistant grape varieties to innovative irrigation techniques, we explore how the industry is responding to environmental challenges.',
  category: 'Industry Trends',
  author: 'Dr. Sarah Mitchell',
  authorRole: 'Wine Industry Analyst',
  date: 'January 8, 2026',
  readTime: '15 min read',
  image: '🍇',
};

const posts = [
  {
    id: 2,
    title: 'Japanese Whisky Hits New Record Prices at Auction',
    excerpt: 'Rare bottles from closed distilleries continue to command premium prices as collectors and investors drive the market.',
    category: 'Market News',
    author: 'James Chen',
    date: 'January 7, 2026',
    readTime: '5 min read',
  },
  {
    id: 3,
    title: 'Craft Beer Trends to Watch in 2026',
    excerpt: 'From hard seltzers to no-alcohol options, the craft beer industry continues to evolve with changing consumer preferences.',
    category: 'Industry Trends',
    author: 'Emma Rodriguez',
    date: 'January 5, 2026',
    readTime: '8 min read',
  },
  {
    id: 4,
    title: 'New Study Links Moderate Wine Consumption to Heart Health',
    excerpt: 'Researchers publish findings on the relationship between polyphenols in red wine and cardiovascular benefits.',
    category: 'Research',
    author: 'Dr. Michael Park',
    date: 'January 4, 2026',
    readTime: '6 min read',
  },
  {
    id: 5,
    title: 'The Rise of Non-Alcoholic Spirits: A $500M Market',
    excerpt: 'Premium non-alcoholic alternatives are gaining market share as consumers seek sophisticated options without the buzz.',
    category: 'Market News',
    author: 'Lisa Thompson',
    date: 'January 3, 2026',
    readTime: '7 min read',
  },
  {
    id: 6,
    title: 'Coffee Farmers Face Supply Chain Challenges',
    excerpt: 'Global shipping disruptions and labor shortages impact specialty coffee sourcing for roasters worldwide.',
    category: 'Industry News',
    author: 'Carlos Mendez',
    date: 'January 2, 2026',
    readTime: '6 min read',
  },
];

const categories = ['All', 'Industry Trends', 'Market News', 'Research', 'Industry News', 'Events'];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Blog</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Industry News & Insights
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay informed with the latest beverage industry news, market trends, research findings, and expert analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                size="sm"
                className="shrink-0"
                data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-12">
          <Link href={`/blog/post/${featuredPost.id}`} data-testid={`card-featured-post-${featuredPost.id}`}>
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-border/50 bg-gradient-to-br from-card to-muted/30">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="bg-gradient-to-br from-burgundy/10 to-forest/10 p-8 lg:p-12 flex items-center justify-center">
                    <span className="text-[120px] opacity-80">{featuredPost.image}</span>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-gold text-navy">{featuredPost.category}</Badge>
                      <Badge variant="outline" className="border-gold/30 text-gold">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{featuredPost.author}</p>
                          <p className="text-xs text-muted-foreground">{featuredPost.authorRole}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-foreground">Latest Articles</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/post/${post.id}`} data-testid={`card-post-${post.id}`}>
              <Card className="group h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 bg-card">
                <CardContent className="p-6 flex flex-col h-full">
                  <Badge variant="secondary" className="w-fit mb-3">{post.category}</Badge>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" data-testid="button-load-more">
            Load More Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
