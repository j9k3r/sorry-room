<script setup lang="ts">
import { fabric } from 'fabric-all-modules';
import {onMounted, reactive, ref} from "vue";
import {useEditorStore} from "@/stores/editor";
import Layers from "@/components/editor/Layers.vue";
import Tools from "@/components/editor/Tools.vue";

const fabricWrap = {
  canvas: null,
};

const editorStore = useEditorStore();

// Ваш код onMounted
onMounted(() => {
  fabricWrap.canvas = new fabric.Canvas('canvas', {
    width: 800,
    height: 600
  });

  // const imageUrl = 'https://profil.mos.ru/images/banners/bottom/dit-banner.jpg';
  const imageUrl = 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg';
  // loadImageToSessionStorageAndAddToCanvas(imageUrl); // загрузка изображения и добавление в canvas
  fabric.Image.fromURL(imageUrl, (img) => {
    img.scaleToWidth(200);
    const ob = {layer: img, desc: 'img1'}
    editorStore.layers.push(ob);
    editorStore.updateCanvas(fabricWrap.canvas); // обновляем canvas после добавления изображения
  });

  const rect = new fabric.Circle({ top: 10, left: 100, radius: 75, fill: "green", erasable: true });
  const ob = { layer: rect, desc: 'figure1'}
  editorStore.layers.push(ob);
  // editorStore.layers.push(rect);
  editorStore.updateCanvas(fabricWrap.canvas); // обновляем canvas после добавления прямоугольника
});


// function loadImageToSessionStorageAndAddToCanvas(url) {
//   // Load image
//   const image = new Image();
//   image.crossOrigin = 'Anonymous'; // Устанавливаем настройку для кросс-доменных запросов
//   image.onload = () => {
//     // Создаем временный canvas для обработки изображения
//     const tempCanvas = document.createElement('canvas');
//     const tempContext = tempCanvas.getContext('2d');
//     tempCanvas.width = 200;
//     tempCanvas.height = (image.height / image.width) * tempCanvas.width;
//     tempContext.drawImage(image, 0, 0, tempCanvas.width, tempCanvas.height);
//
//     // Получаем data URL изображения
//     const dataURL = tempCanvas.toDataURL('image/png');
//
//     // Сохраняем data URL в sessionStorage
//     sessionStorage.setItem('loadedImage', dataURL);
//
//     // Добавляем изображение на canvas
//     fabric.Image.fromURL(dataURL, (img) => {
//       img.scaleToWidth(200);
//       fabricWrap.canvas.add(img);
//     });
//   };
//   image.src = url;
// }



</script>

<template>
<section>
  <header>
    <tools :fabricWrap="fabricWrap"></tools>
  </header>
  <div class="body">
    <canvas id="canvas"></canvas>
    <layers :fabricWrap="fabricWrap"></layers>
  </div>
  <footer></footer>
</section>
</template>

<style scoped>

</style>