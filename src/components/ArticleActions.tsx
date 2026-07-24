import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject
} from "react";
import { createPortal } from "react-dom";
import { useArticleLibrary } from "../context/ArticleLibraryContext";
import { useAuth } from "../context/AuthContext";
import { shareArticle } from "../lib/articleSharing";
import type { ArticleSnapshot } from "../lib/articleLibrary";

type ArticleActionsProps = {
  article: ArticleSnapshot;
};

type ArticleReadLinkProps = {
  article: ArticleSnapshot;
  href: string;
  className?: string;
  children: ReactNode;
};

type ArticleShareDialogProps = {
  article: ArticleSnapshot;
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement>;
};

type ShareFormErrors = {
  recipientName?: string;
  recipientEmail?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ArticleActionIconProps = {
  className?: string;
};

function MailIcon({ className }: ArticleActionIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.75 6.75h16.5v10.5H3.75z" />
      <path d="m4.5 7.5 7.5 5.25 7.5-5.25" />
    </svg>
  );
}

function MailOpenIcon({ className }: ArticleActionIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3.75 9.25 8.25-5.5 8.25 5.5v9H3.75z" />
      <path d="m4.25 10 7.75 5 7.75-5" />
      <path d="M7.25 8V5.75h9.5V8" />
    </svg>
  );
}

function BookmarkIcon({ className }: ArticleActionIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.75 3.75h10.5v16.5L12 16.75l-5.25 3.5z" />
    </svg>
  );
}

function ShareIcon({ className }: ArticleActionIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="18" cy="5" r="2.25" />
      <circle cx="6" cy="12" r="2.25" />
      <circle cx="18" cy="19" r="2.25" />
      <path d="m8 10.95 7.9-4.85M8 13.05l7.9 4.85" />
    </svg>
  );
}

function formatArticleDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function ArticleShareDialog({
  article,
  open,
  onClose,
  returnFocusRef
}: ArticleShareDialogProps) {
  const { user } = useAuth();
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successButtonRef = useRef<HTMLButtonElement>(null);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ShareFormErrors>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const reset = () => {
    setRecipientName("");
    setRecipientEmail("");
    setMessage("");
    setErrors({});
    setSubmitError("");
    setSuccessMessage("");
    setSending(false);
  };

  const close = () => {
    reset();
    onClose();
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!open) return;
    const appRoot = document.getElementById("root");
    const previousAriaHidden = appRoot?.getAttribute("aria-hidden");
    const previouslyInert = appRoot?.hasAttribute("inert") === true;
    appRoot?.setAttribute("aria-hidden", "true");
    appRoot?.setAttribute("inert", "");

    window.setTimeout(() => {
      if (user) nameRef.current?.focus();
      else dialogRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ].filter((element) => !element.hasAttribute("hidden"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        event.stopPropagation();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        event.stopPropagation();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (!previouslyInert) appRoot?.removeAttribute("inert");
      if (previousAriaHidden === null || previousAriaHidden === undefined) appRoot?.removeAttribute("aria-hidden");
      else appRoot?.setAttribute("aria-hidden", previousAriaHidden);
    };
  }, [open, user]);

  useEffect(() => {
    if (!successMessage) return;
    window.setTimeout(() => successButtonRef.current?.focus(), 0);
  }, [successMessage]);

  if (!open || typeof document === "undefined") return null;

  const validate = (): ShareFormErrors => {
    const nextErrors: ShareFormErrors = {};
    const cleanName = recipientName.trim();
    const cleanEmail = recipientEmail.trim();
    if (!cleanName) nextErrors.recipientName = "Enter the recipient’s name.";
    else if (cleanName.length > 80) nextErrors.recipientName = "Use 80 characters or fewer.";
    if (!EMAIL_PATTERN.test(cleanEmail)) nextErrors.recipientEmail = "Enter a valid email address.";
    if (message.trim().length > 500) nextErrors.message = "Use 500 characters or fewer.";
    return nextErrors;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.recipientName) nameRef.current?.focus();
      else if (nextErrors.recipientEmail) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    setSending(true);
    try {
      await shareArticle({
        recipientName,
        recipientEmail,
        message,
        article
      });
      setSuccessMessage(`Article sent to ${recipientName.trim()}.`);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We couldn’t send the article. Your message is still here—try again."
      );
    } finally {
      setSending(false);
    }
  };

  return createPortal(
    <div className="article-share-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !sending) close();
    }}>
      <div
        className="article-share-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-share-title"
        aria-describedby="article-share-description"
        ref={dialogRef}
      >
        <div className="article-share-header">
          <div>
            <p className="checkout-eyebrow">Sip Studies sharing</p>
            <h2 id="article-share-title">Share this article</h2>
          </div>
          <button className="btn btn-light article-share-close" type="button" onClick={close} disabled={sending}>
            Close
          </button>
        </div>

        <article className="article-share-preview" aria-label="Article being shared">
          <p className="news-card-tag">{article.sourceCategory}</p>
          <h3>{article.title}</h3>
          <p id="article-share-description">
            {article.sourceName} · {formatArticleDate(article.publishedAt)}
          </p>
        </article>

        {!user ? (
          <div className="article-share-signin">
            <h3>Sign in to share through Sip Studies</h3>
            <p>Signing in identifies the sender and helps protect recipients from unwanted email.</p>
            <a className="btn btn-primary" href="/#login">
              Sign in
            </a>
          </div>
        ) : successMessage ? (
          <div className="article-share-success" role="status">
            <h3>{successMessage}</h3>
            <p>The recipient was not added to a mailing list.</p>
            <button className="btn btn-primary" type="button" onClick={close} ref={successButtonRef}>
              Done
            </button>
          </div>
        ) : (
          <form className="article-share-form" onSubmit={onSubmit} noValidate>
            <label>
              Recipient name
              <input
                ref={nameRef}
                type="text"
                value={recipientName}
                maxLength={80}
                autoComplete="name"
                onChange={(event) => setRecipientName(event.target.value)}
                aria-invalid={Boolean(errors.recipientName)}
                aria-describedby={errors.recipientName ? "share-recipient-name-error" : undefined}
              />
            </label>
            {errors.recipientName ? (
              <p className="error" id="share-recipient-name-error">
                {errors.recipientName}
              </p>
            ) : null}

            <label>
              Recipient email
              <input
                ref={emailRef}
                type="email"
                value={recipientEmail}
                maxLength={254}
                autoComplete="email"
                inputMode="email"
                onChange={(event) => setRecipientEmail(event.target.value)}
                aria-invalid={Boolean(errors.recipientEmail)}
                aria-describedby={errors.recipientEmail ? "share-recipient-email-error" : undefined}
              />
            </label>
            {errors.recipientEmail ? (
              <p className="error" id="share-recipient-email-error">
                {errors.recipientEmail}
              </p>
            ) : null}

            <label>
              Personal message <span>(optional)</span>
              <textarea
                ref={messageRef}
                rows={5}
                value={message}
                maxLength={500}
                placeholder="I thought you’d enjoy this because…"
                onChange={(event) => setMessage(event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "share-personal-message-error" : "share-personal-message-help"}
              />
            </label>
            <p className="hint" id="share-personal-message-help">
              We’ll use this address only to send this article. They won’t be subscribed to Sip Studies emails.
            </p>
            {errors.message ? (
              <p className="error" id="share-personal-message-error">
                {errors.message}
              </p>
            ) : null}
            {submitError ? <p className="error" role="alert">{submitError}</p> : null}

            <div className="article-share-footer">
              <button className="btn btn-light" type="button" onClick={close} disabled={sending}>
                Cancel
              </button>
              <button className="btn btn-primary" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send article"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

export function ArticleActions({ article }: ArticleActionsProps) {
  const { loading, isRead, isFavorite, setRead, setFavorite } = useArticleLibrary();
  const [shareOpen, setShareOpen] = useState(false);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const read = isRead(article);
  const favorite = isFavorite(article);

  return (
    <>
      <div className="article-management-row">
        <div className="article-management-toolbar" role="toolbar" aria-label={`Actions for ${article.title}`}>
          <button
            className={`article-management-button article-management-icon-button article-read-toggle ${
              read ? "is-read" : "is-unread"
            }`}
            type="button"
            aria-pressed={read}
            aria-label={read ? "Mark article unread" : "Mark article read"}
            title={read ? "Mark unread" : "Mark read"}
            disabled={loading}
            onClick={() => setRead(article, !read)}
          >
            {read ? (
              <MailOpenIcon className="article-management-icon" />
            ) : (
              <MailIcon className="article-management-icon" />
            )}
          </button>
          <button
            className={`article-management-button article-management-icon-button article-bookmark-toggle ${
              favorite ? "is-bookmarked" : ""
            }`}
            type="button"
            aria-pressed={favorite}
            aria-label={favorite ? "Remove article from Favorites" : "Add article to Favorites"}
            title={favorite ? "Remove from Favorites" : "Add to Favorites"}
            disabled={loading}
            onClick={() => setFavorite(article, !favorite)}
          >
            <BookmarkIcon className="article-management-icon" />
          </button>
          <button
            className="article-management-button article-management-icon-button"
            type="button"
            ref={shareButtonRef}
            aria-label="Share article through Sip Studies"
            title="Share article"
            onClick={() => setShareOpen(true)}
          >
            <ShareIcon className="article-management-icon" />
          </button>
        </div>
      </div>
      <ArticleShareDialog
        article={article}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        returnFocusRef={shareButtonRef}
      />
    </>
  );
}

export function ArticleReadLink({
  article,
  href,
  className,
  children
}: ArticleReadLinkProps) {
  const { markRead } = useArticleLibrary();

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-article-action="read-source"
      onClick={() => markRead(article)}
      onAuxClick={() => markRead(article)}
    >
      {children}
    </a>
  );
}

export function ArticleFavoritesLink() {
  const { favoriteCount, loading } = useArticleLibrary();
  return (
    <a className="btn btn-light article-favorites-link" href="/#app/favorites">
      Favorites ({loading ? "…" : favoriteCount})
    </a>
  );
}
