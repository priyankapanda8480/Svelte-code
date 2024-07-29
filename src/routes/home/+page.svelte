<script>
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let showMenu = writable(false);
  let title = writable('');
  let content = writable('');
  let errorMessage = writable('');

  function toggleMenu() {
    showMenu.update(current => !current);
  }

  function isAuthenticated() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  function handleNavigation() {
    if (!isAuthenticated()) {
      goto('/login');
    }
  }

  async function handleSubmit() {
    const post = {
      title: $title,
      content: $content,
    };

    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/posts', { // Ensure URL matches backend route

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      title.set('');
      content.set('');
      errorMessage.set('');
      alert('Post created successfully!');
    } else {
      const errorData = await response.json();
      errorMessage.set(errorData.message || 'Failed to create post');
    }
  }

  
  

  onMount(() => {
    handleNavigation();
  });
  import '../../app.css';
</script>

<main class="bg-gradient-to-b from-red-100 via-purple-100 to-blue-100 text-white font-sans min-h-screen flex flex-col">
  <nav class="bg-white border-gray-200 dark:bg-gray-500 dark:border-gray-500">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://svelte.dev" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc7nhQwcP4lxLt4y1hH9LS1N2LA0qKYtEPAQ&s" class="h-8" alt="Svelte Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Svelte</span>
      </a>
      <button on:click={toggleMenu} type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
      <div class:hidden={$showMenu} class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-500">
          <li>
            <a href="/sentimentanalysis" class="block py-2 px-3 text-white no-border">Sentiment Analysis</a>
          </li>
          <li>
            <a href="/weatherprediction" class="block py-2 px-3 text-white no-border">Weather Prediction</a>
          </li>
          <li>
            <a href="/yolov8" class="block py-2 px-3 text-white no-border">YOLOv8 Detection</a>
          </li>
          <li>
            <a href="/profile" class="block py-2 px-3 text-white no-border">Profile</a>
          </li>
          <li>
            <a href="/timeline" class="block py-2 px-3 text-white no-border">Timeline</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  {#if isAuthenticated()}
    <div class="flex-grow flex justify-center items-center">
      <div class="max-w-3xl mx-auto text-center bg-white text-gray-800 p-8 rounded-lg shadow-lg">
        <h1 class="text-4xl font-bold mb-4">Create a Post</h1>
        <p class="text-lg mb-4">Share your thoughts with the community.</p>
        
        {#if $errorMessage}
          <p class="text-red-500 mb-4">{$errorMessage}</p>
        {/if}

        <form on:submit|preventDefault={handleSubmit}>
          <div class="mb-4">
            <label class="block text-left mb-2 text-gray-700">Title</label>
            <input type="text" bind:value={$title} class="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <div class="mb-4">
            <label class="block text-left mb-2 text-gray-700">Content</label>
            <textarea bind:value={$content} class="w-full px-3 py-2 border rounded-lg" required></textarea>
          </div>
          <button type="submit" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Post</button>
        </form>
      </div>
    </div>
  {/if}
</main>
