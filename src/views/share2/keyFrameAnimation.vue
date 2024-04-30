<template>
  <div id="container"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  controls: any,
  cube: any,
  mixer: any,
  renderer: THREE.WebGLRenderer;
const clock = new THREE.Clock();

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
  const times = [0, 5, 10]; //时间轴上，设置三个时刻0、3、6秒
  // times中三个不同时间点，物体分别对应values中的三个xyz坐标
  const values = [0, 0, 0, 3, 0, 0, 0, 0, 3];
  // 0~3秒，物体从(0,0,0)逐渐移动到(100,0,0),3~6秒逐渐从(100,0,0)移动到(0,0,100)
  const posKF = new THREE.KeyframeTrack("winter.position", times, values);
  // 从2秒到5秒，物体从红色逐渐变化为蓝色
  const colorKF = new THREE.KeyframeTrack(
    "winter.material.color",
    [2, 10],
    [0, 0, 1, 1, 0, 0]
  );
  // 1.3 基于关键帧数据，创建一个clip关键帧动画对象，命名"test"，持续时间6秒。
  const clip = new THREE.AnimationClip("test", 10, [posKF, colorKF]);
  //包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
  mixer = new THREE.AnimationMixer(cube);
  const clipAction = mixer.clipAction(clip);
  clipAction.loop = THREE.LoopOnce; //不循环播放
  clipAction.clampWhenFinished = true; //物体状态停留在动画结束的时候
  //.play()控制动画播放，默认循环播放
  clipAction.play();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function execute() {
  requestAnimationFrame(execute);
  controls.update();
  const frameT = clock.getDelta();
  mixer.update(frameT);
  renderer.render(scene, camera);
}
</script>
