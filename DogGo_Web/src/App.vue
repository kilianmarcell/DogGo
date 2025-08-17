<template>
  <div id="page">
    <Header/>
    <div id="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue'

export default {
  name: 'App',
  
  components: {
    Header
  }
}
</script>

<style>
/* Fő CSS fájl importálása */
@import './assets/styles/main.css';
</style>
