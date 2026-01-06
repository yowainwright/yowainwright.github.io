import { useState, useEffect, useCallback } from "react";
import * as Sentry from "@sentry/nextjs";
import {
  getStoredUser,
  getStoredToken,
  setAuth,
  clearAuth,
  initiateGitHubLogin,
  handleOAuthCallback,
  isAllowedUser,
  type GitHubUser,
} from "../lib/auth";

export function useAuth() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");

      if (code && state) {
        try {
          const { user: authUser, token: authToken } =
            await handleOAuthCallback(code, state);

          if (!isAllowedUser(authUser)) {
            setError(
              "Access denied. You are not authorized to view this page.",
            );
            clearAuth();
            setLoading(false);
            window.history.replaceState({}, "", "/admin");
            return;
          }

          setAuth(authUser, authToken);
          setUser(authUser);
          setToken(authToken);
          window.history.replaceState({}, "", "/admin");
        } catch (err) {
          setError("Failed to authenticate with GitHub");
          Sentry.captureException(err);
        }
        setLoading(false);
        return;
      }

      const storedUser = getStoredUser();
      const storedToken = getStoredToken();

      if (storedUser && storedToken) {
        if (!isAllowedUser(storedUser)) {
          clearAuth();
          setLoading(false);
          return;
        }
        setUser(storedUser);
        setToken(storedToken);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(() => {
    initiateGitHubLogin();
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    setToken(null);
    setError(null);
  }, []);

  const isAuthenticated = Boolean(token && user);

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
  };
}
