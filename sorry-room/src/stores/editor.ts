import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
  const layers = reactive([])

function updateCanvas(canvas) {
canvas.clear();
layers.forEach((obj, index) => {
     obj.layer.clone((cl) => {
         // cl.centerObject(cl)
         cl.left = 0
         cl.top = 0
         cl.scaleToHeight(50, { aspectRatio: cl.width / cl.height }) // задаем aspectRatio и используем scaleToHeight
      const svg = cl.toSVG();
         layers[index].cloned = svg
     })
  canvas.add(obj.layer);
});
}

function removeSelectedObject(canvas) {
const selectedObject = canvas.getActiveObject();
if (selectedObject) {
  const index = layers.indexOf(selectedObject);
  if (index !== -1) {
    layers.splice(index, 1);
    canvas.remove(selectedObject);
  }
}
}

function moveLayerUp(index, canvas) {
    // const index = this.fabricWrap.layers.indexOf(selectedObject);
    if (index !== -1 && index < layers.length - 1) {
      const selectable = layers.splice(index, 1);
      layers.splice(index + 1, 0, selectable[0]);
      updateCanvas(canvas);
    }


  // const selectedObject = this.fabricWrap.canvas.getActiveObject();
  // if (selectedObject) {
  //   const index = this.fabricWrap.layers.indexOf(selectedObject);
  //   if (index !== -1 && index < this.fabricWrap.layers.length - 1) {
  //     this.fabricWrap.layers.splice(index, 1);
  //     this.fabricWrap.layers.splice(index + 1, 0, selectedObject);
  //     this.fabricWrap.updateCanvas();
  //   }
  // }
}

function moveLayerDown(index, canvas) {
    if (index !== -1 && index != 0) {
      const selectable = layers.splice(index, 1);
      layers.splice(index - 1, 0, selectable[0]);
      updateCanvas(canvas);
    }
}

return { layers, updateCanvas, removeSelectedObject, moveLayerUp, moveLayerDown }
})