<!-- Navbar.svelte -->
<script>
    import { writable } from 'svelte/store';
  
    let showMenu = writable(false);
  
    function toggleMenu() {
      showMenu.update(show => !show);
    }
  
    function updateTheme(event) {
      const theme = event.target.value;
      document.documentElement.setAttribute('data-theme', theme);
    }
  </script>
  
  <main class="bg-gradient-to-b from-red-600 via-purple-600 to-blue-600 text-white font-sans min-h-screen flex flex-col">
    <!-- Navigation Bar -->
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc7nhQwcP4lxLt4y1hH9LS1N2LA0qKYtEPAQ&s" class="h-8" alt="Svelte Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Svelte</span>
        </a>
        <button on:click={toggleMenu} data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded={$showMenu}>
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/sentimentanalysis" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sentiment Analysis</a>
            </li>
            <li>
              <a href="/weatherprediction" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Weather Prediction</a>
            </li>
            <li>
              <a href="/yolov8" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">YOLOv8 Detection</a>
            </li>
            <!-- Theme Dropdown -->
            <li class="relative">
              <button id="themeDropdown" class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent" on:click={toggleMenu}>
                Theme
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <div class:show={$showMenu} class="absolute z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="themeDropdown">
                  <li>
                    <button value="light" class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" on:click={updateTheme}>Light</button>
                  </li>
                  <li>
                    <button value="grey" class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" on:click={updateTheme}>Grey</button>
                  </li>
                  <li>
                    <button value="black" class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" on:click={updateTheme}>Black</button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
    <!-- Page Content -->
    <div class="flex-grow bg-white text-gray-800 px-4 py-8 flex justify-center items-center">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Your page content goes here -->
      </div>
    </div>
  </main>
  
  <style>
    :root[data-theme='light'] {
      --bg-color: #ffffff;
      --text-color: #000000;
      --navbar-bg-color: #ffffff;
      --navbar-text-color: #000000;
    }
  
    :root[data-theme='grey'] {
      --bg-color: #e0e0e0;
      --text-color: #333333;
      --navbar-bg-color: #e0e0e0;
      --navbar-text-color: #333333;
    }
  
    :root[data-theme='black'] {
      --bg-color: #000000;
      --text-color: #ffffff;
      --navbar-bg-color: #000000;
      --navbar-text-color: #ffffff;
    }
  
    main {
      background-color: var(--bg-color);
      color: var(--text-color);
    }
  
    nav {
      background-color: var(--navbar-bg-color);
      color: var(--navbar-text-color);
    }
  
    .show {
      display: block;
    }
  </style>
  