<template>
  <div>
    <input
      type="text"
      placeholder="Search posts..."
      v-model="searchQuery"
      @input="searchPosts"
    />
    <div v-if="loading">Loading top posts...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>
    <p v-if="!loading && posts.length === 0 && !error">No posts available.</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      posts: [],
      query: '',
      loading: false,
      error: null,
    };
  },
  async created() {
    this.fetchTopPosts();
  },
  methods: {
    async fetchTopPosts() {
  this.loading = true;
  try {
    // Fetch the top story IDs
    const response = await api.get('/topstories.json'); 
    console.log('Top story IDs:', response.data); // Debug log to verify IDs
    
    const topPostIds = response.data.slice(0, 20); // Get the first 20 post IDs
    const postPromises = topPostIds.map((id) => api.get(`/item/${id}.json`));
    
    // Fetch post details concurrently
    const postResults = await Promise.all(postPromises);
    this.posts = postResults.map((result) => result.data);
    
    console.log('Top posts:', this.posts); // Debug log to verify posts
  } catch (err) {
    console.error('Error fetching top posts:', err); // Log detailed error
    this.error = 'Failed to fetch top posts.';
  } finally {
    this.loading = false;
  }
},
    async searchPosts() {
      if (!this.query.trim()) return;
      this.loading = true;
      try {
        const response = await fetch(
          `https://hn.algolia.com/api/v1/search?query=${this.query}`
        );
        const data = await response.json();
        this.posts = data.hits; // The search results
      } catch (err) {
        this.error = 'Failed to fetch search results.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 400px;
}
button {
  padding: 0.5rem;
  margin-left: 0.5rem;
}
.error {
  color: red;
}
</style>
