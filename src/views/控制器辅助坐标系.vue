<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/orbitControls.js";
import { onMounted } from "vue";

onMounted(() => {
  init();
  renderInfo();
});

let scene, camera, renderer, controls, cube;

const init = () => {
  //创建场景
  scene = new THREE.Scene();
  //创建相机
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);
  //创建渲染器
  const canvas = document.getElementById("canvas");
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas }); //antialias抗锯齿
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  //创建控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; //阻尼器
  controls.dampingFactor = 0.01; //阻尼器参数
  controls.autoRotate = true; //自动旋转

  //创建物体
  createMesh();
  //创建辅助线
  createHelper();
};

const createMesh = () => {
  //创建几何体
  const geomotry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  //创建材质
  const meterial = new THREE.MeshBasicMaterial({ color: "#660" });
  //创建物体
  cube = new THREE.Mesh(geomotry, meterial);
  //将物体添加到场景中
  scene.add(cube);
};

const createHelper = () => {
  const axesHelper = new THREE.AxesHelper(1);
  scene.add(axesHelper);
};

const renderInfo = () => {
  requestAnimationFrame(renderInfo);
  controls.update();
  cube.rotation.x += 0.01;
  renderer.render(scene, camera);
};
</script>
<style scoped lang="less"></style>
