import { buildOnboardingRoute } from "../lib/onboardingIntent";

type PublicFooterProps = {
  onNavigate: (route: string) => void;
};

type SocialItem = {
  label: string;
  href: string;
  icon: "instagram" | "youtube" | "spotify" | "facebook";
};

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/sip.studies", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@sipstudies", icon: "youtube" },
  { label: "Spotify", href: "https://open.spotify.com/show/2LSWrWDTlPOMgnZkGfUPE1", icon: "spotify" },
  { label: "Facebook", href: "https://www.facebook.com/SipStudies", icon: "facebook" }
] satisfies SocialItem[];

function SocialIcon({ icon }: { icon: SocialItem["icon"] }) {
  if (icon === "youtube") {
    return (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10.3545 15.2793L7.07189 15.2181C6.00906 15.1967 4.94359 15.2393 3.90161 15.0182C2.3165 14.6877 2.20421 13.0675 2.0867 11.7084C1.9248 9.79779 1.98747 7.85245 2.29302 5.95773C2.46551 4.8946 3.14432 4.26022 4.19408 4.19119C7.7378 3.94066 11.3051 3.97035 14.8409 4.08723C15.2144 4.09795 15.5904 4.15651 15.9586 4.22317C17.7762 4.54829 17.8205 6.38436 17.9384 7.92998C18.0559 9.49156 18.0063 11.0611 17.7817 12.6121C17.6015 13.8962 17.2568 14.9731 15.8019 15.077C13.9791 15.213 12.1981 15.3224 10.3701 15.2876C10.3702 15.2793 10.3597 15.2793 10.3545 15.2793ZM8.42463 12.0283C9.79829 11.2234 11.1457 10.432 12.5115 9.63257C11.1353 8.82773 9.79043 8.03631 8.42463 7.23688V12.0283Z" />
      </svg>
    );
  }

  if (icon === "spotify") {
    return (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M14.4593 8.76319C12.2193 7.43319 8.47428 7.29319 6.33928 7.95819C5.98928 8.06319 5.63928 7.85319 5.53428 7.53819C5.42928 7.18819 5.63928 6.83819 5.95428 6.73319C8.43928 5.99819 12.5343 6.13819 15.1243 7.67819C15.4393 7.85319 15.5443 8.27319 15.3693 8.58819C15.1943 8.83319 14.7743 8.93819 14.4593 8.76319ZM14.3893 10.7257C14.2143 10.9707 13.8993 11.0757 13.6543 10.9007C11.7643 9.74565 8.89428 9.39565 6.68928 10.0957C6.40928 10.1657 6.09428 10.0257 6.02428 9.74565C5.95428 9.46565 6.09428 9.15065 6.37428 9.08065C8.92928 8.31065 12.0793 8.69565 14.2493 10.0257C14.4593 10.1307 14.5643 10.4807 14.3893 10.7257ZM13.5494 12.6493C13.4094 12.8593 13.1644 12.9293 12.9544 12.7893C11.3094 11.7743 9.24435 11.5643 6.79435 12.1243C6.54935 12.1943 6.33935 12.0193 6.26935 11.8093C6.19935 11.5643 6.37435 11.3543 6.58435 11.2843C9.24435 10.6893 11.5544 10.9343 13.3744 12.0543C13.6194 12.1593 13.6544 12.4393 13.5494 12.6493ZM10 3C6.15 3 3 6.15 3 10C3 13.85 6.15 17 10 17C13.85 17 17 13.85 17 10C17 6.15 13.885 3 10 3Z" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M11.8124 5.62502H13.9997V3H11.8124C10.1239 3 8.7502 4.37375 8.7502 6.06219V7.37469H7V10H8.74967V17H11.375V10H13.5623L13.9997 7.37472H11.375V6.06219C11.375 5.825 11.5752 5.62478 11.8124 5.62478V5.62504L11.8124 5.62502Z" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.8503 0H7.14973C3.20735 0 0 3.20735 0 7.14973V16.8503C0 20.7926 3.20735 24 7.14973 24H16.8503C20.7926 24 24 20.7926 24 16.8503V7.14973C24 3.20735 20.7926 0 16.8503 0ZM21.5856 16.8503C21.5856 19.4655 19.4655 21.5856 16.8503 21.5856H7.14973C4.5345 21.5856 2.4144 19.4655 2.4144 16.8503V7.14973C2.4144 4.53446 4.5345 2.4144 7.14973 2.4144H16.8503C19.4655 2.4144 21.5856 4.53446 21.5856 7.14973V16.8503ZM12.0002 5.79297C8.57754 5.79297 5.79297 8.57754 5.79297 12.0002C5.79297 15.4228 8.57754 18.2074 12.0002 18.2074C15.4229 18.2074 18.2075 15.4229 18.2075 12.0002C18.2075 8.57749 15.4229 5.79297 12.0002 5.79297ZM12.0002 15.7931C9.90547 15.7931 8.20737 14.095 8.20737 12.0002C8.20737 9.90547 9.90551 8.20737 12.0002 8.20737C14.095 8.20737 15.7931 9.90547 15.7931 12.0002C15.7931 14.0949 14.0949 15.7931 12.0002 15.7931Z" />
    </svg>
  );
}

export function PublicFooter({ onNavigate }: PublicFooterProps) {
  return (
    <footer className="public-footer">
      <div>
        <h3>Sip Studies</h3>
        <p>Commercial training platform for hospitality teams and ambitious beverage operators.</p>
      </div>
      <div className="public-footer-links">
        <button className="btn btn-light" onClick={() => onNavigate("home")}>
          Home
        </button>
        <button className="btn btn-light" onClick={() => onNavigate(buildOnboardingRoute("pricing", { planId: "pro", source: "footer" }))}>
          Pricing
        </button>
        <button className="btn btn-light" onClick={() => onNavigate("study-paths")}>
          Study Paths
        </button>
        <button className="btn btn-light" onClick={() => onNavigate("support")}>
          Support
        </button>
        <button className="btn btn-light" onClick={() => onNavigate(buildOnboardingRoute("checkout", { planId: "pro", source: "footer" }))}>
          Enroll
        </button>
      </div>
      <div className="public-socials">
        {socials.map((social) => (
          <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>
            <SocialIcon icon={social.icon} />
          </a>
        ))}
      </div>
    </footer>
  );
}
