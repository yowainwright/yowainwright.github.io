import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useAuth } from "../hooks/useAuth";
import {
  subscribeToAllAnalytics,
  type AnalyticsData,
} from "../lib/analytics-firebase";

interface Totals {
  views: number;
  shares: number;
  comments: number;
  loves: number;
}

const Admin = () => {
  const { user, loading, error, isAuthenticated, login, logout } = useAuth();
  const [analytics, setAnalytics] = useState<Record<string, AnalyticsData>>({});
  const [totals, setTotals] = useState<Totals>({
    views: 0,
    shares: 0,
    comments: 0,
    loves: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubscribe = subscribeToAllAnalytics((data) => {
      setAnalytics(data);

      const newTotals = Object.values(data).reduce(
        (acc, item) => ({
          views: acc.views + item.views,
          shares: acc.shares + item.shares,
          comments: acc.comments + item.comments,
          loves: acc.loves + item.loves,
        }),
        { views: 0, shares: 0, comments: 0, loves: 0 },
      );
      setTotals(newTotals);
    });

    return unsubscribe;
  }, [isAuthenticated]);

  const sortedAnalytics = Object.values(analytics).sort(
    (a, b) => b.views - a.views,
  );

  if (loading) {
    return (
      <div className="admin">
        <Head>
          <title>Admin | Jeffry.in</title>
        </Head>
        <div className="admin__loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin">
        <Head>
          <title>Admin | Jeffry.in</title>
        </Head>
        <div className="admin__error">
          <p>{error}</p>
          <button onClick={login} className="admin__button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin">
        <Head>
          <title>Admin | Jeffry.in</title>
        </Head>
        <div className="admin__login">
          <h1>Admin Dashboard</h1>
          <p>Sign in with GitHub to view analytics.</p>
          <button
            onClick={login}
            className="admin__button admin__button--primary"
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <Head>
        <title>Admin | Jeffry.in</title>
      </Head>

      <header className="admin__header">
        <h1>jeffry.in Admin</h1>
        <div className="admin__user">
          <img
            src={user?.avatar_url}
            alt={user?.name}
            className="admin__avatar"
          />
          <span>{user?.name || user?.login}</span>
          <button onClick={logout} className="admin__button">
            Logout
          </button>
        </div>
      </header>

      <section className="admin__stats">
        <div className="admin__stat">
          <span className="admin__stat-value">
            {totals.views.toLocaleString()}
          </span>
          <span className="admin__stat-label">Views</span>
        </div>
        <div className="admin__stat">
          <span className="admin__stat-value">
            {totals.shares.toLocaleString()}
          </span>
          <span className="admin__stat-label">Shares</span>
        </div>
        <div className="admin__stat">
          <span className="admin__stat-value">
            {totals.comments.toLocaleString()}
          </span>
          <span className="admin__stat-label">Comments</span>
        </div>
        <div className="admin__stat">
          <span className="admin__stat-value">
            {totals.loves.toLocaleString()}
          </span>
          <span className="admin__stat-label">Loves</span>
        </div>
      </section>

      <section className="admin__table-container">
        <table className="admin__table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Views</th>
              <th>Shares</th>
              <th>Comments</th>
              <th>Loves</th>
            </tr>
          </thead>
          <tbody>
            {sortedAnalytics.map((item) => (
              <tr key={item.slug}>
                <td>
                  <a
                    href={`/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    /
                    {item.slug.length > 30
                      ? `${item.slug.slice(0, 30)}...`
                      : item.slug}
                  </a>
                </td>
                <td>{item.views.toLocaleString()}</td>
                <td>{item.shares.toLocaleString()}</td>
                <td>{item.comments.toLocaleString()}</td>
                <td>{item.loves.toLocaleString()}</td>
              </tr>
            ))}
            {sortedAnalytics.length === 0 && (
              <tr>
                <td colSpan={5} className="admin__empty">
                  No analytics data yet. Views will appear as users visit posts.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
