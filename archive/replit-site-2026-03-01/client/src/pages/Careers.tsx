import { Link } from 'wouter';
import { ChevronRight, Briefcase, MapPin, Clock, ArrowRight, Heart, Users, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const openPositions = [
  {
    id: 1,
    title: 'Senior Content Writer - Wine',
    department: 'Editorial',
    location: 'Remote',
    type: 'Full-time',
    description: 'Create engaging wine education content for Sipopedia, including articles, terminology, and learning materials.'
  },
  {
    id: 2,
    title: 'Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help build and improve our educational platform using React, Node.js, and modern web technologies.'
  },
  {
    id: 3,
    title: 'Community Manager',
    department: 'Community',
    location: 'Remote',
    type: 'Part-time',
    description: 'Foster our growing community of beverage enthusiasts and moderate user contributions.'
  },
];

export default function Careers() {
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
            <span className="text-gold">Careers</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl font-light">
            Help us build the world's premier beverage education platform. We're looking for passionate people who love learning and sharing knowledge.
          </p>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8 text-center">Why Work With Us</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Remote First</h3>
              <p className="text-sm text-muted-foreground">Work from anywhere in the world</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Learn & Grow</h3>
              <p className="text-sm text-muted-foreground">Continuous education opportunities</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Great Team</h3>
              <p className="text-sm text-muted-foreground">Collaborate with passionate experts</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Make Impact</h3>
              <p className="text-sm text-muted-foreground">Support water accessibility initiatives</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Open Positions</h2>
          
          <div className="space-y-4">
            {openPositions.map((position) => (
              <Card key={position.id} className="border-border/50 hover:border-gold/30 transition-colors group" data-testid={`job-${position.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{position.department}</Badge>
                        <Badge variant="outline">{position.type}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-gold transition-colors mb-2">
                        {position.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">{position.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-gold hover:bg-gold/90 text-navy gap-2 shrink-0" data-testid={`button-apply-${position.id}`}>
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 border-gold/20 bg-gradient-to-br from-gold/5 to-transparent">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">Don't See Your Role?</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                We're always looking for talented people. Send us your resume and tell us how you'd like to contribute.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10" data-testid="button-general-application">
                  Send General Application
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
