<script setup lang="ts">
import { fabric } from 'fabric-all-modules';
import {onMounted, reactive, ref} from "vue";

const fabricWrap = reactive({
  canvas: null,
  layers: [],
  rect: null,
  img: null
})

onMounted(() => {
    fabricWrap.canvas = new fabric.Canvas('canvas', {
      width: 800,
      height: 600,
      // isDrawingMode: true
    });
    fabricWrap.canvas.setOverlayColor("rgba(0,0,255,0.4)",undefined,{erasable:false});

    fabricWrap.rect = new fabric.Circle({ top: 10, left: 100, radius: 75, fill: "green", erasable: true })

 const imageUrl = 'https://profil.mos.ru/images/banners/bottom/dit-banner.jpg';  // Замените на вашу ссылку на изображение
  fabric.Image.fromURL(imageUrl, (img) => {
    img.scaleToWidth(200);
    fabricWrap.img = img; // сохраняем изображение в fabricWrap.img
    fabricWrap.canvas.add(fabricWrap.img); // добавляем изображение с fabricWrap.img в canvas
  });


   fabricWrap.canvas.add(fabricWrap.rect);
})

function changeAction(target: string) {
// console.log(target)
  if (target === 'erase') {
    fabricWrap.canvas.freeDrawingBrush = new fabric.EraserBrush(fabricWrap.canvas);
    fabricWrap.canvas.freeDrawingBrush.width = 10;
    fabricWrap.canvas.isDrawingMode = true;
  }
  if (target === 'select') {
    fabricWrap.canvas.isDrawingMode = false;
    // const selectedObject = fabricWrap.canvas.getActiveObject(); // получаем выбранный объект
    //   selectedObject.setControlsVisibility({
    //     mt: true, // включаем контроллер поворота
    //   });
  }

  // if (target = 'brush') {
    // fabricWrap.canvas.isDrawingMode = true;
    // fabricWrap.canvas.freeDrawingBrush = new fabric.PencilBrush(fabricWrap.canvas);
    // fabricWrap.canvas.freeDrawingBrush.color = "#ffffff"; // установка цвета ластика (белый)
    // fabricWrap.canvas.freeDrawingBrush.width = 20; // установка ширины линии, например
    // fabricWrap.canvas.freeDrawingBrush.globalCompositeOperation = 'destination-out'; // установка эффекта стирания
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