<script setup lang="ts">
import {useEditorStore} from "@/stores/editor";
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  fabricWrap: Object,
})

const editorStore = useEditorStore();

const open = ref([])
function getAct() {
  // const obj = props.fabricWrap.canvas.getActiveObject();
  // console.log(obj)
  // editorStore.filterBlockedLayer(props.fabricWrap.canvas)
}

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
</script>

<template>
<section>
  <v-card
    class="mx-auto"
    max-width="400"
    :disabled="isDisabled"
  >

    <v-toolbar color="purple">
<!--      <v-btn icon="mdi-menu" @click="getAct()"></v-btn>-->

      <v-toolbar-title>Settings Layer</v-toolbar-title>

      <v-spacer></v-spacer>

<!--      <v-btn icon="mdi-magnify"></v-btn>-->
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

<!--      <v-list v-model:opened="open">-->
      <v-list-group value="Filters">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-filter-settings-outline"
            title="Filters"
          ></v-list-item>
        </template>

<!--        <v-list-group value="Admin">-->
          <v-list-item value="sound">
            <template v-slot:prepend="{ isActive }">
              <v-list-item-action start>
                <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
              </v-list-item-action>
            </template>

            <v-list-item-title>Sound</v-list-item-title>

            <v-list-item-subtitle>
              Auto-update apps at any time. Data charges may apply
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item value="widgets">
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title>Auto-add widgets</v-list-item-title>

        <v-list-item-subtitle>
          Automatically add home screen widgets when downloads complete
        </v-list-item-subtitle>
      </v-list-item>
<!--        </v-list-group>-->
      </v-list-group>
    </v-list>
  </v-card>
</section>
</template>

<style scoped>

</style>