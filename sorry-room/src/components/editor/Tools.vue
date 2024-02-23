<script setup lang="ts">
import {fabric} from "fabric-all-modules";
import {useEditorStore} from "@/stores/editor";

const props = defineProps({
  fabricWrap: Object
})

const editorStore = useEditorStore();

const changeAction = (target) => {
  if (target === 'erase') {
    props.fabricWrap.canvas.freeDrawingBrush = new fabric.EraserBrush(props.fabricWrap.canvas);
    props.fabricWrap.canvas.freeDrawingBrush.width = 10;
    props.fabricWrap.canvas.isDrawingMode = true;
  }
  if (target === 'select') {
    props.fabricWrap.canvas.isDrawingMode = false;
  }
}
</script>

<template>
<section class="controls">
  <button id="select" type="button" @click="changeAction('select')">select</button>
  <button id="erase" type="button" @click="changeAction('erase')">erase</button>
  <button id="delete" type="button" @click="editorStore.removeSelectedObject(props.fabricWrap.canvas)">delete selected</button>
</section>
</template>

<style scoped>

</style>