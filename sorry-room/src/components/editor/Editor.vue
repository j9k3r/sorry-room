<script setup lang="ts">
import { fabric } from 'fabric-all-modules';
import {onMounted, ref} from "vue";

const canvas = ref()

onMounted(() => {
    canvas.value = new fabric.Canvas('canvas', {
      width: 800,
      height: 600,
      // isDrawingMode: true
    });
    canvas.value.setOverlayColor("rgba(0,0,255,0.4)",undefined,{erasable:false});

    const rect = new fabric.Circle({ top: 10, left: 100, radius: 75, fill: "green", erasable: true })

 const imageUrl = 'https://profil.mos.ru/images/banners/bottom/dit-banner.jpg';  // Замените на вашу ссылку на изображение
  fabric.Image.fromURL(imageUrl, (img) => {
    img.scaleToWidth(200);
    canvas.value.add(img);
  });


   canvas.value.add(rect);
})

function changeAction(target: string) {
// console.log(target)
  if (target === 'erase') {
    canvas.value.freeDrawingBrush = new fabric.EraserBrush(canvas.value);
    canvas.value.freeDrawingBrush.width = 10;
    canvas.value.isDrawingMode = true;
  }
  if (target === 'select') {
    canvas.value.isDrawingMode = false;
    // const selectedObject = canvas.value.getActiveObject(); // получаем выбранный объект
    //   selectedObject.setControlsVisibility({
    //     mt: true, // включаем контроллер поворота
    //   });
  }

  // if (target = 'brush') {
    // canvas.value.isDrawingMode = true;
    // canvas.value.freeDrawingBrush = new fabric.PencilBrush(canvas.value);
    // canvas.value.freeDrawingBrush.color = "#ffffff"; // установка цвета ластика (белый)
    // canvas.value.freeDrawingBrush.width = 20; // установка ширины линии, например
    // canvas.value.freeDrawingBrush.globalCompositeOperation = 'destination-out'; // установка эффекта стирания
  // }
}
</script>

<template>
<section>
  <header>
    <div class="controls">
      <button id="select" type="button" @click="changeAction('select')">select</button>
      <button id="erase" type="button" @click="changeAction('erase')">erase</button>
    </div>
  </header>
  <div class="body">
    <canvas id="canvas"></canvas>
  </div>
  <footer></footer>
</section>
</template>

<style scoped>

</style>