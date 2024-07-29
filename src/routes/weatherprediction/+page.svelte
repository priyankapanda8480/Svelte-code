<script>
  import { writable } from 'svelte/store';

  let dateInput = '';
  let weatherResult = writable(null);
  let isLoading = false;
  let error = '';
  const SERVER_URL = 'http://localhost:5000';

  async function predictWeather() {
    try {
      isLoading = true;
      const formData = new FormData();
      formData.append('date', dateInput);

      const response = await fetch(`${SERVER_URL}/predict_weather`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Weather prediction failed');
      }

      const data = await response.json();
      weatherResult.set(data.weather);
      error = '';
    } catch (err) {
      console.error('Error predicting weather:', err);
      error = 'Failed to predict weather. Please try again later.';
    } finally {
      isLoading = false;
    }
  }

  function resetForm() {
    dateInput = '';
    weatherResult.set(null);
    error = '';
  }
  import '../+page.svelte'
</script>

<main class="bg-gradient-to-b from-red-100 via-purple-100 to-blue-100 text-black font-sans min-h-screen flex flex-col">
  <nav class="bg-white border-gray-200 dark:bg-gray-500 dark:border-gray-500">
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
        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-500">
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
  
  <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Weather Prediction</h1>

  <div class="flex flex-col items-center mb-8 space-y-4">
    
    <label for="dateInput" class="block text-lg font-semibold mb-2">Select Date:</label>
    <input type="date" id="dateInput" bind:value={dateInput} class="text-input w-96 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
     

    <button on:click={predictWeather} disabled={!dateInput || isLoading} class="btn mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-gray-400">
      {isLoading ? 'Predicting...' : 'Predict Weather'}
    </button>
    
    <button on:click={resetForm} disabled={isLoading} class=" py-2 px-4 bg-black text-white font-semibold rounded-md focus:outline-none focus:bg-gray-900 hover:bg-gray-800 transition">
      Reset
    </button>
  </div>

  {#if $weatherResult !== null}
    <div class="text-center mt-6">
      <h2 class="text-xl font-bold">Weather Prediction Result:</h2>
      <p class="text-lg mt-2">Predicted Weather: {$weatherResult}</p>
    </div>
  {/if}

  {#if error}
    <p class="mt-4 text-red-600 text-center">{error}</p>
  {/if}
</main>

<style>
  /* :global(body) {
    background: #acbf91;
  } */
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

  /* .text-white {
    color: white !important;
  }

  .no-border {
    background-color: transparent !important;
    border: none !important;
    color: white !important;
  }

  .no-border:hover {
    background-color: transparent !important;
    border: none !important;
    color: white !important;
  } */
   
</style>
