<template>
  <div id="app">
    <header>
      <h1>Hacker News Clone</h1>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
header {
  text-align: center;
  padding: 1rem;
  background-color: #ff6600;
  color: white;
}
nav {
  margin-top: 1rem;
}
nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: white;
}
</style>
