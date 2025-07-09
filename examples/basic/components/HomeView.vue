<script>
export default {
  name: 'HomeView',
};
</script>

<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <p>This is the home page of our Vue application.</p>
    <router-link to="/article/1">Go to Article 1</router-link>
    <br />
    <router-link to="/late">Go to late loading element</router-link>
  </div>
</template>
