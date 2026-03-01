import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Send, Sparkles, MessageCircle, Lock, ChevronRight, Bot, User, Clock, Zap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const sampleQuestions = [
  "What's the difference between Scotch and Bourbon?",
  "How do I properly taste wine?",
  "What makes champagne special?",
  "Best coffee beans for espresso?",
  "What is the ideal serving temperature for IPA?",
];

const conversationHistory = [
  {
    role: 'assistant',
    content: "Hello! I'm Sippy, your personal beverage expert. I can help you learn about wines, spirits, beers, coffee, tea, and more. What would you like to know today?",
  },
  {
    role: 'user',
    content: "What makes a wine 'dry' versus 'sweet'?",
  },
  {
    role: 'assistant',
    content: "Great question! The terms 'dry' and 'sweet' in wine refer to the residual sugar content left after fermentation.\n\n**Dry Wine:**\n- Contains very little residual sugar (typically less than 1g per liter)\n- The yeast has consumed most or all of the grape sugars during fermentation\n- Examples: Sauvignon Blanc, Chardonnay, Cabernet Sauvignon\n\n**Sweet Wine:**\n- Contains higher levels of residual sugar\n- Fermentation is stopped before all sugars are converted\n- Examples: Moscato, Port, Sauternes\n\nThe perception of sweetness can also be influenced by acidity, alcohol level, and tannins. A wine with high acidity might taste less sweet even with the same sugar content.\n\nWould you like me to explain more about fermentation or recommend some wines to try?",
  },
];

export default function SippyAI() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-navy via-primary to-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-tartan-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Sippy AI</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-8 h-8 text-navy" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold">Sippy AI</h1>
              <p className="text-white/70">Your personal beverage expert, powered by AI</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            <Badge className="bg-white/10 text-white border-white/20">
              <Sparkles className="w-3 h-3 mr-1" />
              NLP Powered
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20">
              <BookOpen className="w-3 h-3 mr-1" />
              12,000+ Articles
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20">
              <Zap className="w-3 h-3 mr-1" />
              Instant Answers
            </Badge>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="border-border/50 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="p-6 space-y-6">
                    {conversationHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === 'assistant' 
                            ? 'bg-gradient-to-br from-gold to-amber-500' 
                            : 'bg-primary'
                        }`}>
                          {msg.role === 'assistant' ? (
                            <Bot className="w-5 h-5 text-navy" />
                          ) : (
                            <User className="w-5 h-5 text-primary-foreground" />
                          )}
                        </div>
                        <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                          <div className={`inline-block rounded-2xl px-4 py-3 max-w-[85%] ${
                            msg.role === 'assistant'
                              ? 'bg-muted text-foreground text-left'
                              : 'bg-primary text-primary-foreground'
                          }`}>
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                              {msg.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-navy" />
                        </div>
                        <div className="bg-muted rounded-2xl px-4 py-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="border-t border-border p-4 bg-card">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Ask Sippy anything about beverages..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      className="flex-1"
                      data-testid="input-sippy-message"
                    />
                    <Button onClick={handleSend} className="bg-gold hover:bg-gold/90 text-navy" data-testid="button-send-message">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Sippy AI uses your query to search our encyclopedia and provide accurate answers
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-gold/30 bg-gradient-to-br from-gold/5 to-transparent">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-gold" />
                  <h3 className="font-semibold text-foreground">Premium Feature</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlimited Sippy AI conversations with premium membership. Free users get 5 questions per day.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" />
                  <span>3 of 5 free questions remaining today</span>
                </div>
                <Link href="/pricing" data-testid="link-upgrade-sippy">
                  <Button className="w-full bg-gold hover:bg-gold/90 text-navy">
                    Upgrade for Unlimited
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">Try asking:</h3>
                <div className="space-y-2">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(question)}
                      className="w-full text-left text-sm text-muted-foreground hover:text-primary p-2 rounded-lg hover:bg-muted transition-colors"
                      data-testid={`button-sample-question-${index}`}
                    >
                      "{question}"
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
