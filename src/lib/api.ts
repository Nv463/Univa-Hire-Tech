export async function apiFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem('univa_user') || 'null');
    } catch {
      return null;
    }
  };

  const send = (token?: string) => {
    const headers = new Headers(init.headers || {});
    if (token) headers.set('Authorization', 'Bearer ' + token);
    return fetch(input, { ...init, headers });
  };

  let stored = getStoredUser();
  let response = await send(stored?.access_token);

  if (response.status === 401 && stored?.refresh_token && !String(input).includes('/api/auth/refresh')) {
    try {
      const refreshed = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: stored.refresh_token }),
      });
      if (refreshed.ok) {
        const data = await refreshed.json();
        stored = { ...data.user, access_token: data.access_token, refresh_token: data.refresh_token };
        localStorage.setItem('univa_user', JSON.stringify(stored));
        window.dispatchEvent(new CustomEvent('univa-auth-updated', { detail: stored }));
        response = await send(stored.access_token);
      } else {
        localStorage.removeItem('univa_user');
        window.dispatchEvent(new Event('univa-auth-expired'));
      }
    } catch {
      // Keep the original response; callers display the API error.
    }
  }

  return response;
}
