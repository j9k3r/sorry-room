<script setup lang="ts">
import {fabric} from "fabric-all-modules";
import {useEditorStore} from "@/stores/editor";
import {ref} from "vue";

const props = defineProps({
  fabricWrap: Object
})

const editorStore = useEditorStore();

const range = ref(10)
const changeAction = (target) => {
  if (target === 'erase') {
    props.fabricWrap.canvas.freeDrawingBrush = new fabric.EraserBrush(props.fabricWrap.canvas);
    props.fabricWrap.canvas.freeDrawingBrush.width = range.value;
    props.fabricWrap.canvas.isDrawingMode = true;
  }
  if (target === 'select') {
    props.fabricWrap.canvas.isDrawingMode = false;
  }
}

const downloadImage = () => {
  const ext = "png";
  const base64 = props.fabricWrap.canvas.toDataURL({ format: ext, enableRetinaScaling: true });
  const link = document.createElement("a");
  link.href = base64;
  link.download = `example.${ext}`;
  link.click();
};

</script>

<template>
<section class="controls">
  <v-toolbar>
  <!--    <template v-slot:prepend>-->
  <!--      <v-btn icon="mdi-arrow-left"></v-btn>-->
  <!--    </template>-->

  <v-btn icon="mdi-mouse-left-click" @click="changeAction('select')"></v-btn>

  <v-btn icon="mdi-eraser" @click="changeAction('erase')"></v-btn>
    <v-col cols="2">
      <v-select
        v-model="range"
        :items="[10,20,30,40,50,60]"
        density="compact"
        label="width"
      ></v-select>
    </v-col>

  <v-btn icon="mdi-delete-outline" @click="editorStore.removeSelectedObject(props.fabricWrap.canvas)"></v-btn>

  <template v-if="$vuetify.display.smAndUp">
    <v-divider
      class="mx-3 align-self-center"
      length="24"
      thickness="2"
      vertical
    ></v-divider>

    <v-btn icon="mdi-download" @click="downloadImage"></v-btn>
  </template>
  </v-toolbar>


<!--  <button id="select" type="button" @click="changeAction('select')">select</button>-->
<!--  <button id="erase" type="button" @click="changeAction('erase')">erase</button>-->
<!--  <button id="delete" type="button" @click="editorStore.removeSelectedObject(props.fabricWrap.canvas)">delete selected</button>-->
</section>
</template>

<style scoped>

</style>