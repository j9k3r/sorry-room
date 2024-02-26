<script setup lang="ts">
import {useEditorStore} from "@/stores/editor";
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  fabricWrap: Object,
})

const editorStore = useEditorStore();
function getAct() {
  const obj = props.fabricWrap.canvas.getActiveObject();
  console.log(obj)
 // console.log(obj.get('erasable'))

  editorStore.filterBlockedLayer(props.fabricWrap.canvas)
}

// const isActivet = computed({
//   get: () => {
//     console.log(props.fabricWrap.canvas)
//     if (props.fabricWrap.canvas !== null) {
//     const obj = props.fabricWrap.canvas.getActiveObject()
//
//       return obj.get('erasable')
//     } else return false
//   },
//   set: (value) => {
//     const obj = props.fabricWrap.canvas.getActiveObject()
//     obj.set('erasable', value)
//   }
// });


const blockedLayer = computed({
  get: () => {
    if (editorStore.selectedLayerIndex !== -1) {
    // const obj = props.fabricWrap.canvas.getActiveObject()
    return editorStore.layers[editorStore.selectedLayerIndex].layer.get('erasable')
      // return obj.get('erasable')
    } else return false
  },
  set: (value) => {
    // const obj = props.fabricWrap.canvas.getActiveObject()
    // obj.set('erasable', value)
    editorStore.layers[editorStore.selectedLayerIndex].layer.set('erasable', value)
  }
});


onMounted(() => {
  // props.fabricWrap.canvas.on('selection:created', function(e) {
  //   console.log('Объекты были выделены');
  //   var selectedObject = e.target;
  //   // Далее вам может потребоваться выполнить нужные вам действия с выделенными объектами
  // });

})
</script>

<template>
<section v-if="editorStore.selectedLayerIndex !== -1">
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-toolbar color="purple">
      <v-btn icon="mdi-menu" @click="getAct()"></v-btn>

      <v-toolbar-title>Settings Layer</v-toolbar-title>

      <v-spacer></v-spacer>

<!--      <v-btn icon="mdi-magnify"></v-btn>-->
    </v-toolbar>

    <v-list lines="three" select-strategy="classic">
      <v-list-subheader>General</v-list-subheader>
<!--      {{isActivet}}-->
      <v-list-item value="notifications">
        <template v-slot:prepend="{ isActive }">

          <v-list-item-action start>
<!--            <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>-->
            <v-checkbox v-model="blockedLayer"></v-checkbox>
          </v-list-item-action>
        </template>

        <v-list-item-title>Blocked layer</v-list-item-title>

<!--        <v-list-item-subtitle>-->
<!--          Notify me about updates to apps or games that I downloaded-->
<!--        </v-list-item-subtitle>-->
      </v-list-item>

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
    </v-list>
  </v-card>
</section>
</template>

<style scoped>

</style>