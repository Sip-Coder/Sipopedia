import { useMemo } from "react";
import { useArticleLibrary } from "../context/ArticleLibraryContext";
import { useArticlePreferences } from "../context/ArticlePreferencesContext";
import { safeHttpUrl } from "../lib/urlSafety";
import { ArticleActions, ArticleReadLink } from "./ArticleActions";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function safeImageUrl(value: string | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  return safeHttpUrl(value);
}

export function ArticleFavorites() {
  const {
    favorites,
    loading,
    syncStatus,
    syncMessage,
    retrySync
  } = useArticleLibrary();
  const {
    favorites: favoritePreferences,
    updateFavorites
  } = useArticlePreferences();
  const { filter, unreadOnly } = favoritePreferences;

  const visibleFavorites = useMemo(
    () =>
      favorites.filter((item) => {
        if (filter !== "all" && item.surface !== filter) return false;
        if (unreadOnly && item.isRead) return false;
        return true;
      }),
    [favorites, filter, unreadOnly]
  );

  return (
    <section className="news-board article-favorites-board">
      <div className="section-header">
        <div>
          <p className="checkout-eyebrow">Your reading list</p>
          <h2>Favorites</h2>
          <p>Articles you bookmarked from Flavor Blog and Beverage News.</p>
        </div>
        <div className="article-favorites-browse">
          <a className="btn btn-light" href="/#app/flavor-blog">Flavor Blog</a>
          <a className="btn btn-light" href="/#app/beverage-news">Beverage News</a>
        </div>
      </div>

      <div className="article-library-status" role="status" aria-live="polite">
        <p>{syncMessage}</p>
        {syncStatus === "offline" ? (
          <button className="btn btn-light" type="button" onClick={() => void retrySync()}>
            Retry sync
          </button>
        ) : null}
      </div>

      <div className="article-library-filters" aria-label="Favorite article filters">
        <div className="news-source-strip" role="group" aria-label="Filter Favorites by collection">
          <button
            className={`news-source-chip ${filter === "all" ? "active" : ""}`}
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => updateFavorites({ filter: "all" })}
          >
            All ({favorites.length})
          </button>
          <button
            className={`news-source-chip ${filter === "flavor-blog" ? "active" : ""}`}
            type="button"
            aria-pressed={filter === "flavor-blog"}
            onClick={() => updateFavorites({ filter: "flavor-blog" })}
          >
            Flavor Blog
          </button>
          <button
            className={`news-source-chip ${filter === "beverage-news" ? "active" : ""}`}
            type="button"
            aria-pressed={filter === "beverage-news"}
            onClick={() => updateFavorites({ filter: "beverage-news" })}
          >
            Beverage News
          </button>
        </div>
        <button
          className={`news-source-chip ${unreadOnly ? "active" : ""}`}
          type="button"
          aria-pressed={unreadOnly}
          onClick={() => updateFavorites((current) => ({ unreadOnly: !current.unreadOnly }))}
        >
          Unread only
        </button>
      </div>

      {loading ? (
        <div className="article-library-loading" role="status">
          <span className="article-library-skeleton" />
          <span className="article-library-skeleton" />
          <span className="article-library-skeleton" />
          <span className="sr-only">Loading your reading list</span>
        </div>
      ) : visibleFavorites.length > 0 ? (
        <div className="news-grid">
          {visibleFavorites.map((article) => {
            const imageUrl = safeImageUrl(article.imageUrl);
            const articleUrl = safeHttpUrl(article.url);
            return (
              <article
                className={`news-card article-favorite-card ${article.isRead ? "is-read" : ""}`}
                key={article.articleKey}
              >
                {imageUrl ? (
                  <img
                    className="news-card-image"
                    src={imageUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <p className="news-card-tag">
                  {article.surface === "flavor-blog" ? "Flavor Blog" : "Beverage News"}
                </p>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <p className="news-card-meta">
                  {article.sourceName} · {formatDate(article.publishedAt)}
                </p>
                <ArticleActions article={article} />
                <div className="journal-actions article-primary-actions">
                  {articleUrl ? (
                    <ArticleReadLink article={article} className="btn btn-primary news-link" href={articleUrl}>
                      Read article
                    </ArticleReadLink>
                  ) : (
                    <span className="btn btn-light">Source may be unavailable</span>
                  )}
                  <a
                    className="btn btn-light news-link"
                    href={`/#app/${article.surface}`}
                  >
                    Open {article.surface === "flavor-blog" ? "Flavor Blog" : "Beverage News"}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <article className="journal-card article-library-empty">
          <h3>{unreadOnly && favorites.length > 0 ? "You’re all caught up" : "No favorites yet"}</h3>
          <p>
            {unreadOnly && favorites.length > 0
              ? "Mark any article unread to return to it later."
              : "Bookmark an article in Flavor Blog or Beverage News and it will appear here."}
          </p>
          <div className="journal-actions">
            <a className="btn btn-primary" href="/#app/flavor-blog">Browse Flavor Blog</a>
            <a className="btn btn-light" href="/#app/beverage-news">Browse Beverage News</a>
          </div>
        </article>
      )}
    </section>
  );
}
