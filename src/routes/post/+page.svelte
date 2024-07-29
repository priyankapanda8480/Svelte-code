<script>
  import { onMount } from 'svelte';

  let posts = [];
  let error = null;

  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`  // Ensure token is sent
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      posts = await response.json();
    } catch (err) {
      error = err.message;
      console.error('Error fetching posts:', err);
    }
  }

  onMount(() => {
    fetchPosts();
  });
</script>

<template>
  {#if error}
    <p>Error fetching posts: {error}</p>
  {/if}
  {#if posts.length}
    <ul>
      {#each posts as post}
        <li>{post.title}</li>
      {/each}
    </ul>
  {/if}
</template>
