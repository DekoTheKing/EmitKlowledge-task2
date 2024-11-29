<template>
  <div id="app">
    <header>
      <h1>Hacker News Clone</h1>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
    </header>

    <!-- This is the container for your main content -->
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style src="./assets/css/styles.css"></style>

