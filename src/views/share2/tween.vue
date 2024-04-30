<template>
  <div id="container"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import TWEEN from "three/addons/libs/tween.module.js";
let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  controls: any,
  cube: any,
  renderer: THREE.WebGLRenderer;

init();
animation();
execute();

function init() {
  //相机
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(2, 3, -6);
  camera.lookAt(0, 1, 0);

  //场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

  //环境光
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  //立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1); // 创建一个立方体网格
  const material = new THREE.MeshPhongMaterial({
    color: "#00f"
  });
  cube = new THREE.Mesh(geometry, material);
  cube.name = "winter";
  scene.add(cube); // 将立方体添加到场景中

  //渲染
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window); // optional
  controls.enableDamping = true; //允许控制器平滑地减速 阻尼器
  controls.dampingFactor = 0.05; //阻尼系数

  window.addEventListener("resize", onWindowResize);
}

function animation() {
  new TWEEN.Tween(cube.position)
    .to({ x: 3, y: 0, z: 0 }, 1000)
    .delay(1000) //延迟1s执行
    .repeatDelay(0) //如果你想延迟初始迭代但不希望迭代之间有任何延迟，请确保调用 tween.repeatDelay(0) 。
    .start() //动画启动 停止stop()
    .repeat(3) //描述第一个补间完成后需要多少次重复：
    .easing(TWEEN.Easing.Sinusoidal.InOut) //缓动类型 In Out InOut
    .yoyo(true); //此功能仅在与 repeat 一起使用时才有效。像溜溜球一样，即它会在开始值和结束值之间来回跳动
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function execute() {
  requestAnimationFrame(execute);
  controls.update();
  TWEEN.update();
  renderer.render(scene, camera);
}
</script>
