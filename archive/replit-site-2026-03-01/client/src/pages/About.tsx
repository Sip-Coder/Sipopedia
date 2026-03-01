import { Link } from 'wouter';
import { ChevronRight, Users, Target, Heart, Globe, BookOpen, Award, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-navy py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gold/60 mb-6">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">About Us</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            About Sip Studies
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl font-light">
            More than just a company: Our philosophy is rooted in the belief that learning, engaging, and teaching can transform the way we enjoy beverages.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Sip Studies was founded with a simple yet powerful mission: to democratize beverage education and make the world of wines, spirits, beers, and specialty drinks accessible to everyone. We believe that understanding what's in your glass enhances every sip.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We want to pass on our collective knowledge to each generation, making every sip an experience to savor. Our platform combines traditional expertise with modern technology, creating an immersive learning environment that adapts to your pace and preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="border-border/50 hover:border-gold/30 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To create the world's most comprehensive and accessible beverage education platform, empowering enthusiasts and professionals alike.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-gold/30 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                  A world where everyone can appreciate the artistry, history, and science behind their favorite beverages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Education First</h3>
              <p className="text-sm text-muted-foreground">
                We believe knowledge enhances enjoyment. Every resource we create aims to educate and inspire.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Our platform thrives on contributions from experts and enthusiasts around the world.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Water Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                If we can enjoy luxury beverages, we should support clean water access for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.3),transparent_70%)]" />
            </div>
            <div className="relative z-10">
              <Globe className="w-12 h-12 text-gold mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                Join Our Global Community
              </h2>
              <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                Over 50,000 beverage professionals and enthusiasts trust Sip Studies for their education journey.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-white">
                <div>
                  <p className="text-3xl font-bold text-gold">12,000+</p>
                  <p className="text-sm text-gray-400">Encyclopedia Entries</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold">500+</p>
                  <p className="text-sm text-gray-400">Certified Terms</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold">98%</p>
                  <p className="text-sm text-gray-400">Accuracy Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
