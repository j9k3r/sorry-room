<script setup lang="ts">
import { fabric } from 'fabric-all-modules';
import {onMounted, reactive, ref} from "vue";
import {useEditorStore} from "@/stores/editor";

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
const changeAction = (target) => {
  if (target === 'erase') {
    fabricWrap.canvas.freeDrawingBrush = new fabric.EraserBrush(fabricWrap.canvas);
    fabricWrap.canvas.freeDrawingBrush.width = 10;
    fabricWrap.canvas.isDrawingMode = true;
  }
  if (target === 'select') {
    fabricWrap.canvas.isDrawingMode = false;
  }
}

function getThumbnail(object) {

  getThumbnailAsDataURL(object)
  .then((dataURL) => {
    console.log(dataURL)
    // Далее вы можете использовать dataURL для отображения или сохранения миниатюры
  })
  .catch((error) => {
    console.error(error);
});

  // const img = object._element; // Получаем оригинальный элемент изображения из объекта Proxy
  // if (img) {
  //   const tempCanvas = document.createElement('canvas');
  //   const tempContext = tempCanvas.getContext('2d');
  //   tempCanvas.width = 50;
  //   tempCanvas.height = 50;
  //
  //   tempContext.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
  //   const dataURL = tempCanvas.toDataURL('image/png');
  //   return dataURL; // Возвращаем data URL изображения
  // } else {
  //   throw new Error('Failed to get image');
  // }
}

function getThumbnailAsDataURL(object) {

  return new Promise((resolve, reject) => {
    if (object.type !== 'circle') {
      console.log(object)
      // Создаем временный canvas
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');
      tempCanvas.width = 50;  // Ширина миниатюры
      tempCanvas.height = 50;  // Высота миниатюры

      // Клонируем объект и масштабируем его
      const cloneObj = object.clone();
      // Масштабируем объект
      // cloneObj.scale(50 / cloneObj.width, 50 / cloneObj.height);
      cloneObj.set({
        scaleX: 0.5,  // Масштаб по оси X
        scaleY: 0.5   // Масштаб по оси Y
      });
      const svg = cloneObj.toSVG(); // Получаем SVG представление объекта

      // Создаем изображение в формате data URL из SVG
      const img = new Image();
      img.onload = function () {
        tempContext.drawImage(img, 0, 0, 50, 50);  // Рисуем изображение на canvas
        const dataURL = tempCanvas.toDataURL('image/png');  // Получаем data URL изображения
        resolve(dataURL);  // Возвращаем data URL
      };
      img.onerror = function () {
        reject(new Error('Failed to create thumbnail'));
      };
      img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svg);  // Создаем изображение из SVG
    }
  });
}


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
    <div class="controls">
      <button id="select" type="button" @click="changeAction('select')">select</button>
      <button id="erase" type="button" @click="changeAction('erase')">erase</button>
      <button id="delete" type="button" @click="editorStore.removeSelectedObject(fabricWrap.canvas)">delete selected</button>
    </div>
  </header>
  <div class="body">
    <canvas id="canvas"></canvas>
    <section>
      <div v-for="(item, index) in editorStore.layers" :key="index">
        <div style="color: red">{{ item.desc }}
          <img :src="getThumbnail(item.layer)">
<!--          <img :src="getThumbnail(item.layer)" alt="thumbnail" @click="selectObject(item.layer)">-->
<!--          <p>{{ item.layer.type }}</p>-->
          <button @click="editorStore.moveLayerUp(index, fabricWrap.canvas)">up</button>
          <button @click="editorStore.moveLayerDown(index, fabricWrap.canvas)">down</button>
        </div>
      </div>
    </section>
  </div>
  <footer></footer>
</section>
</template>

<style scoped>

</style>