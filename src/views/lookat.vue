<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/orbitControls.js";
import { onMounted } from "vue";
onMounted(() => {
  init();
  animate();
});

let scene: any, camera: any, renderer: any, sphere: any, controls: any;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
document.addEventListener("mousemove", onDocumentMouseMove);

const init = () => {
  //初始化相机
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    15000
  );
  camera.position.z = 3200;
  //初始化场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#ccc");
  //小球
  let meshGeometry = new THREE.SphereGeometry(100, 20, 20);
  let material = new THREE.MeshNormalMaterial();
  sphere = new THREE.Mesh(meshGeometry, material);
  scene.add(sphere);
  //创建椎体群
  const geometry = new THREE.CylinderGeometry(0, 10, 100, 12);
  geometry.rotateX(Math.PI / 2);

  for (let i = 0; i < 1000; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 4000 - 2000;
    mesh.position.y = Math.random() * 4000 - 2000;
    mesh.position.z = Math.random() * 4000 - 2000;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2;
    scene.add(mesh);
  }

  //渲染
  const canvas = document.getElementById("canvas") as HTMLElement;
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas }); //antialias抗锯齿
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  //监听浏览器变化
  window.addEventListener("resize", onWindowResize);

  //创建控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; //阻尼器
  controls.dampingFactor = 0.01; //阻尼器参数
};

const animate = () => {
  requestAnimationFrame(animate);
  render();
};

const render = () => {
  const time = Date.now() * 0.0005;
  sphere.position.x = Math.sin(time * 0.7) * 2000;
  sphere.position.y = Math.cos(time * 0.5) * 2000;
  sphere.position.z = Math.cos(time * 0.3) * 2000;

  for (let i = 1, l = scene.children.length; i < l; i++) {
    scene.children[i].lookAt(sphere.position);
  }

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
};

const onWindowResize = () => {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

function onDocumentMouseMove(event: { clientX: number; clientY: number }) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
</script>
