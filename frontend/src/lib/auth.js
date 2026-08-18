export const TOKEN_KEY = "vote_token";
export const EMAIL_KEY = "vote_email";
export const DISPLAY_NAME_KEY = "vote_display_name";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setEmail(email) {
  localStorage.setItem(EMAIL_KEY, email);
}

export function getEmail() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(EMAIL_KEY);
}

export function setDisplayName(name) {
  localStorage.setItem(DISPLAY_NAME_KEY, name);
}

export function getDisplayName() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(DISPLAY_NAME_KEY);
}
