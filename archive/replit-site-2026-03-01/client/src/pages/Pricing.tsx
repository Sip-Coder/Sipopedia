import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Check, X, Sparkles, ChevronRight, MessageCircle, BookOpen, GraduationCap, Users, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for casual learners exploring beverage knowledge',
    features: [
      { text: 'Access to 5,000+ encyclopedia articles', included: true },
      { text: '5 Sippy AI questions per day', included: true },
      { text: 'Basic terminology tracking', included: true },
      { text: 'Community notes (read-only)', included: true },
      { text: 'Weekly newsletter', included: true },
      { text: 'Beginner certification paths', included: true },
      { text: 'Advanced certifications', included: false },
      { text: 'Unlimited Sippy AI', included: false },
      { text: 'Priority support', included: false },
      { text: 'Resume credential badges', included: false },
    ],
    cta: 'Get Started Free',
    variant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Premium',
    price: '$10',
    period: '/month',
    description: 'For serious enthusiasts and industry professionals',
    features: [
      { text: 'Access to all 12,000+ articles', included: true },
      { text: 'Unlimited Sippy AI questions', included: true },
      { text: 'Advanced terminology tracking', included: true },
      { text: 'Full community collaboration', included: true },
      { text: 'Early access to new content', included: true },
      { text: 'All certification paths', included: true },
      { text: 'Verified credential badges', included: true },
      { text: 'Export for resume/LinkedIn', included: true },
      { text: 'Priority support', included: true },
      { text: 'Ad-free experience', included: true },
    ],
    cta: 'Start Premium',
    variant: 'default' as const,
    popular: true,
  },
];

const faqs = [
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your Premium subscription at any time. You\'ll continue to have access until the end of your billing period.',
  },
  {
    question: 'What happens to my certifications if I downgrade?',
    answer: 'Your completed certifications remain yours forever. However, access to premium certification paths and verified badges requires an active Premium subscription.',
  },
  {
    question: 'Is there a team or enterprise plan?',
    answer: 'Yes! We offer custom plans for bars, restaurants, and hospitality organizations. Contact us for details.',
  },
  {
    question: 'How does Sippy AI work?',
    answer: 'Sippy AI uses natural language processing to understand your questions and searches our encyclopedia to provide accurate, sourced answers about beverages.',
  },
];

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-navy via-primary to-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-tartan-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Pricing</span>
          </div>
          <Badge className="mb-6 bg-gold/20 text-gold border-gold/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Simple, transparent pricing
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Start free and upgrade when you're ready. Unlock unlimited access to Sippy AI, all certifications, and premium features.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative overflow-hidden ${
                plan.popular 
                  ? 'border-gold shadow-xl ring-2 ring-gold/20' 
                  : 'border-border/50'
              }`}
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg bg-gold text-navy">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-serif font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-foreground' : 'text-muted-foreground/50'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gold hover:bg-gold/90 text-navy' 
                      : ''
                  }`}
                  variant={plan.variant}
                  size="lg"
                  data-testid={`button-${plan.name.toLowerCase()}-cta`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground text-center mb-12">
            Everything You Get with Premium
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, title: 'Unlimited Sippy AI', description: 'Ask any beverage question, anytime. No daily limits.' },
              { icon: BookOpen, title: 'Full Encyclopedia', description: 'Access all 12,000+ articles including expert deep-dives.' },
              { icon: GraduationCap, title: 'All Certifications', description: 'Unlock advanced and professional certification paths.' },
              { icon: Users, title: 'Community Features', description: 'Contribute notes, collaborate on terminology, and connect.' },
              { icon: Award, title: 'Verified Credentials', description: 'Shareable badges for your resume and LinkedIn profile.' },
              { icon: Zap, title: 'Priority Everything', description: 'Priority support, early access, and ad-free browsing.' },
            ].map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-border/50" data-testid={`faq-${index}`}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-navy via-primary to-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-tartan-pattern opacity-5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
            Ready to Master the World of Beverages?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Join 50,000+ enthusiasts and professionals learning with Sip Studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-semibold px-8" data-testid="button-cta-premium">
              Start Premium - $10/month
            </Button>
            <Link href="/encyclopedia" data-testid="link-cta-free">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Explore Free Content
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
