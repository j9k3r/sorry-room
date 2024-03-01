<script setup lang="ts">

import {useEditorStore} from "@/stores/editor";
import {computed, ref} from "vue";
import ImagesFilter from "@/components/editor/filters/imagesFilter.vue";
import TextFilter from "@/components/editor/filters/textFilter.vue";
import {fabric} from "fabric-all-modules";

const props = defineProps({
  fabricWrap: Object,
})

const editorStore = useEditorStore();

const open = ref([])

const isDisabled = computed(() => {
  if (editorStore.selectedLayerIndex !== -1)
    return false
  else return true
})

const FilterBlockedLayer = computed({
  get: () => {
    if (editorStore.selectedLayerIndex !== -1) {
    return editorStore.layers[editorStore.selectedLayerIndex].layer.get('erasable')
    } else return false
  },
  set: (value) => {
    editorStore.layers[editorStore.selectedLayerIndex].layer.set('erasable', value)
  }
});

const layerIsImage = computed(() => {
  if (editorStore.selectedLayerIndex !== -1) {
    if (editorStore.layers[editorStore.selectedLayerIndex].layer instanceof fabric.Image) {
        return true
    }
    return false
  } else return -1
})
</script>

<template>
<section>
  <v-card
    class="mx-auto"
    max-width="400"
    :disabled="isDisabled"
  >

    <v-toolbar color="purple">
      <v-toolbar-title>Settings Layer</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-list lines="three" select-strategy="classic" v-model:opened="open">
      <v-list-subheader>General</v-list-subheader>

      <v-list-item value="notifications">
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox v-model="FilterBlockedLayer"></v-checkbox>
          </v-list-item-action>
        </template>
        <v-list-item-title>Blocked layer</v-list-item-title>
      </v-list-item>

      <images-filter :layer-is-image="layerIsImage"></images-filter>

      <text-filter :layer-is-image="layerIsImage"></text-filter>
    </v-list>
  </v-card>
</section>
</template>

<style scoped>

</style>