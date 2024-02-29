<script setup lang="ts">

import imagesApi from "@/services/imagesApi";
import {useEditorStore} from "@/stores/editor";
import {computed} from "vue";

const props = defineProps({
  fabricWrap: Object
})

const editorStore = useEditorStore();

const layersReverse = computed(() => {
  return editorStore.layers.slice().reverse()
})
function selectLayer(id) {
    const index = editorStore.findIndexLayerById(id)
    props.fabricWrap.canvas.discardActiveObject();
    props.fabricWrap.canvas.setActiveObject(props.fabricWrap.canvas.item(index))
    props.fabricWrap.canvas.requestRenderAll();
}

async function testPost() {
  try {
      const data = await imagesApi.testPost();
      console.log(data);
      // обработайте ответ здесь
    } catch (error) {
      console.log(error);
      // обработайте ошибку здесь
    }
}
</script>

<template>
<!--          <v-btn icon="mdi-arrow-left" @click="testPost()"></v-btn>-->
  <v-card
    class="mx-auto"
    max-width="400"
    v-for="(item, index) in layersReverse" :key="index"
  >
    <v-list-item
        :class="editorStore.selectedLayerIndex === editorStore.findIndexLayerById(item.id) ? 'border' : ''"
    >
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

      </template>
    </v-list-item>
  </v-card>
</template>

<style scoped>
.border {
  border: 2px dashed orange !important;
}

</style>