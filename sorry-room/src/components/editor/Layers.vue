<script setup lang="ts">
import {useEditorStore} from "@/stores/editor";
import {computed, ref} from "vue";

const props = defineProps({
  fabricWrap: Object
})

const editorStore = useEditorStore();

const layersReverse = computed(() => {
  return editorStore.layers.slice().reverse()
})

const tab = ref()
function selectLayer(id) {
  console.log('123')
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
</script>

<template>

<v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
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
                  index: {{ index }}, id: {{ item.id }}
                 <v-defaults-provider
                    :defaults="{
                      VBtn: {
                        variant: 'text',
                        density: 'comfortable',
                      }
                    }"
                  >
                    <v-btn icon="$vuetify"></v-btn>
                    <v-btn icon="mdi-arrow-up-bold-outline"  @click="editorStore.moveLayerUp(item.id, props.fabricWrap.canvas)"></v-btn>
                    <v-btn icon="mdi-arrow-down-bold-outline" @click="editorStore.moveLayerDown(item.id, props.fabricWrap.canvas)"></v-btn>
                  </v-defaults-provider>
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
                  {{ item.desc }}
                </template>
              </v-list-item>
            </v-card>
        </v-window-item>

        <v-window-item value="two">
          Two
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
</style>