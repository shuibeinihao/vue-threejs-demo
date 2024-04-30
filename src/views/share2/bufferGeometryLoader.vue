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

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
  camera.position.z = 800;

  const scene = new THREE.Scene();

  //BufferGeometryLoader
  {
    const loader = new THREE.BufferGeometryLoader();
    loader.load(
      "/src/models/json/QRCode_buffergeometry.json",
      function (geometry) {
        let mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshLambertMaterial({ vertexColors: true })
        );
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 2;
        scene.add(mesh);
      }
    );
  }

  {
    const ambient = new THREE.AmbientLight("#660");
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffff00);
    directional.position.set(-1, 0.5, 0);
    scene.add(directional);
  }

  const render = () => {
    const time = Date.now() * 0.0002;

    camera.position.x = Math.sin(time) * 800;
    camera.position.z = Math.cos(time) * 800;
    camera.lookAt(scene.position);

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
