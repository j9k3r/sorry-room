<script setup lang="ts">

</script>

<template>
  <header>
    This header
    <nav>
      <ul>
        <li><router-link :to="{'name':'home'}">home</router-link></li>
        <li><router-link :to="{'name':'about'}">about</router-link></li>
        <li><router-link :to="{'name':'editor'}">editor</router-link></li>
        <li><router-link :to="{'name':'test'}">test</router-link></li>
      </ul>
    </nav>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    This footer
  </footer>

</template>

<style scoped>
</style>
