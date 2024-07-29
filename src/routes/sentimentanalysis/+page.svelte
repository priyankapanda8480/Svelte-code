<script>
  import Navbar from './Navbar1.svelte';
  import { writable } from 'svelte/store';

  let textInput = '';
  let sentimentResult = writable(null);
  let isLoading = false;
  let error = '';
  const SERVER_URL = 'http://localhost:5000';

  async function analyzeSentiment() {
    try {
      isLoading = true;
      const formData = new FormData();
      formData.append('text', textInput);

      const response = await fetch(`${SERVER_URL}/predict_sentiment`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Sentiment analysis failed');
      }

      const data = await response.json();
      sentimentResult.set(data.sentiment);
      error = '';
    } catch (err) {
      console.error('Error analyzing sentiment:', err);
      error = 'Failed to analyze sentiment. Please try again later.';
    } finally {
      isLoading = false;
    }
  }

  function resetForm() {
    textInput = '';
    sentimentResult.set(null);
    error = '';
  }
   import '../+page.svelte'
</script>

<main class="bg-gradient-to-b from-red-200 via-purple-200 to-blue-200 text-black font-sans min-h-screen flex flex-col mx-auto">
  <nav class="bg-white border-gray-200 dark:bg-gray-600 dark:border-gray-500">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://svelte.dev" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc7nhQwcP4lxLt4y1hH9LS1N2LA0qKYtEPAQ&s" class="h-8" alt="Svelte Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Svelte</span>
      </a>
      <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-600 ">
          <li>
            <a href="/sentimentanalysis" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sentiment Analysis</a>
          </li>
          <li>
            <a href="/weatherprediction" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Weather Prediction</a>
          </li>
          <li>
            <a href="/yolov8" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">YOLOv8 Detection</a>
          </li>
    
        </ul>
      </div>
      </div>
  </nav>
  <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Sentiment Analysis</h1>

  <div class="bg-4e8f31 rounded-lg p-4 mb-6 text-center">
    <div class="relative mx-auto" style="max-width: 28rem;">
    <textarea
      bind:value={textInput}
      placeholder="Enter text for sentiment analysis"
      class="w-full h-40 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
      style="width: calc(100% - 2rem);"
    ></textarea>
    </div>
    <button on:click={analyzeSentiment} disabled={!textInput || isLoading} class="btn">
      {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
    </button>
    <button on:click={resetForm} disabled={isLoading} class="btn">
      Reset
    </button>
  </div>

  {#if $sentimentResult}
  <div class="text-center">
    <h2 class="text-xl font-bold mt-4">Analysis Result:</h2>
    <p class="text-lg mt-2">Sentiment: {$sentimentResult}</p>
  </div>
  {/if}

  {#if error}
  <p class="mt-4 text-red-700">{error}</p>
  {/if}
</main>

<style>
  .container {
    max-width: 600px;
  }

  .btn {
    padding: 10px 20px;
    background-color: #424040;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  .btn:hover:not(:disabled) {
    background-color: #45a049;
  }
</style>
