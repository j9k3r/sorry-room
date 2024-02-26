<script setup lang="ts" async>
import {useEditorStore} from "@/stores/editor";
import {computed, ref} from "vue";
import {fabric} from "fabric-all-modules";

const props = defineProps({
  fabricWrap: Object
})

const editorStore = useEditorStore();

const layersReverse = computed(() => {
  return editorStore.layers.slice().reverse()
})

const tab = ref()
const backgroundFileInput = ref(null)
function selectLayer(id) {
    const index = editorStore.findIndexLayerById(id)
    props.fabricWrap.canvas.discardActiveObject();
    props.fabricWrap.canvas.setActiveObject(props.fabricWrap.canvas.item(index))
    props.fabricWrap.canvas.requestRenderAll();
}

function wrapInSvg(htmlString) {
  // Оборачиваем htmlString в элемент SVG
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">${htmlString}</svg>`;

  const x = convertToBase64(svgString)

  return x
}

function convertToBase64(svgString) {
  const svgBlob = new Blob([svgString], {type: 'image/svg+xml'});
  const reader = new FileReader();
  reader.readAsDataURL(svgBlob);
  reader.onloadend = function() {
    const base64data = reader.result;
    return base64data
    // Используйте полученную строку base64data для передачи в атрибут src элемента <img>
    // Например:
    // document.getElementById('myImg').src = base64data;
  }
}

function setBackgroundImage(image, canvas) {
  fabric.Image.fromURL(image, function(img) {
    // Устанавливаем размер изображения равным размеру Canvas
    // img.scaleToWidth(canvas.width);
    // img.scaleToHeight(canvas.height);

    editorStore.canvasOption.width = img.width;
    editorStore.canvasOption.height = img.height;
    // Добавляем изображение в Canvas в качестве заднего фона
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    // editorStore.canvasOption.backgroundImg = img

      // const backgroundImage = canvas.backgroundImage;
      // const width = backgroundImage.width;
      // const height = backgroundImage.height;
      // console.log('Ширина изображения:', width);
      // console.log('Высота изображения:', height);
  });
}

function uploadImage(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const imgUrl = event.target.result;
    const newBackground = { src: imgUrl, title: 'Новый фон' };
    editorStore.backgrounds.push(newBackground);
    // e.target.value = null
    backgroundFileInput.value.reset();
  };

  reader.readAsDataURL(file);
}

</script>

<template>

<v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="one">Слои</v-tab>
      <v-tab value="two">Background</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
            <v-card
              class="mx-auto"
              max-width="425"
              v-for="(item, index) in layersReverse" :key="index"
            >
              <v-list-item>
               <template v-slot:title class="bg-cyan-darken-1">
                 <div>
                  index: {{ index }}, id: {{ item.id }}
                 </div>
                 <div>
                   <v-defaults-provider
                      :defaults="{
                        VBtn: {
                          variant: 'text',
                          density: 'comfortable',
                        }
                      }"
                    >
                      <v-btn icon="mdi-arrow-up-bold-outline"  @click="editorStore.moveLayerUp(item.id, props.fabricWrap.canvas)"></v-btn>
                      <v-btn icon="mdi-arrow-down-bold-outline" @click="editorStore.moveLayerDown(item.id, props.fabricWrap.canvas)"></v-btn>
                    </v-defaults-provider>
                 </div>
               </template>
               <template v-slot:prepend>
                 <v-icon
                     @click="selectLayer(item.id)"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg"width="50" height="50"  viewBox="0 0 50 50"
                       v-html="item.cloned">
                  </svg>
                 </v-icon>
               </template>
                <template v-slot:subtitle>
                  <v-text-field label="Layer Name" v-model="editorStore.layers[editorStore.findIndexLayerById(item.id)].desc"></v-text-field>
<!--                  {{ item.desc }}-->
                </template>
              </v-list-item>
            </v-card>
        </v-window-item>

        <v-window-item value="two">
<!--          <input type="file" @change="uploadImage" accept="image/*" />-->
          <v-file-input
            ref="backgroundFileInput"
            label="Add background file"
            placeholder="Select your file"
            accept="image/png, image/jpeg, image/bmp"
            density="compact"
            @change="uploadImage"
          ></v-file-input>
          <v-card
            class="mx-auto"
            max-width="425"
            v-for="(item, index) in editorStore.backgrounds" :key="index"
          >
            <v-list-item>
             <template v-slot:title class="bg-cyan-darken-1">
               <div>
                index: {{ index }}
               </div>
             </template>
             <template v-slot:prepend>
               <v-icon>
                  <img :src="item.src" width="50px" @click="setBackgroundImage(item.src, props.fabricWrap.canvas)">
               </v-icon>
             </template>
              <template v-slot:subtitle>
                <v-text-field label="Background Name" v-model="editorStore.backgrounds[index].title"></v-text-field>
<!--                {{ item.title }}-->
              </template>
            </v-list-item>
          </v-card>
        </v-window-item>

        <v-window-item value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-icon--size-default {
  font-size: calc(var(--v-icon-size-multiplier) * 3.5em);
}

.v-list-item-title {
  display: flex !important;
  justify-content: space-between !important;
}

</style>