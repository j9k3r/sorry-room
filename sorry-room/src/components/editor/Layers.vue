<script setup lang="ts" async>

import {ref} from "vue";
import LayerTab from "@/components/editor/tabs/LayerTab.vue";
import BackgroundTab from "@/components/editor/tabs/BackgroundTab.vue";
import TemplateTab from "@/components/editor/tabs/TemplateTab.vue";

const props = defineProps({
  fabricWrap: Object
})

const tab = ref()
</script>

<template>

<v-card
    class="mx-auto"
    max-width="400">
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="one">Layers</v-tab>
      <v-tab value="two">Background</v-tab>
      <v-tab value="three">Templates</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <layer-tab :fabricWrap="props.fabricWrap"></layer-tab>
        </v-window-item>

        <v-window-item value="two">
          <background-tab :fabricWrap="props.fabricWrap"></background-tab>
        </v-window-item>

        <v-window-item value="three">
          <template-tab :fabricWrap="props.fabricWrap"></template-tab>
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

.border {
  border: 2px dashed orange !important;
}

</style>