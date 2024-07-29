<script>
  import Navbar from './Navbar.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { getAuthToken } from '$lib/session';

  let selectedFiles = [];
  let imageUrls = writable([]);
  let objectCounts = writable({});
  let isLoading = false;
  let error = '';
  let barChartContainer;
  let doughnutChartContainer;
  let Plotly;
  const SERVER_URL = 'http://localhost:5000';

  let showMenu = writable(false);

  async function uploadImages() {
    try {
      isLoading = true;
      const formData = new FormData();
      selectedFiles.forEach(({ file }) => formData.append('images', file));
      const token = getAuthToken();

      const response = await fetch(`${SERVER_URL}/upload_multiple`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
  }
});

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      imageUrls.set(data.annotated_images);
      objectCounts.set(data.object_counts || {});
      error = '';
      drawCharts(data.object_counts);
    } catch (err) {
      console.error('Error uploading images:', err);
      error = 'Failed to upload images. Please try again later.';
    } finally {
      isLoading = false;
    }
  }

  function triggerFileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.style.display = 'none';
    input.onchange = (event) => {
      if (event.target.files.length > 0) {
        Array.from(event.target.files).forEach(file => {
          const fileUrl = URL.createObjectURL(file);
          selectedFiles = [...selectedFiles, { file, fileUrl }];
        });
      }
    };
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }

  function toggleMenu() {
    $showMenu = !$showMenu; // Assuming $showMenu is a writable store
  }

  function resetForm() {
    selectedFiles = [];
    imageUrls.set([]);
    objectCounts.set({});
    error = '';
  }

  function drawCharts(data) {
    drawBarChart(data);
    drawDoughnutChart(data);
  }
  // async function drawCharts(data) {
  //   await drawBarChart(data);
  //   await drawDoughnutChart(data);
  // }
  async function drawBarChart(data) {
    if (!Plotly) {
      Plotly = await import('plotly.js-dist');
    }

    const trace = {
      x: Object.keys(data),
      y: Object.values(data),
      type: 'bar',
      marker: {
        color: 'orange'
      }
    };

    const layout = {
      title: 'Object Detection Counts',
      xaxis: {
        title: 'Object Class'
      },
      yaxis: {
        title: 'Count'
      }
    };

    Plotly.newPlot(barChartContainer, [trace], layout);
  }
  async function drawDoughnutChart(data) {
    if (!Plotly) {
      Plotly = await import('plotly.js-dist');
    }

    const trace = {
      labels: Object.keys(data),
      values: Object.values(data),
      type: 'pie',
      hole: 0.4,
      marker: {
        colors: ['blue', 'green', 'red', 'purple', 'orange']
      }
    };

    const layout = {
      title: 'Object Distribution'
    };

    Plotly.newPlot(doughnutChartContainer, [trace], layout);
  }


  onMount(() => {
    imageUrls.subscribe(value => {
      if (value.length > 0) {
        console.log('Annotated Image URLs:', value);
        // drawCharts(objectCounts);
      }
    });
  });
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
  

  <h1 class="text-4xl font-bold text-center mb-6">Object Detection with YOLOv8</h1>

  <div class="flex flex-col items-center">
    <div class="input-container mb-4 w-full max-w-xs">
      <label for="file-upload" class="block text-lg font-semibold text-gray-700 mb-2">Upload images:</label>
      <div class="flex flex-wrap gap-2">
        {#each selectedFiles as { fileUrl }, index}
          <div class="relative">
            <img src={fileUrl} alt={`Selected Image ${index + 1}`} class="w-24 h-24 object-cover rounded-md shadow-md" />
          </div>
        {/each}
      </div>
      <button
        on:click={triggerFileInput}
        class="block w-full p-3 border border-dashed border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-2 text-center text-gray-500 hover:bg-gray-100 transition cursor-pointer"
      >
        + Add Images
      </button>
    </div>
    <div class="flex space-x-4">
      <button
        on:click={uploadImages}
        disabled={selectedFiles.length === 0 || isLoading}
        class="mt-4 py-2 px-4 bg-black text-white font-semibold rounded-md focus:outline-none focus:bg-gray-900 disabled:opacity-50 hover:bg-gray-800 transition"
      >
        {isLoading ? 'Uploading...' : 'Upload Images'}
      </button>
      <button
        on:click={resetForm}
        class="mt-4 py-2 px-4 bg-black text-white font-semibold rounded-md focus:outline-none focus:bg-gray-900 hover:bg-gray-800 transition"
      >
        Reset
      </button>
    </div>

    {#if $imageUrls.length > 0}
      <div class="result-container mt-6 max-h-96 overflow-y-auto w-full max-w-lg">
        <h2 class="text-xl font-bold text-gray-800">Detection Results:</h2>
        {#each $imageUrls as imageUrl}
          <img src={imageUrl} alt="Annotated Image" class="mt-4 border rounded-lg shadow-lg w-full" />
        {/each}
      </div>
    {/if}

    {#if error}
      <p class="mt-4 text-red-700">{error}</p>
    {/if}
    {#if Object.keys($objectCounts).length > 0}
        <div class="mt-6">
          <h2 class="text-xl font-bold">Object Counts:</h2>
          <ul>
            {#each Object.entries($objectCounts) as [classId, count]}
              <li>{classId}: {count}</li>
            {/each}
          </ul>

          <div bind:this={barChartContainer} class="bar-chart mt-6"></div>
          <div bind:this={doughnutChartContainer} class="doughnut-chart mt-8"></div>
        </div>
        {/if}

        {#if error}
        <p class="mt-4 text-red-700">{error}</p>
        {/if}
  </div>

</main>

<style>
  .file-input {
    /* Add any custom styling for your file input if needed */
  }
  .result-container img {
    max-height: 8rem;
  }
  .bar-chart, .doughnut-chart {
    width: 500px;
    height: 300px;
  }
</style>
