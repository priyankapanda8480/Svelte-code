<script>
  import { onMount } from 'svelte';
  import { getAuthToken, removeAuthToken } from '$lib/session'; 

  let user = null;
  let errorMessage = '';
  let profilePicUrl = '';
  let fileInput;

  const SERVER_URL = 'http://localhost:5000';

  async function fetchProfile(serverUrl = SERVER_URL) {
    try {
      console.log('Fetching profile...');
      const token = getAuthToken(); 
      console.log('Token of profile page:', token);

      const response = await fetch(`${serverUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      user = await response.json();
      profilePicUrl = user.profilePicUrl || '';
      console.log('User:', user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      errorMessage = 'Failed to load profile. Please try again later.';
    }
  }

  async function handleProfilePicUpload(event) {
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const token = getAuthToken();
      const response = await fetch(`${SERVER_URL}/upload-profile-pic`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      const result = await response.json();
      profilePicUrl = result.profilePicUrl;
      user.profilePicUrl = result.profilePicUrl;
    } catch (error) {
      errorMessage = 'Failed to upload profile picture. Please try again later.';
    }
  }

  async function handleLogout() {
    try {
      console.log('Logging out...');

      const token = getAuthToken(); 

      const response = await fetch(`${SERVER_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      removeAuthToken(); 
      window.location.href = '/login'; 
    } catch (error) {
      console.error('Error logging out:', error);
      errorMessage = 'Failed to log out. Please try again later.';
    }
  }

  onMount(async () => {
    try {
      await fetchProfile();
    } catch (error) {
      console.error('Error during onMount:', error);
    }
  });
</script>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .left-panel {
    flex: 1;
    background-color: #3498db; 
    display: grid;
    place-content: center;
    text-align: center;
    padding: 120px;
  }

  .right-panel {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f4f6;
    padding: 20px;
  }

  main {
    max-width: 100%;
    width: 90%;
    max-width: 600px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .profile-pic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  .upload-form {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  .upload-input {
    margin-right: 12px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
  }

  .upload-button {
    background-color: #445624;
  }
</style>

<main>
  <div class="container">
    <div class="left-panel">
      <h1>Profile</h1>
      {#if errorMessage}
        <p>{errorMessage}</p>
      {/if}
      {#if user}
        <img class="profile-pic" src={profilePicUrl} alt="Profile Picture">
        <p>Username: {user.username}</p>
        <p>Fullname: {user.fullname}</p>
        <form class="upload-form" on:submit|preventDefault={handleProfilePicUpload}>
          <input type="file" bind:this={fileInput} class="upload-input">
          <button type="submit" class="upload-button">Upload</button>
        </form>
      {/if}
    </div>
    <div class="right-panel">
      <button on:click={handleLogout}>Logout</button>
    </div>
  </div>
</main>
