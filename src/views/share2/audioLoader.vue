<template>
  <div id="overlay">
    <van-button style="margin-top: 100px" type="primary" id="startButton"
      >Play</van-button
    >
  </div>
  <div id="container"></div>
</template>
<script setup>
import * as THREE from "three";
import { onMounted } from "vue";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer, clock;

const objects = [];

const speed = 2.5;
const height = 3;
const offset = 0.5;

onMounted(() => {
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", init);
});

function init() {
  const overlay = document.getElementById("overlay");
  overlay.remove();

  // renderer
  const container = document.getElementById("container");
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  //camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(7, 3, 7);

  // lights
  const ambientLight = new THREE.AmbientLight(0xcccccc);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
  directionalLight.position.set(0, 5, 5);
  scene.add(directionalLight);

  const d = 5;
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 20;

  directionalLight.shadow.mapSize.x = 1024;
  directionalLight.shadow.mapSize.y = 1024;

  // floor
  const floorGeometry = new THREE.PlaneGeometry(10, 10);
  const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x4676b6 });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = Math.PI * -0.5;
  floor.receiveShadow = true;
  scene.add(floor);

  // objects
  const count = 5;
  const radius = 3;

  const ballGeometry = new THREE.SphereGeometry(0.3, 32, 16);
  ballGeometry.translate(0, 0.3, 0);
  const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });

  // audioLoader
  const audioLoader = new THREE.AudioLoader();
  const listener = new THREE.AudioListener();
  camera.add(listener);
  audioLoader.load("/src/sounds/ping_pong.mp3", function (buffer) {
    console.log("audioObject", buffer);
    for (let i = 0; i < count; i++) {
      const s = (i / count) * Math.PI * 2; //得到一个在0到2π之间的角度

      const ball = new THREE.Mesh(ballGeometry, ballMaterial);
      ball.castShadow = true;
      ball.userData.down = false;

      ball.position.x = radius * Math.cos(s);
      ball.position.z = radius * Math.sin(s);

      const audio = new THREE.Audio(listener); //可以在3D空间中定位的音频对象。它需要一个监听器对象作为参数
      audio.setBuffer(buffer); //这意味着音频内容已经预先加载到这个缓冲区中。
      ball.add(audio); //将音频对象添加到球体对象中

      scene.add(ball);
      objects.push(ball);
    }

    animate();
  });

  //controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 25;

  //addEventListener
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  const time = clock.getElapsedTime(); // 返回自页面加载以来经过的时间（以秒为单位）
  for (let i = 0; i < objects.length; i++) {
    const ball = objects[i];

    const previousHeight = ball.position.y;
    ball.position.y = Math.abs(Math.sin(i * offset + time * speed) * height); //不断改变y值

    if (ball.position.y < previousHeight) {
      ball.userData.down = true;
    } else {
      if (ball.userData.down === true) {
        // ball changed direction from down to up
        const audio = ball.children[0];
        audio.play(); // play audio with perfect timing when ball hits the surface
        ball.userData.down = false;
      }
    }
  }

  renderer.render(scene, camera);
}
</script>
<style scoped lang="less">
#overlay {
  text-align: center;
}
</style>
