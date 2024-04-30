<template>
  <div></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { onMounted } from "vue";
import { SVGRenderer, SVGObject } from "three/addons/renderers/SVGRenderer.js";

const main = () => {
  let renderer: any;
  {
    renderer = new SVGRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setQuality("low");
    document.body.appendChild(renderer.domElement);
  }

  const camera = new THREE.PerspectiveCamera(75, 2, 1, 1000);
  camera.position.z = 500;

  const scene = new THREE.Scene();

  // fileLoader
  {
    const fileLoader = new THREE.FileLoader();
    fileLoader.load("/src/models/svg/hexagon.svg", function (svg) {
      const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg as string, "image/svg+xml");
      node.appendChild(doc.documentElement);
      const object = new SVGObject(node);
      scene.add(object);
    });
  }

  const render = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};
onMounted(() => {
  main();
});
</script>
<style scoped lang="less"></style>
