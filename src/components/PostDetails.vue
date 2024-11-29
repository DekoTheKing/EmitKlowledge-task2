<template>
  <div>
    <button @click="$router.back()">Back</button>
    <div v-if="loading">
      <p>Loading post details...</p>
    </div>
    <div v-else-if="post">
      <h2>{{ post.title }}</h2>
      <p v-if="post.url"><a :href="post.url" target="_blank">Read Full Article</a></p>
      <p>By: {{ post.by }} | Points: {{ post.score }}</p>
      <h3>Comments</h3>
      <ul v-if="comments.length">
        <li v-for="comment in comments" :key="comment.id" v-html="comment.text"></li>
      </ul>
      <p v-if="!comments.length">No comments available.</p>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      post: null,
      comments: [],
      loading: false,
      error: null,
    };
  },
  async created() {
    await this.fetchPostDetails();
    await this.fetchComments();
  },
  methods: {
    async fetchPostDetails() {
  this.loading = true;
  const id = this.$route.params.id; // Get post ID from the URL
  try {
    const response = await api.get(`/item/${id}.json`); // Use `/item/` (not `/items/`)
    this.post = response.data;
  } catch (err) {
    this.error = 'Failed to load post details.';
  } finally {
    this.loading = false;
      }
    },
    async fetchComments() {
      if (!this.post || !this.post.kids) return;

      try {
        const commentPromises = this.post.kids.map((id) =>
          api.get(`/item/${id}.json`)
        );
        const commentResponses = await Promise.all(commentPromises);
        this.comments = commentResponses.map((res) => res.data);
        console.log('Comments:', this.comments);
      } catch (err) {
        console.error('Error fetching comments:', err);
        this.error = 'Failed to load comments.';
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 1rem;
}
</style>
