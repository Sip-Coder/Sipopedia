import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { MessageCircle, X, Send, Minimize2, Maximize2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import sippyAvatar from '@assets/Sippy_1768188760577.jpeg';

type Message = {
  role: 'assistant' | 'user';
  content: string;
  links?: { label: string; href: string }[];
};

const getContextualGreeting = (path: string): Message => {
  const greetings: Record<string, Message> = {
    '/': {
      role: 'assistant',
      content: "Welcome to Sip Studies! I'm Sippy, your beverage guide. How can I help you explore today?",
      links: [
        { label: 'Browse Sipopedia', href: '/encyclopedia' },
        { label: 'View Certifications', href: '/certifications' },
        { label: 'Read the Blog', href: '/blog' },
      ],
    },
    '/encyclopedia': {
      role: 'assistant',
      content: "You're in Sipopedia, our comprehensive beverage encyclopedia! What would you like to learn about?",
      links: [
        { label: 'Wine Articles', href: '/encyclopedia/wine' },
        { label: 'Spirits Guide', href: '/encyclopedia/spirits' },
        { label: 'Beer Knowledge', href: '/encyclopedia/beer' },
        { label: 'Coffee & Tea', href: '/encyclopedia/coffee-tea' },
      ],
    },
    '/blog': {
      role: 'assistant',
      content: "Welcome to our Blog! Stay updated with the latest beverage industry news and insights.",
      links: [
        { label: 'Back to Sipopedia', href: '/encyclopedia' },
        { label: 'View Certifications', href: '/certifications' },
      ],
    },
    '/certifications': {
      role: 'assistant',
      content: "Ready to earn your credentials? I can help you find the right certification path!",
      links: [
        { label: 'Wine Fundamentals', href: '/certifications' },
        { label: 'Spirits Specialist', href: '/certifications' },
        { label: 'View Pricing', href: '/pricing' },
      ],
    },
    '/pricing': {
      role: 'assistant',
      content: "Looking at our plans? Premium unlocks unlimited access to me and all certifications!",
      links: [
        { label: 'Start Free', href: '/encyclopedia' },
        { label: 'View Certifications', href: '/certifications' },
      ],
    },
    '/dashboard': {
      role: 'assistant',
      content: "Welcome back! I see you're making great progress. How can I help you continue learning?",
      links: [
        { label: 'Continue Certification', href: '/certifications' },
        { label: 'Explore Sipopedia', href: '/encyclopedia' },
        { label: 'Admin Panel', href: '/admin' },
      ],
    },
    '/admin': {
      role: 'assistant',
      content: "You're in the Admin panel. Need help managing terminology or bulk uploads?",
      links: [
        { label: 'Back to Dashboard', href: '/dashboard' },
        { label: 'View Published Terms', href: '/encyclopedia' },
      ],
    },
  };

  return greetings[path] || {
    role: 'assistant',
    content: "Hi! I'm Sippy, your beverage knowledge assistant. How can I help you navigate Sip Studies?",
    links: [
      { label: 'Go to Home', href: '/' },
      { label: 'Browse Sipopedia', href: '/encyclopedia' },
      { label: 'View Certifications', href: '/certifications' },
    ],
  };
};

const quickResponses: Record<string, Message> = {
  'wine': {
    role: 'assistant',
    content: "Great choice! Wine is one of our most popular categories. Here's where you can dive in:",
    links: [
      { label: 'Wine Encyclopedia', href: '/encyclopedia/wine' },
      { label: 'Wine Fundamentals Cert', href: '/certifications' },
    ],
  },
  'beer': {
    role: 'assistant',
    content: "Beer enthusiast? We've got you covered with brewing knowledge and tasting guides!",
    links: [
      { label: 'Beer Encyclopedia', href: '/encyclopedia/beer' },
      { label: 'Craft Beer Expert Cert', href: '/certifications' },
    ],
  },
  'spirits': {
    role: 'assistant',
    content: "From whisky to gin, our spirits section covers it all. Let me point you in the right direction:",
    links: [
      { label: 'Spirits Encyclopedia', href: '/encyclopedia/spirits' },
      { label: 'Spirits Specialist Cert', href: '/certifications' },
    ],
  },
  'coffee': {
    role: 'assistant',
    content: "Coffee lover? Explore origins, brewing methods, and become a certified connoisseur!",
    links: [
      { label: 'Coffee & Tea Encyclopedia', href: '/encyclopedia/coffee-tea' },
      { label: 'Coffee Connoisseur Cert', href: '/certifications' },
    ],
  },
  'certification': {
    role: 'assistant',
    content: "Ready to level up? Our certifications are industry-recognized and self-paced!",
    links: [
      { label: 'View All Certifications', href: '/certifications' },
      { label: 'Pricing Plans', href: '/pricing' },
    ],
  },
  'help': {
    role: 'assistant',
    content: "I'm here to help! Here are the main areas of Sip Studies:",
    links: [
      { label: 'Sipopedia (Encyclopedia)', href: '/encyclopedia' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Blog & News', href: '/blog' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Your Dashboard', href: '/dashboard' },
    ],
  },
};

export function SippyChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [location] = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevLocation = useRef(location);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (location !== prevLocation.current && isAuthenticated) {
      const greeting = getContextualGreeting(location);
      setMessages(prev => [...prev, greeting]);
      prevLocation.current = location;
    }
  }, [location, isAuthenticated]);

  useEffect(() => {
    if (isOpen && messages.length === 0 && isAuthenticated) {
      setMessages([getContextualGreeting(location)]);
    }
  }, [isOpen, location, isAuthenticated]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const userMessage: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    
    const lowerMessage = message.toLowerCase();
    let response: Message | null = null;
    
    for (const [keyword, resp] of Object.entries(quickResponses)) {
      if (lowerMessage.includes(keyword)) {
        response = resp;
        break;
      }
    }
    
    if (!response) {
      response = {
        role: 'assistant',
        content: "I'd love to help with that! Here are some resources that might be useful:",
        links: [
          { label: 'Search Sipopedia', href: '/encyclopedia' },
          { label: 'Ask in Detail (Full Chat)', href: '/sippy-ai' },
        ],
      };
    }
    
    setTimeout(() => {
      setMessages(prev => [...prev, response!]);
    }, 500);
    
    setMessage('');
  };

  if (!isAuthenticated) return null;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        data-testid="button-open-sippy"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gold/30 rounded-full blur-xl group-hover:bg-gold/50 transition-all" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gold to-amber-500 shadow-xl flex items-center justify-center overflow-hidden border-2 border-white/20 group-hover:scale-110 transition-transform">
            <img src={sippyAvatar} alt="Sippy" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white animate-pulse" />
        </div>
        <span className="absolute -top-8 right-0 bg-card text-foreground text-xs px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with Sippy!
        </span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-300 ${
        isMinimized ? 'w-72 h-16' : 'w-80 sm:w-96 h-[500px]'
      }`}
      data-testid="sippy-chat-window"
    >
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-navy to-primary text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
            <img src={sippyAvatar} alt="Sippy" className="w-full h-full object-cover" />
          </div>
          <Link href="/sippy" className="hover:underline">
            <h3 className="font-semibold text-sm">Sippy</h3>
            <p className="text-xs text-white/70">Your beverage guide</p>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setIsMinimized(!isMinimized)}
            data-testid="button-minimize-sippy"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setIsOpen(false)}
            data-testid="button-close-sippy"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <ScrollArea className="h-[380px] p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <img src={sippyAvatar} alt="Sippy" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block rounded-2xl px-3 py-2 text-sm ${
                      msg.role === 'assistant'
                        ? 'bg-muted text-foreground rounded-tl-sm'
                        : 'bg-primary text-primary-foreground rounded-tr-sm'
                    }`}>
                      {msg.content}
                    </div>
                    {msg.links && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.links.map((link, i) => (
                          <Link
                            key={i}
                            href={link.href}
                            className="inline-flex items-center gap-1 text-xs bg-gold/10 text-gold hover:bg-gold/20 px-2 py-1 rounded-full transition-colors"
                            data-testid={`sippy-link-${i}`}
                          >
                            {link.label}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 h-9 text-sm"
                data-testid="input-sippy-message"
              />
              <Button 
                size="icon" 
                className="h-9 w-9 bg-gold hover:bg-gold/90 text-navy shrink-0"
                onClick={handleSend}
                data-testid="button-send-sippy"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
              {['Wine', 'Beer', 'Spirits', 'Coffee', 'Help'].map((quick) => (
                <button
                  key={quick}
                  onClick={() => { setMessage(quick); }}
                  className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground whitespace-nowrap transition-colors"
                  data-testid={`quick-${quick.toLowerCase()}`}
                >
                  {quick}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
