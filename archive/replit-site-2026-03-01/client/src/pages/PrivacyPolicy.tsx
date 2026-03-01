import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Privacy Policy</span>
        </div>

        <article className="prose prose-slate max-w-none dark:prose-invert">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sip Studies (“Sip Studies,” “we,” “us,” or “our”) operates the Sipopedia website and related services (collectively, the “Services”) designed to educate people about beverages and promote water accessibility. We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy helps you understand how we collect, use, disclose and store your personal information. By using our Services, you agree to the practices described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">When This Policy Applies</h2>
            <p className="text-muted-foreground leading-relaxed">
              This policy applies to personal information collected through our website, social media pages, contact forms and any offline interactions we have with you. It does not apply to third-party sites, including those that may be linked from our Services; those sites are governed by their own privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">What Information We Collect</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Identifiers and account information:</strong> name, email address, postal address, telephone number, username and password.</li>
              <li><strong>Communications:</strong> messages or inquiries you send us via contact forms, chat bots or email.</li>
              <li><strong>Transaction data:</strong> order details, payment information and purchase history.</li>
              <li><strong>Demographics and preferences:</strong> date of birth (to confirm legal drinking age), preferred language, beverage interests and any surveys you complete.</li>
              <li><strong>Technical data:</strong> IP address, device type, browser, operating system, and information collected via cookies.</li>
              <li><strong>Educational and user-generated content:</strong> comments, reviews or other contributions you post.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">How We Collect Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Information you provide:</strong> when you sign up, subscribe, make a purchase, or contact us.</li>
              <li><strong>Information automatically collected:</strong> through cookies and similar technologies.</li>
              <li><strong>Information from third parties:</strong> such as analytics providers, payment processors or social media platforms.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use personal information to provide and maintain the Services, improve our offerings, communicate with you, ensure legal compliance, and personalize content. We do not sell personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Services are intended for users who are at least the legal drinking age in their jurisdiction (21 in the U.S.). We do not knowingly collect personal information from anyone under 13 years of age.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sip Studies<br />
              Attn: Privacy Officer<br />
              Email: admin@sipstudies.com
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
