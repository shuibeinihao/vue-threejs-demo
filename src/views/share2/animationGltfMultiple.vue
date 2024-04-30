<template>
  <div id="container"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer;
let clock: THREE.Clock;

const mixers: THREE.AnimationMixer[] = [];

init();
animate();

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

  clock = new THREE.Clock();

  //场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

  //环境光
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  //定向光
  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(-3, 10, -10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 4;
  dirLight.shadow.camera.bottom = -4;
  dirLight.shadow.camera.left = -4;
  dirLight.shadow.camera.right = 4;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight);

  // ground
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  //加载gltf模型
  const loader = new GLTFLoader();
  loader.load(
    "models/gltf/Soldier.glb",
    function (gltf: {
      scene: { traverse: (arg0: (object: any) => void) => void };
      animations: THREE.AnimationClip[];
    }) {
      gltf.scene.traverse(function (object: {
        isMesh: any;
        castShadow: boolean;
      }) {
        if (object.isMesh) object.castShadow = true;
      });

      console.log(gltf);

      const model1 = SkeletonUtils.clone(gltf.scene);
      const model2 = SkeletonUtils.clone(gltf.scene);
      const model3 = SkeletonUtils.clone(gltf.scene);
      const model4 = SkeletonUtils.clone(gltf.scene);

      const mixer1 = new THREE.AnimationMixer(model1);
      const mixer2 = new THREE.AnimationMixer(model2);
      const mixer3 = new THREE.AnimationMixer(model3);
      const mixer4 = new THREE.AnimationMixer(model4);

      mixer1.clipAction(gltf.animations[0]).play(); // idle -- 闲着
      mixer2.clipAction(gltf.animations[1]).play(); // run
      mixer3.clipAction(gltf.animations[2]).play(); // TPose
      mixer4.clipAction(gltf.animations[3]).play(); // walk

      model1.position.x = 3;
      model2.position.x = 1.5;
      model3.position.x = 0;
      model4.position.x = -1.5;

      scene.add(model1, model2, model3, model4);
      mixers.push(mixer1, mixer2, mixer3, mixer4);

      animate();
    }
  );

  //渲染
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  for (const mixer of mixers) mixer.update(delta);

  renderer.render(scene, camera);
}
</script>
