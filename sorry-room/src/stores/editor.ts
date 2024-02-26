import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
const layers = reactive([])

function findIndexLayerById(id: number) {
    const index = layers.findIndex(obj => obj.id === id);
    return index;
}

function findIndexLayerByObject(object) {
    const index = layers.findIndex((item) => item.layer === object);
    return index
}

const backgrounds = reactive([
    {src: '/images/background/bgr1.jpeg', title: 'грустный фон 1'},
    {src: '/images/background/bgr2.jpeg', title: 'грустный фон 2'},
    {src: '/images/background/bgr3.jpeg', title: 'грустный фон 3'},
    {src: '/images/background/bgr4.jpeg', title: 'грустный фон 4'},
    {src: '/images/background/bgr5.jpeg', title: 'грустный фон 5'},
    {src: '/images/background/bgr6.jpeg', title: 'грустный фон 6'},
])

const canvasOption = reactive({
    width: 800,
    height: 600,
    backgroundColor : "#fff",
    backgroundImg: null
})

const selectedLayerIndex = ref(-1)
function updateCanvas(canvas) {
    const bgrImage = canvas.backgroundImage
    canvas.clear();

      canvas.setWidth(canvasOption.width);
      canvas.setHeight(canvasOption.height);
      canvas.backgroundColor = canvasOption.backgroundColor;
      // canvas.setBackgroundImage(canvasOption.backgroundImg);
      canvas.setBackgroundImage(bgrImage);

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

function filterBlockedLayer(canvas) {
    const selectedObject = canvas.getActiveObject();
    if (selectedObject) {
        // const index = layers.indexOf(selectedObject);
        const index = layers.findIndex((item) => item.layer === selectedObject);

        const erasible = !layers[index].layer.get('erasable')
        const selectable = layers[index].layer.set('erasable', erasible)
        console.log(selectable)
    }
}

return { layers, backgrounds, canvasOption, selectedLayerIndex, findIndexLayerById, findIndexLayerByObject,  updateCanvas, removeSelectedObject, moveLayerUp, moveLayerDown, filterBlockedLayer }
})