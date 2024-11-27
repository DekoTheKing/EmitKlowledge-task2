<template>
    <div>
      <button @click="$router.back()">Back</button>
      <div v-if="loading">
        <p>Loading post details...</p>
      </div>
      <div v-else-if="post">
        <h2>{{ post.title }}</h2>
        <p v-if="post.url"><a :href="post.url" target="_blank">Read Full Article</a></p>
        <p>By: {{ post.author }} | Points: {{ post.points }}</p>
        <h3>Comments</h3>
        <ul>
          <li v-for="comment in post.children" :key="comment.id" v-html="comment.text"></li>
        </ul>
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
        loading: false,
        error: null,
      };
    },
    async created() {
      this.fetchPostDetails();
    },
    methods: {
      async fetchPostDetails() {
        this.loading = true;
        const id = this.$route.params.id; // Get post ID from the URL
        try {
          const response = await api.get(`/items/${id}`);
          this.post = response.data;
        } catch (err) {
          this.error = 'Failed to load post details.';
        } finally {
          this.loading = false;
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
    