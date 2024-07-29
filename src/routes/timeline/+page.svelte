<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let posts = writable([]);

  onMount(async () => {
      await fetchPosts();
  });

  async function fetchPosts() {
      try {
          console.log('Fetching posts...');
          const token = localStorage.getItem('token');
          const response = await fetch('http://127.0.0.1:5000/api/timeline', {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          if (!response.ok) {
              throw new Error('Failed to fetch posts');
          }
          const postsData = await response.json();
          posts.set(postsData);
          console.log('Posts fetched:', postsData);
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  }
</script>

<style>
  .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      max-width: 800px;
      margin: auto;
  }

  .post {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      width: 100%;
      margin-bottom: 20px;
  }

  .post h2 {
      font-size: 24px;
      margin-bottom: 10px;
  }

  .post p {
      font-size: 16px;
      margin-bottom: 10px;
  }

  .no-posts {
      font-size: 18px;
      color: #888888;
  }
</style>

<div class="container">
  {#if $posts.length > 0}
      {#each $posts as post}
          <div class="post">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
          </div>
      {/each}
  {:else}
      <p class="no-posts">No posts found</p>
  {/if}
</div>
