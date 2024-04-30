<template>
  <div></div>
</template>
<script setup>
import * as THREE from "three";

import Stats from "three/addons/libs/stats.module.js";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

let stats;
let camera, scene, renderer, controls;

const settings = {
  metalness: 1.0,
  roughness: 0.4,
  ambientIntensity: 0.2,
  aoMapIntensity: 1.0,
  envMapIntensity: 1.0,
  displacementScale: 2.436143, // from original model
  normalScale: 1.0
};

let mesh, material;
let pointLight, ambientLight;
const height = 500; // of camera frustum
let r = 0.0;
init();
animate();
initGui();

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //场景
  scene = new THREE.Scene();
  //相机
  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera(
    -height * aspect,
    height * aspect,
    height,
    -height,
    1,
    10000
  );
  camera.position.z = 1500;
  scene.add(camera);

  //控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enableDamping = true;

  // 灯光
  {
    ambientLight = new THREE.AmbientLight(0xffffff, settings.ambientIntensity);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xff0000, 1.5, 0, 0);
    pointLight.position.z = 2500;
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff6666, 3, 0, 0);
    camera.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x0000ff, 1.5, 0, 0);
    pointLight3.position.x = -1000;
    pointLight3.position.z = 1000;
    scene.add(pointLight3);
  }

  // env-map
  // CubeTextureLoader
  const path = "src/textures/cube/SwedishRoyalCastle/";
  const format = ".jpg";
  const urls = [
    path + "px" + format,
    path + "nx" + format,
    path + "py" + format,
    path + "ny" + format,
    path + "pz" + format,
    path + "nz" + format
  ];
  const reflectionCube = new THREE.CubeTextureLoader().load(urls);

  // TextureLoader
  const textureLoader = new THREE.TextureLoader();
  const normalMap = textureLoader.load("models/obj/ninja/normal.png");
  const displacementMap = textureLoader.load(
    "models/obj/ninja/displacement.jpg"
  );

  // material
  material = new THREE.MeshStandardMaterial({
    color: 0xc1c1c1,
    side: THREE.DoubleSide,
    roughness: settings.roughness,
    metalness: settings.metalness,

    normalMap: normalMap, //法线贴图
    normalScale: new THREE.Vector2(1, -1), //影响程度

    displacementMap: displacementMap, //位移贴图
    displacementScale: settings.displacementScale, //影响程度

    envMap: reflectionCube, //环境贴图
    envMapIntensity: settings.envMapIntensity //影响程度
  });

  //加载模型
  const loader = new OBJLoader();
  loader.load("models/obj/ninja/ninjaHead_Low.obj", function (group) {
    const geometry = group.children[0].geometry;
    geometry.center();
    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.multiplyScalar(25);
    scene.add(mesh);
  });

  //帧率
  stats = new Stats();
  container.appendChild(stats.dom);

  //监听浏览器变化
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = -height * aspect;
  camera.right = height * aspect;
  camera.top = height;
  camera.bottom = -height;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Init gui
function initGui() {
  const gui = new GUI();
  //let gui = gui.addFolder( "Material" );
  gui
    .add(settings, "metalness")
    .min(0)
    .max(1)
    .onChange(function (value) {
      material.metalness = value;
    });

  gui
    .add(settings, "roughness")
    .min(0)
    .max(1)
    .onChange(function (value) {
      material.roughness = value;
    });

  gui
    .add(settings, "aoMapIntensity")
    .min(0)
    .max(1)
    .onChange(function (value) {
      material.aoMapIntensity = value;
    });

  gui
    .add(settings, "ambientIntensity")
    .min(0)
    .max(1)
    .onChange(function (value) {
      ambientLight.intensity = value;
    });

  gui
    .add(settings, "envMapIntensity")
    .min(0)
    .max(3)
    .onChange(function (value) {
      material.envMapIntensity = value;
    });

  gui
    .add(settings, "displacementScale")
    .min(0)
    .max(3.0)
    .onChange(function (value) {
      material.displacementScale = value;
    });

  gui
    .add(settings, "normalScale")
    .min(-1)
    .max(1)
    .onChange(function (value) {
      material.normalScale.set(1, -1).multiplyScalar(value);
    });
}

//动画
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  stats.begin();
  render();
  stats.end();
}

//渲染
function render() {
  //聚光灯旋转
  pointLight.position.x = 2500 * Math.cos(r);
  pointLight.position.z = 2500 * Math.sin(r);
  r += 0.01;
  renderer.render(scene, camera);
}
</script>
