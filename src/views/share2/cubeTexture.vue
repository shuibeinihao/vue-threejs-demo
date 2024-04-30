<template>
  <div></div>
</template>
<script setup lang="ts">
import * as THREE from "three";

const main = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const cubes: Array<any> = []; // just an array we can use to rotate the cubes
  {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);

    const loadColorTexture = (path: string) => {
      const texture = loader.load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const materials = [
      new THREE.MeshBasicMaterial({
        map: loadColorTexture("images/1.webp")
      }),
      new THREE.MeshBasicMaterial({
        map: loadColorTexture("images/2.webp")
      }),
      new THREE.MeshBasicMaterial({
        map: loadColorTexture("images/3.webp")
      }),
      new THREE.MeshBasicMaterial({
        map: loadColorTexture("images/4.webp")
      }),
      new THREE.MeshBasicMaterial({
        map: loadColorTexture("images/5.webp")
      }),
      new THREE.MeshBasicMaterial({
        map: loadColorTexture("images/6.webp")
      })
    ];

    loadManager.onLoad = () => {
      const cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);
      cubes.push(cube); // add to our list of cubes to rotate
    };
  }

  const render = (time: number) => {
    time *= 0.001;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    cubes.forEach((cube, ndx) => {
      const speed = 0.2 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};
main();
</script>
<style scoped lang="less"></style>
