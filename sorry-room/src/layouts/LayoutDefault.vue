<script setup lang="ts">

</script>

<template>
  <header>
    <v-container class="bg-blue" fluid>
      <v-row align="center">
        <v-col cols="auto">
          <v-img
            :width="200"
            aspect-ratio="4/3"
            cover
            src="images/crying_cats_1.png"
          ></v-img>
        </v-col>

        <v-col>
          <div class="text-h1 text-lime-darken-1">Sorry Room</div>
        </v-col>
      </v-row>
    </v-container>
<!--    <nav>-->
<!--      <ul>-->
<!--        <li><router-link :to="{'name':'home'}">home</router-link></li>-->
<!--        <li><router-link :to="{'name':'about'}">about</router-link></li>-->
<!--        <li><router-link :to="{'name':'editor'}">editor</router-link></li>-->
<!--        <li><router-link :to="{'name':'test'}">test</router-link></li>-->
<!--      </ul>-->
<!--    </nav>-->
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <v-container fluid>
      <v-row align="center">
        <v-col>
        </v-col>

        <v-col>
          <div class="text-center text-caption text-grey lighten-1">
            <v-icon icon="mdi-copyright"></v-icon>
            Created by sorry developer
          </div>
        </v-col>

        <v-col>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<style scoped>
</style>
