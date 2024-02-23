<script setup lang="ts">
import {useEditorStore} from "@/stores/editor";

const props = defineProps({
  fabricWrap: Object
})

const editorStore = useEditorStore();
function selectLayer(index) {
    props.fabricWrap.canvas.discardActiveObject();
    props.fabricWrap.canvas.setActiveObject(props.fabricWrap.canvas.item(index))
    props.fabricWrap.canvas.requestRenderAll();
}
</script>

<template>
<section>
      <div v-for="(item, index) in editorStore.layers" :key="index">
        <div style="color: red">{{ item.desc }}
          <svg xmlns="http://www.w3.org/2000/svg"width="50" height="50"  viewBox="0 0 50 50" @click="selectLayer(index)"
               v-html="item.cloned">
          </svg>
          <button @click="editorStore.moveLayerUp(index, props.fabricWrap.canvas)">up</button>
          <button @click="editorStore.moveLayerDown(index, props.fabricWrap.canvas)">down</button>
        </div>
      </div>
</section>
</template>

<style scoped>

</style>