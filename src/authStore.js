// authStore.js

import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);

export function login() {
  // Simulated login logic
  localStorage.setItem('isLoggedIn', 'true');
  isAuthenticated.set(true);
}

export function logout() {
  // Simulated logout logic
  localStorage.removeItem('isLoggedIn');
  isAuthenticated.set(false);
}
