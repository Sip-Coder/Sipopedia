import { Link } from 'wouter';
import { BookOpen, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Sipopedia',
      links: [
        { label: 'Wine', href: '/encyclopedia/wine' },
        { label: 'Spirits', href: '/encyclopedia/spirits' },
        { label: 'Beer', href: '/encyclopedia/beer' },
        { label: 'Coffee & Tea', href: '/encyclopedia/coffee-tea' },
        { label: 'Non-Alcoholic', href: '/encyclopedia/non-alcoholic' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { label: 'Certifications', href: '/certifications' },
        { label: 'Terminology', href: '/encyclopedia/terminology' },
        { label: 'Chat with Sippy', href: '/sippy-ai' },
        { label: 'Community Notes', href: '/community' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
      ],
    },
  ];

  return (
    <footer className="bg-navy text-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
              <Link href="/" className="flex items-center gap-3 mb-4" data-testid="link-footer-home">
                <img 
                  src="/assets/Sip_Studies_Logo_03_-_Dark_1768189807484.png" 
                  alt="Sip Studies" 
                  className="w-10 h-10 rounded-xl object-contain bg-white/10 p-1"
                />
                <div>
                  <h3 className="text-lg font-serif font-semibold">Sip Studies</h3>
                  <p className="text-[10px] text-white/50 tracking-widest uppercase">Beverage Encyclopedia</p>
                </div>
              </Link>
              <p className="text-sm text-white/60 mb-6 max-w-xs">
                The world's most comprehensive beverage knowledge platform by Sip Studies. Learn, explore, and master the art of drinks.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" data-testid="link-twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" data-testid="link-linkedin">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" data-testid="link-instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" data-testid="link-youtube">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-sm mb-4 text-white">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-gold transition-colors"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {currentYear} Sip Studies. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Crafted with passion for beverage enthusiasts worldwide 🥃
          </p>
        </div>
      </div>
    </footer>
  );
}
