<script setup lang="ts">

import {computed} from "vue";
import {useEditorStore} from "@/stores/editor";

const props = defineProps({
  layerIsImage: Boolean
})

const editorStore = useEditorStore();

const fonts = ['Arial', 'Verdana', 'Tahoma', 'Times New Roman', 'Courier New', 'Georgia']
const fontsWeight = ['bold', 'normal', '400', '600', '800']
const fontsStyle = ['normal', 'italic', 'oblique']

const filterTextFont = computed({
  get: () => {
    if (editorStore.selectedLayerIndex !== -1) {
    return editorStore.layers[editorStore.selectedLayerIndex].layer.get('fontFamily')
    } else return false
  },
  set: (value) => {
    editorStore.layers[editorStore.selectedLayerIndex].layer.set('fontFamily', value)
  }
});

const filterTextColor = computed({
  get: () => {
    if (editorStore.selectedLayerIndex !== -1) {
    return editorStore.layers[editorStore.selectedLayerIndex].layer.get('fill')
    } else return false
  },
  set: (value) => {
    editorStore.layers[editorStore.selectedLayerIndex].layer.set('fill', value)
  }
});

const filterTextFontWeight = computed({
  get: () => {
    if (editorStore.selectedLayerIndex !== -1) {
    return editorStore.layers[editorStore.selectedLayerIndex].layer.get('fontWeight')
    } else return false
  },
  set: (value) => {
    editorStore.layers[editorStore.selectedLayerIndex].layer.set('fontWeight', value)
  }
});

const filterTextFontStyle = computed({
  get: () => {
    if (editorStore.selectedLayerIndex !== -1) {
    return editorStore.layers[editorStore.selectedLayerIndex].layer.get('fontStyle')
    } else return false
  },
  set: (value) => {
    editorStore.layers[editorStore.selectedLayerIndex].layer.set('fontStyle', value)
  }
});

</script>

<template>
  <v-list-group value="Text" v-show="props.layerIsImage !== -1 && !props.layerIsImage">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-script-text-key-outline"
            title="Text filter"
          ></v-list-item>
        </template>
        <v-select
          label="Font"
          v-model="filterTextFont"
          :items="fonts"
        ></v-select>
        <v-select
          label="Font Style"
          v-model="filterTextFontStyle"
          :items="fontsStyle"
        ></v-select>
        <v-select
          label="Font Weight"
          v-model="filterTextFontWeight"
          :items="fontsWeight"
        ></v-select>
        <v-text-field label="Color" v-model="filterTextColor"></v-text-field>
  </v-list-group>
</template>

<style scoped>

</style>