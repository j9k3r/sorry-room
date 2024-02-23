import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
const layers = reactive([])

function findIndexLayerById(id: number) {
    const index = layers.findIndex(obj => obj.id === id);
    return index;
}

function updateCanvas(canvas) {
    canvas.clear();
    layers.forEach((obj, index) => {
     obj.layer.clone((cl) => {
      cl.scaleToHeight(50, { aspectRatio: cl.width / cl.height });
      const box = cl.getBoundingRect(true);
      const xOffset = (50 - box.width) / 2 - box.left;
      const yOffset = (50 - box.height) / 2 - box.top;
      cl.set({ left: cl.left + xOffset, top: cl.top + yOffset });
      const svg = cl.toSVG();
        layers[index].cloned = svg;
      })
      canvas.add(obj.layer);
     if (obj.id === undefined) {
         layers[index].id = index
     }
    });
}

function removeSelectedObject(canvas) {
    const selectedObject = canvas.getActiveObject();
    if (selectedObject) {
      // const index = layers.indexOf(selectedObject);
      const index = layers.findIndex((item) => item.layer === selectedObject);
      if (index !== -1) {
        layers.splice(index, 1);
        canvas.remove(selectedObject);
      }
    }
}

function moveLayerUp(id, canvas) {
    // const index = this.fabricWrap.layers.indexOf(selectedObject);

    const index = findIndexLayerById(id)
    if (index !== -1 && index < layers.length - 1) {
      const selectable = layers.splice(index, 1);
      layers.splice(index + 1, 0, selectable[0]);
      updateCanvas(canvas);
    }
}

function moveLayerDown(id, canvas) {
    const index = findIndexLayerById(id)
    if (index !== -1 && index != 0) {
      const selectable = layers.splice(index, 1);
      layers.splice(index - 1, 0, selectable[0]);
      updateCanvas(canvas);
    }
}

return { layers, findIndexLayerById, updateCanvas, removeSelectedObject, moveLayerUp, moveLayerDown }
})