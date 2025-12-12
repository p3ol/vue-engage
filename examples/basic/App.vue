<template>
  <div id="app">
    <nav>
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about/2">
        About
      </router-link> |
      <router-link to="/about/3">
        About2
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-right: 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
