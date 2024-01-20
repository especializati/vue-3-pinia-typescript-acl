<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <aside>
    <ul>
      <a href="/">Home</a>
      <a href="/contato">Contato</a>
    </ul>
  </aside>
  <RouterView />
</template>

<style scoped>
</style>
