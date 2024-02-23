<script setup lang="ts">
import {useEditorStore} from "@/stores/editor";
import {ref} from "vue";

const props = defineProps({
  fabricWrap: Object
})

const editorStore = useEditorStore();

const tab = ref()
function selectLayer(index) {
    props.fabricWrap.canvas.discardActiveObject();
    props.fabricWrap.canvas.setActiveObject(props.fabricWrap.canvas.item(index))
    props.fabricWrap.canvas.requestRenderAll();
}
</script>

<template>

<v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          one
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
        </v-window-item>

        <v-window-item value="two">
          Two
        </v-window-item>

        <v-window-item value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>

<!--<section>-->
<!--  <div v-for="(item, index) in editorStore.layers" :key="index">-->
<!--    <div style="color: red">{{ item.desc }}-->
<!--      <svg xmlns="http://www.w3.org/2000/svg"width="50" height="50"  viewBox="0 0 50 50" @click="selectLayer(index)"-->
<!--           v-html="item.cloned">-->
<!--      </svg>-->
<!--      <button @click="editorStore.moveLayerUp(index, props.fabricWrap.canvas)">up</button>-->
<!--      <button @click="editorStore.moveLayerDown(index, props.fabricWrap.canvas)">down</button>-->
<!--    </div>-->
<!--  </div>-->
<!--</section>-->
</template>

<style scoped>

</style>