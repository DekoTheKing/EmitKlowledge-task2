<template>
  <div>
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        v-model="query"
      />
      <button @click="searchPosts">Search</button>
    </div>
    <div v-if="loading">Loading...</div>
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
        const response = await api.get('/topstories.json');
        const topPostIds = response.data.slice(0, 20);
        const postPromises = topPostIds.map((id) => api.get(`/item/${id}.json`));
        const postResults = await Promise.all(postPromises);
        this.posts = postResults.map((result) => result.data);
      } catch (err) {
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
    this.posts = data.hits.map(hit => ({
      id: hit.objectID, // Ensure compatibility with PostDetails
      title: hit.title,
      url: hit.url,
      author: hit.author,
      points: hit.points,
    }));
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
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
