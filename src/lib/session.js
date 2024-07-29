// $lib/session.js
export function setAuthToken(token) {
  console.log('Setting token in localStorage:', token);
  localStorage.setItem('token', token);
}

export function getAuthToken() {
  return localStorage.getItem('token');
}

export function removeAuthToken() {
  localStorage.removeItem('token');
}
