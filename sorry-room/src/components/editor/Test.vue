<script setup lang="ts">
import { fabric } from 'fabric-all-modules';
import {onMounted, reactive, ref} from "vue";

// const canvas = ref(null);
// let rect = null; // переменная для объекта
const state = reactive({
  canvas: null,
  rect: null
});

onMounted(() => {
// Инициализация canvas
//   canvas.value = new fabric.Canvas('canvas', {
//     width: 800,
//     height: 600,
//   });
  state.canvas = new fabric.Canvas("canvas");

  // Создаем объект
  state.rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "red",
    width: 100,
    height: 100,
    borderColor: 'blue',
    cornerColor: 'green',
    cornerSize: 6,
    transparentCorners: false,
    selectable: true
  });



  // Добавляем объект на canvas
  state.canvas.add(state.rect);
});

</script>

<template>
  <div class="body">
    <div>
    </div>
<!--    <canvas id="canvas"></canvas>-->
    <canvas id="canvas" ref="canvas" width="800" height="600"></canvas>
  </div>
</template>

<style scoped>

</style>