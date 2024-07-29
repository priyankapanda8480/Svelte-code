<script>
  import { setAuthToken } from '$lib/session';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let errorMessage = writable('');

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        
        console.log('Received token:', token);
        
        setAuthToken(token);
        console.log('Set token:', token);
        goto('/home');  // Redirect to the home page
      } else {
        const errorData = await response.json();
        errorMessage.set(errorData.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      errorMessage.set('Failed to login. Please try again later.');
    }
  }
</script>

<main class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
  <h1 class="text-3xl font-semibold mb-6">Login</h1>
  <form on:submit|preventDefault={handleLogin} class="space-y-4">
    <label class="block">
      <span class="text-gray-700">Email:</span>
      <input type="email" bind:value={email} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <label class="block">
      <span class="text-gray-700">Password:</span>
      <input type="password" bind:value={password} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
    {#if $errorMessage}
      <p class="text-red-500">{ $errorMessage }</p>
    {/if}
  </form>
  <div class="mt-4 text-gray-600 links">
    <p class="mt-4 text-gray-600">Don't have an account? <a href="/register" class="text-indigo-600">Register Here</a>.</p>
    <a href="/" class="text-indigo-600">Go to home page</a>
  </div>
</main>
