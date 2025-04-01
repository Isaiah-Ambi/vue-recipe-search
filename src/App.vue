<script setup>

</script>

<template>
  <div id="app">
    <header>
      <h1>Recipe Finder</h1>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>Data provided by TheMealDB</p>
    </footer>
  </div>

</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #ff6b6b;
  color: white;
  padding: 1rem;
  text-align: center;
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
}

a {
  color: #ff6b6b;
  text-decoration: none;
}

nav a {
  color: white;
  margin: 0 10px;
}
</style>