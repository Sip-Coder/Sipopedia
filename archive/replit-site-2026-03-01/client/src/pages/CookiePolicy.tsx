import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Cookie Policy</span>
        </div>

        <article className="prose prose-slate max-w-none dark:prose-invert">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Cookie Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Cookie Policy explains how Sip Studies uses cookies and similar technologies to recognize you when you visit our website. Cookies are small data files placed on your computer or mobile device when you visit a site. They are widely used to make websites work, improve efficiency, and provide reporting information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Why We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our website to operate. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Sections.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Essential cookies:</strong> Required to provide you with services available through our website.</li>
              <li><strong>Analytics and customization cookies:</strong> Help us understand how our website is being used.</li>
              <li><strong>Advertising cookies:</strong> Used to make advertising messages more relevant to you.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">How Can I Control Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Changes to this Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
