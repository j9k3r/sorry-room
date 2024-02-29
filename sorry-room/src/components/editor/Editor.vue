<script setup lang="ts">
import { fabric } from 'fabric-all-modules';
import {onMounted, reactive, ref, watch} from "vue";
import {useEditorStore} from "@/stores/editor";
import Layers from "@/components/editor/Layers.vue";
import Tools from "@/components/editor/Tools.vue";
import LayerFilters from "@/components/editor/LayerFilters.vue";

const fabricWrap = {
  canvas: null,
};

const editorStore = useEditorStore();

onMounted(() => {
  fabricWrap.canvas = new fabric.Canvas('canvas', {
    width: editorStore.canvasOption.width,
    height: editorStore.canvasOption.height,
    backgroundColor : "#fff",
  });

  fabricWrap.canvas.on('selection:updated', function(e) {
    const selectedObjects = e.selected;
    const indexSelectedObject = editorStore.findIndexLayerByObject(selectedObjects[0])
    editorStore.selectedLayerIndex = indexSelectedObject
    // console.log(indexSelectedObject)
    // console.log('Объекты в выделении', selectedObjects[0]);

  });

  fabricWrap.canvas.on('selection:cleared', function(e) {
    editorStore.selectedLayerIndex = -1
    // const selectedObjects = e.selected;
    // console.log('Объекты в выделении очищены', selectedObjects);
  });

});

  watch(() => editorStore.canvasOption, (state) => {
    // console.log(state)
    // fabricWrap.canvas.backgroundColor = editorStore.canvasOption.backgroundColor

    fabricWrap.canvas.setWidth(state.width)
    fabricWrap.canvas.setHeight(state.height)
    fabricWrap.canvas.backgroundColor = state.backgroundColor
    // fabricWrap.canvas.setBackgroundImage(state.backgroundImg);
    fabricWrap.canvas.renderAll();
  }, {deep: true})



</script>

<template>
<section>
  <header>
    <tools :fabricWrap="fabricWrap"></tools>
  </header>
  <div class="body">
    <div class="container">
      <canvas id="canvas"></canvas>
    </div>
    <div class="layer-group">
      <layer-filters :fabricWrap="fabricWrap"></layer-filters>
      <layers :fabricWrap="fabricWrap"></layers>
    </div>
  </div>
  <footer></footer>
</section>
</template>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr;
  width: 1200px;
}
.body {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.container {
  width: 800px;
  height: 600px;
  overflow: auto; /* прокрутка*/
}
</style>