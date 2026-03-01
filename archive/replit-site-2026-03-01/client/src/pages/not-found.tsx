import { Link } from 'wouter';
import { Home, Search, BookOpen, ArrowLeft, Wine, Beer, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.3),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(128,0,32,0.2),transparent_50%)]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce" style={{ animationDuration: '3s' }}>🍷</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>🥃</div>
        <div className="absolute bottom-32 left-1/4 text-4xl opacity-10 animate-bounce" style={{ animationDuration: '2s', animationDelay: '1s' }}>☕</div>
        <div className="absolute bottom-20 right-1/3 text-5xl opacity-10 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.3s' }}>🍺</div>
        <div className="absolute top-1/3 left-1/3 text-4xl opacity-10 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.8s' }}>🍵</div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gold/10 border-2 border-gold/30 mb-6">
            <span className="text-7xl">🫗</span>
          </div>
        </div>

        <h1 className="text-8xl md:text-9xl font-serif font-bold text-gold mb-4">404</h1>
        
        <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
          Oops! This glass is empty.
        </h2>
        
        <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
          Looks like this page got lost somewhere between the vineyard and the cellar. 
          Let's get you back to where the good stuff is.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/">
            <Button className="bg-gold hover:bg-gold/90 text-navy gap-2 h-12 px-8 text-lg" data-testid="button-go-home">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Link href="/encyclopedia">
            <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 gap-2 h-12 px-8 text-lg" data-testid="button-browse">
              <BookOpen className="w-5 h-5" />
              Browse Sipopedia
            </Button>
          </Link>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-sm text-gray-500 mb-4">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/encyclopedia/wine">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gold gap-2">
                <Wine className="w-4 h-4" />
                Wine
              </Button>
            </Link>
            <Link href="/encyclopedia/spirits">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gold gap-2">
                🥃 Spirits
              </Button>
            </Link>
            <Link href="/encyclopedia/beer">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gold gap-2">
                <Beer className="w-4 h-4" />
                Beer
              </Button>
            </Link>
            <Link href="/encyclopedia/coffee-tea">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gold gap-2">
                <Coffee className="w-4 h-4" />
                Coffee & Tea
              </Button>
            </Link>
          </div>
        </div>

        <p className="mt-12 text-xs text-gray-600">
          If you believe this is an error, please <Link href="/contact" className="text-gold hover:underline">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
