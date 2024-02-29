<script setup lang="ts">

import {useEditorStore} from "@/stores/editor";
import {ref} from "vue";
import {fabric} from "fabric-all-modules";

const props = defineProps({
  fabricWrap: Object
})

const editorStore = useEditorStore();
const backgroundFileInput = ref(null)
function uploadImage(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const imgUrl = event.target.result;
    const newBackground = {src: imgUrl, title: 'Новый фон'};
    editorStore.backgrounds.push(newBackground);
  };
  reader.readAsDataURL(file);
  backgroundFileInput.value.reset();
}

function setBackgroundImage(image, canvas, index) {
  fabric.Image.fromURL(image, function(img) {
    // Устанавливаем размер изображения равным размеру Canvas
    // img.scaleToWidth(canvas.width);
    // img.scaleToHeight(canvas.height);

    editorStore.canvasOption.width = img.width;
    editorStore.canvasOption.height = img.height;
    // Добавляем изображение в Canvas в качестве заднего фона
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    editorStore.selectedBackground = index
    // editorStore.canvasOption.backgroundImg = img

      // const backgroundImage = canvas.backgroundImage;
      // const width = backgroundImage.width;
      // const height = backgroundImage.height;
      // console.log('Ширина изображения:', width);
      // console.log('Высота изображения:', height);
  });
}
</script>

<template>
<div>
  <v-file-input
    ref="backgroundFileInput"
    label="Add background file"
    placeholder="Select your file"
    accept="image/png, image/jpeg, image/bmp"
    density="compact"
    @change="uploadImage($event)"
  ></v-file-input>
  <v-card
    class="mx-auto"
    max-width="425"
    v-for="(item, index) in editorStore.backgrounds" :key="index"
  >
    <v-list-item :class="editorStore.selectedBackground === index ? 'border' : ''">
     <template v-slot:title class="bg-cyan-darken-1">
       <div>
        index: {{ index }}
       </div>
     </template>
     <template v-slot:prepend>
       <v-icon>
          <img :src="item.src" width="50px" @click="setBackgroundImage(item.src, props.fabricWrap.canvas, index)">
       </v-icon>
     </template>
      <template v-slot:subtitle>
        <v-text-field label="Background Name" v-model="editorStore.backgrounds[index].title"></v-text-field>
      </template>
    </v-list-item>
  </v-card>
</div>
</template>

<style scoped>
.border {
  border: 2px dashed orange !important;
}

</style>