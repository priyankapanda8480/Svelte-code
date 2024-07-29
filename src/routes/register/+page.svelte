<script>
  let fullname = '';
  let firstname = '';
  let lastname = '';
  let email = '';
  let country = '';
  let dateOfBirth = '';
  let username = '';
  let password = '';
  let errorMessage = '';

  async function handleRegister() {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullname, firstname, lastname, email, country, dateOfBirth, username, password })
      });

      if (response.ok) {
        // Successful registration, redirect to login page
        window.location.href = '/login'; // Change to your login page URL
      } else {
        // Registration failed, extract the error message from the response
        const errorData = await response.json();
        errorMessage = errorData.message || 'Failed to register. Please try again later.';
      }
    } catch (error) {
      console.error('Error registering:', error);
      errorMessage = 'Failed to register. Please try again later.';
    }
  }
</script>

<main class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
  <h1 class="text-3xl font-semibold mb-6">Register</h1>
  <form on:submit|preventDefault={handleRegister} class="space-y-4">
    <label class="block">
      <span class="text-gray-700">First Name:</span>
      <input type="text" bind:value={firstname} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <label class="block">
      <span class="text-gray-700">Last Name:</span>
      <input type="text" bind:value={lastname} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <label class="block">
      <span class="text-gray-700">Email:</span>
      <input type="email" bind:value={email} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <label class="block">
      <span class="text-gray-700">Country:</span>
      <input type="text" bind:value={country} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <label class="block">
      <span class="text-gray-700">Full Name:</span>
      <input type="text" bind:value={fullname} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <label class="block">
      <span class="text-gray-700">Date of Birth:</span>
      <input type="date" bind:value={dateOfBirth} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <label class="block">
      <span class="text-gray-700">Username:</span>
      <input type="text" bind:value={username} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <label class="block">
      <span class="text-gray-700">Password:</span>
      <input type="password" bind:value={password} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
    {#if errorMessage}
      <p class="text-red-500">{errorMessage}</p>
    {/if}
  </form>
  <p class="mt-4 text-gray-600">Already have an account? <a href="/login" class="text-indigo-600">Login here</a>.</p>
</main>
