import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { 
  ChevronRight, 
  TrendingUp,
  Target,
  Grape,
  MapPin,
  Map,
  Loader2,
  Wine,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { TastingAnalytics as TastingAnalyticsType } from '@shared/schema';

async function fetchAnalytics(): Promise<TastingAnalyticsType> {
  const response = await fetch('/api/tasting-notes/analytics', { credentials: 'include' });
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return response.json();
}

export default function TastingAnalytics() {
  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ['/api/tasting-notes/analytics'],
    queryFn: fetchAnalytics,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">Failed to load analytics</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-navy py-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gold/60 mb-4">
            <Link href="/dashboard" className="hover:text-gold">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Tasting Analytics</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-white mb-1">
                Tasting Performance
              </h1>
              <p className="text-gray-400 text-sm">
                Track your blind tasting accuracy and identify areas for improvement
              </p>
            </div>
            <Link href="/dashboard/tasting-notes/new">
              <Button className="bg-gold hover:bg-gold/90 text-navy gap-2" data-testid="button-new-tasting">
                <Wine className="w-4 h-4" />
                New Tasting
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {analytics.totalTastings === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="py-12 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Analytics Yet</h3>
              <p className="text-muted-foreground mb-4">
                Complete some blind tastings to see your performance analytics.
              </p>
              <Link href="/dashboard/tasting-notes/new">
                <Button className="bg-gold hover:bg-gold/90 text-navy gap-2">
                  Start Your First Tasting
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tastings</p>
                      <p className="text-3xl font-bold text-foreground">{analytics.totalTastings}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <Wine className="w-5 h-5 text-gold" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Blind Tastings</p>
                      <p className="text-3xl font-bold text-foreground">{analytics.blindTastings}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Grape Accuracy</p>
                      <p className="text-3xl font-bold text-foreground">{analytics.grapeAccuracy.toFixed(0)}%</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Grape className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Region Accuracy</p>
                      <p className="text-3xl font-bold text-foreground">{analytics.regionAccuracy.toFixed(0)}%</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Map className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Target className="w-5 h-5 text-gold" />
                    Overall Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Grape className="w-4 h-4 text-muted-foreground" />
                        Grape Variety
                      </span>
                      <span className="font-medium">{analytics.grapeAccuracy.toFixed(1)}%</span>
                    </div>
                    <Progress value={analytics.grapeAccuracy} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        Country
                      </span>
                      <span className="font-medium">{analytics.countryAccuracy.toFixed(1)}%</span>
                    </div>
                    <Progress value={analytics.countryAccuracy} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Map className="w-4 h-4 text-muted-foreground" />
                        Region
                      </span>
                      <span className="font-medium">{analytics.regionAccuracy.toFixed(1)}%</span>
                    </div>
                    <Progress value={analytics.regionAccuracy} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Wine className="w-4 h-4 text-muted-foreground" />
                        Vintage
                      </span>
                      <span className="font-medium">{analytics.vintageAccuracy.toFixed(1)}%</span>
                    </div>
                    <Progress value={analytics.vintageAccuracy} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gold" />
                    Study Recommendations
                  </CardTitle>
                  <CardDescription>Based on your tasting patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  {analytics.studyRecommendations.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      Complete more tastings to receive personalized recommendations.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {analytics.studyRecommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-gold">{index + 1}</span>
                          </div>
                          <span className="text-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Grape className="w-5 h-5 text-gold" />
                    Performance by Grape
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.byGrape.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No grape data yet</p>
                  ) : (
                    <div className="space-y-3">
                      {analytics.byGrape.slice(0, 8).map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-foreground">{item.grape}</span>
                            <Badge variant="secondary" className="text-xs">
                              {item.correct}/{item.total}
                            </Badge>
                          </div>
                          <span className={`text-sm font-medium ${
                            item.accuracy >= 50 ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            {item.accuracy.toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gold" />
                    Performance by Country
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.byCountry.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No country data yet</p>
                  ) : (
                    <div className="space-y-3">
                      {analytics.byCountry.slice(0, 8).map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-foreground">{item.country}</span>
                            <Badge variant="secondary" className="text-xs">
                              {item.correct}/{item.total}
                            </Badge>
                          </div>
                          <span className={`text-sm font-medium ${
                            item.accuracy >= 50 ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            {item.accuracy.toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Map className="w-5 h-5 text-gold" />
                    Performance by Region
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.byRegion.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No region data yet</p>
                  ) : (
                    <div className="space-y-3">
                      {analytics.byRegion.slice(0, 8).map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-foreground">{item.region}</span>
                            <Badge variant="secondary" className="text-xs">
                              {item.correct}/{item.total}
                            </Badge>
                          </div>
                          <span className={`text-sm font-medium ${
                            item.accuracy >= 50 ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            {item.accuracy.toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {analytics.weakestAreas.length > 0 && (
              <Card className="border-border/50 border-l-4 border-l-amber-500 mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    Areas Needing Improvement
                  </CardTitle>
                  <CardDescription>Focus your study sessions on these weak spots</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analytics.weakestAreas.map((area, index) => (
                      <div 
                        key={index} 
                        className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge variant="outline" className="text-xs mb-1 border-amber-300 text-amber-700">
                              {area.category}
                            </Badge>
                            <p className="font-medium text-foreground">{area.item}</p>
                          </div>
                          <span className="text-2xl font-bold text-amber-600">
                            {area.accuracy.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
