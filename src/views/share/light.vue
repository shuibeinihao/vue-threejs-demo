<template>
  <div></div>
</template>
<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const main = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 50;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  {
    const planeSize = 40;
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejs.org/manual/examples/resources/images/checker.png"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 1, 0);
    scene.add(mesh);
  }

  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  //光源--环境光
  {
    const color = "#fff";
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
  }

  //光源--方向光
  {
    //   const color = 0xffffff;
    //   const intensity = 1;
    //   const light = new THREE.DirectionalLight(color, intensity);
    //   light.position.set(0, 10, 0);
    //   light.target.position.set(-5, 0, 0);
    //   scene.add(light);
    //   scene.add(light.target);
    //   const helper = new THREE.DirectionalLightHelper(light);
    //   scene.add(helper);
    //   // eslint-disable-next-line no-inner-declarations
    //   function updateLight() {
    //     light.target.updateMatrixWorld();
    //     helper.update();
    //   }
    //   updateLight();
  }

  //光源--点光源
  {
    //   const color = 0xffffff;
    //   const intensity = 150;
    //   const light = new THREE.PointLight(color, intensity);
    //   light.position.set(0, 10, 0);
    //   scene.add(light);
    //   const helper = new THREE.PointLightHelper(light);
    //   scene.add(helper);
  }

  //光源--聚光灯
  {
    //   const color = 0xffffff;
    //   const intensity = 150;
    //   const light = new THREE.SpotLight(color, intensity);
    //   light.position.set(0, 15, 0);
    //   light.target.position.set(-5, 0, 0);
    //   scene.add(light);
    //   scene.add(light.target);
    //   const helper = new THREE.SpotLightHelper(light);
    //   scene.add(helper);
    //   // eslint-disable-next-line no-inner-declarations
    //   function updateLight() {
    //     light.target.updateMatrixWorld();
    //     helper.update();
    //   }
    //   updateLight();
  }

  //光源--半球光
  {
    // const skyColor = "#f00";
    // const groundColor = "#00f";
    // const intensity = 1;
    // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    // scene.add(light);
    // const helper = new THREE.HemisphereLightHelper(light, 5);
    // scene.add(helper);
  }

  const render = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

main();
</script>
<style scoped lang="less"></style>
