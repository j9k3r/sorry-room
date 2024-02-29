<script setup lang="ts">

import imagesApi from "@/services/imagesApi";
import {ref} from "vue";
import {useEditorStore} from "@/stores/editor";
import {fabric} from "fabric-all-modules";

const props = defineProps({
  fabricWrap: Object
})

const editorStore = useEditorStore();

const templateFileInput = ref(null)
const removeBgrState = ref(false)
const uploadImageState = ref(false)

function addTemplateToCanvas(imageUrl, title) {
  fabric.Image.fromURL(imageUrl, (img) => {
    img.scale(0.5); // Масштабируем изображение
    // props.fabricWrap.canvas.add(img); // Добавляем изображение на холст
    const obj = {layer: img, desc: title}
    editorStore.layers.push(obj);
    editorStore.updateCanvas(props.fabricWrap.canvas);
  }, {crossOrigin: "Anonymous"});
}

function addText() {
  const sampleText = new fabric.Textbox('example', {
    left: 100,
    top: 100,
    fontSize: 20,
    fontFamily: 'Arial',
    fill: 'black'
  });
  const textWrap = { layer: sampleText, desc: 'new text'}
  editorStore.layers.push(textWrap);
  editorStore.updateCanvas(props.fabricWrap.canvas);
}
async function uploadImage(e, type) {
  if (removeBgrState.value) {
    uploadImageState.value = true
    const file = e.target.files[0];
    try {
      const data = await imagesApi.removeBgrImage(file, type);
      // console.log(data);
      const imgUrl = 'http://localhost:8000' + data.image_url
      const newLayer = {src: imgUrl, title: 'Новый слой'};
      // console.log( 'new layer', newLayer)
      editorStore.layerTemplate.push(newLayer);
      removeBgrState.value = false
      uploadImageState.value = false
      templateFileInput.value.reset();
    } catch (error) {
      removeBgrState.value = false
      uploadImageState.value = false
      templateFileInput.value.reset();
      console.log(error);
    }
  } else {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imgUrl = event.target.result;
      const newTemplate = {src: imgUrl, title: 'Новый шаблон'};
      editorStore.layerTemplate.push(newTemplate);
    }
    reader.readAsDataURL(file);
  }
  templateFileInput.value.reset();
}
</script>

<template>
  <div>
    <v-file-input
        ref="templateFileInput"
        label="Add template file"
        placeholder="Select your file"
        accept="image/png, image/jpeg, image/bmp"
        density="compact"
        @change="uploadImage($event)"
        :disabled="uploadImageState"
    ></v-file-input>
    <v-toolbar>
      <v-btn icon="mdi-format-text" @click="addText"></v-btn>
      <v-switch
        v-model="removeBgrState"
        label="remove background"
        color="success"
        hide-details
        :disabled="uploadImageState"
      ></v-switch>
      <v-divider
        class="mx-3 align-self-center"
        length="24"
        thickness="2"
        vertical
      ></v-divider>
      <v-progress-circular
        v-show="uploadImageState"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-toolbar>
    <v-card
      class="mx-auto"
      max-width="425"
      v-for="(item, index) in editorStore.layerTemplate" :key="index"
    >
      <v-list-item>
       <template v-slot:title class="bg-cyan-darken-1">
         <div>
          index: {{ index }}
         </div>
       </template>
       <template v-slot:prepend>
         <v-icon>
            <img :src="item.src" width="50px" @click="addTemplateToCanvas(item.src, item.title)">
         </v-icon>
       </template>
        <template v-slot:subtitle>
          <v-text-field label="Template Name" v-model="editorStore.layerTemplate[index].title"></v-text-field>
  <!--                {{ item.title }}-->
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