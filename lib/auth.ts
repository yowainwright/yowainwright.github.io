const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '';
const GITHUB_REDIRECT_URI = typeof window !== 'undefined'
  ? `${window.location.origin}/admin`
  : 'https://jeffry.in/admin';
const AUTH_API_URL = 'https://projects.jeffry.in/api/auth/github/callback';

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  email: string;
}

export function initiateGitHubLogin() {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: 'read:user user:email',
    state: crypto.randomUUID(),
  });

  sessionStorage.setItem('oauth_state', params.get('state')!);
  window.location.href = `https://github.com/login/oauth/authorize?${params}`;
}

export function getStoredUser(): GitHubUser | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('github_user');
  return stored ? JSON.parse(stored) : null;
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('github_token');
}

export function setAuth(user: GitHubUser, token: string) {
  localStorage.setItem('github_user', JSON.stringify(user));
  localStorage.setItem('github_token', token);
}

export function clearAuth() {
  localStorage.removeItem('github_user');
  localStorage.removeItem('github_token');
  sessionStorage.removeItem('oauth_state');
}

export function isAuthenticated(): boolean {
  return !!getStoredToken();
}

export async function handleOAuthCallback(code: string, state: string): Promise<{ user: GitHubUser; token: string }> {
  const storedState = sessionStorage.getItem('oauth_state');
  const isInvalidState = state !== storedState;

  if (isInvalidState) {
    throw new Error('Invalid OAuth state');
  }

  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  const isError = !response.ok;
  if (isError) {
    throw new Error('Failed to exchange code for token');
  }

  const data = await response.json();
  return { user: data.user, token: data.token };
}

const ALLOWED_USERS = ['yowainwright'];

export function isAllowedUser(user: GitHubUser): boolean {
  return ALLOWED_USERS.includes(user.login);
}
