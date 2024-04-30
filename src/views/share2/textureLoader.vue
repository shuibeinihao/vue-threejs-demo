<template>
  <div></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { onMounted } from "vue";

const main = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  let cube: THREE.Object3D<THREE.Object3DEventMap>; // just an array we can use to rotate the cubes
  // TextureLoader
  {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.rotateY(1);

    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);

    const loadColorTexture = (path: string) => {
      const texture = loader.load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const materials = new THREE.MeshBasicMaterial({
      map: loadColorTexture("images/1.webp")
    });

    loadManager.onLoad = () => {
      cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);
    };
  }

  const render = () => {
    // cube.rotation.x += 0.001; // 让立方体每帧旋转一定的角度，以产生动态效果
    // cube.rotation.y += 0.001;
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
