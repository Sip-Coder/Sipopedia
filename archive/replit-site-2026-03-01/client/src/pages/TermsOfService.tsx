import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Terms of Service</span>
        </div>

        <article className="prose prose-slate max-w-none dark:prose-invert">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Terms of Service</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service (“Terms”) govern your access to and use of the Sip Studies website, Sipopedia, and related services (collectively, the “Service”). By accessing or using the Service, you (“User” or “you”) agree to be bound by these Terms. You must be at least 21 years old (or the legal drinking age in your jurisdiction) to use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Use of the Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sipopedia provides educational content on beverages and water accessibility. The Service is intended for informational purposes only and does not provide medical, nutritional or legal advice. You agree to use the Service only for personal, non-commercial purposes and comply with all applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All text, images, logos and information on the Service are the intellectual property of Sip Studies or its licensors. You may not modify or reproduce our Content for commercial purposes without our permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">User Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              By submitting content, you grant Sip Studies a worldwide, royalty-free license to host, reproduce, and display your User Content in connection with the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service and Content are provided “AS IS” and “AS AVAILABLE” without warranties of any kind. We do not guarantee that the Service will be uninterrupted or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, Sip Studies will not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by the laws of the State of Nevada. Any disputes will be resolved in the state or federal courts located in Clark County, Nevada.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at legal@sipstudies.com.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
