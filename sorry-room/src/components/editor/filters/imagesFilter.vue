<script setup lang="ts">

import {computed} from "vue";
import {fabric} from "fabric-all-modules";
import {useEditorStore} from "@/stores/editor";

const editorStore = useEditorStore();

const filters = ['grayscale',  'sepia', 'brownie', 'vintage', 'kodachrome', 'technicolor', 'polaroid']

const appliedFilters = computed({
  get: () => {
    if (editorStore.selectedLayerIndex !== -1) {
    const activeFilters = editorStore.layers[editorStore.selectedLayerIndex].layer.filters
    let arrActiveNameFilter = []
    if (activeFilters !== undefined && activeFilters.length > 0 ) {
      activeFilters.forEach((element) => arrActiveNameFilter.push(element.type.toLowerCase()))
    }
    return arrActiveNameFilter
    } else return []
  },
  set: (value) => {
    editorStore.layers[editorStore.selectedLayerIndex].layer.filters = []
    if (value.length > 0) {
      value.forEach(filterName => {
        switch (filterName) {
          case "brownie":
            editorStore.layers[editorStore.selectedLayerIndex].layer.filters.push(new fabric.Image.filters.Brownie())
            break;
          case "sepia":
            editorStore.layers[editorStore.selectedLayerIndex].layer.filters.push(new fabric.Image.filters.Sepia());
            break;
          case "vintage":
            editorStore.layers[editorStore.selectedLayerIndex].layer.filters.push(new fabric.Image.filters.Vintage())
            break;
          case "technicolor":
            editorStore.layers[editorStore.selectedLayerIndex].layer.filters.push(new fabric.Image.filters.Technicolor())
            break;
          case "polaroid":
            editorStore.layers[editorStore.selectedLayerIndex].layer.filters.push(new fabric.Image.filters.Polaroid())
            break;
          case "kodachrome":
            editorStore.layers[editorStore.selectedLayerIndex].layer.filters.push(new fabric.Image.filters.Kodachrome())
            break;
          case "grayscale":
            editorStore.layers[editorStore.selectedLayerIndex].layer.filters.push(new fabric.Image.filters.Grayscale())
            break;
        }
      })
    }
    editorStore.layers[editorStore.selectedLayerIndex].layer.applyFilters()
  }
});
</script>

<template>
  <v-list-group value="Filters">
    <template v-slot:activator="{ props }">
      <v-list-item
        v-bind="props"
        prepend-icon="mdi-filter-settings-outline"
        title="Filters"
      ></v-list-item>
    </template>
      <v-select
        :items="filters"
        v-model="appliedFilters"
        label="filters"
        multiple
        chips
      ></v-select>
  </v-list-group>
</template>

<style scoped>

</style>