<template>
  <canvas id="c"></canvas>
</template>
<script setup>
import * as THREE from "three";
import { onMounted } from "vue";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function main() {
  const canvas = document.getElementById("c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  let sphere;
  {
    const sphereRadius = 2;
    const sphereWidthDivisions = 40;
    const sphereHeightDivisions = 36;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#00f" });
    sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);
  }

  {
    const color = "#fff";
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
  }

  // 光源--点光源
  {
    const color = 0xffffff;
    const intensity = 150;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(0, 10, 0);
    scene.add(light);
  }

  // 用于模拟方向的3维箭头对象
  {
    // const dir = new THREE.Vector3(0, 0, 0);
    // dir.normalize();
    // const origin = new THREE.Vector3(0, 0, 0);
    // const length = 10;
    // const hex = 0xffff00;
    // const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
    // scene.add(arrowHelper);
  }

  // 用于简单模拟3个坐标轴的对象.红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
  {
    // const axesHelper = new THREE.AxesHelper(10);
    // scene.add(axesHelper);
  }

  //用于图形化地展示对象世界轴心对齐的包围盒的辅助对象
  {
    // const sphere = new THREE.SphereGeometry();
    // const object = new THREE.Mesh(
    //   sphere,
    //   new THREE.MeshBasicMaterial(0xff0000)
    // );
    // const box = new THREE.BoxHelper(object, 0xffff00);
    // scene.add(box);
  }

  //用于图形化地展示对象世界轴心对齐的包围盒的辅助对象
  {
    // const helper = new THREE.BoxHelper(sphere, 0xffff00);
    // scene.add(helper);
  }

  //模拟3维包围盒 Box3 的辅助对象.
  {
    // const box = new THREE.Box3();
    // box.setFromCenterAndSize(
    //   new THREE.Vector3(0, 0, 0),
    //   new THREE.Vector3(3, 3, 3)
    // );
    // const helper = new THREE.Box3Helper(box, 0xffff00);
    // scene.add(helper);
  }

  //坐标格辅助对象. 坐标格实际上是2维线数组.
  {
    // const size = 10;
    // const divisions = 10;
    // const gridHelper = new THREE.GridHelper(size, divisions);
    // scene.add(gridHelper);
  }

  //极坐标格辅助对象. 坐标格实际上是2维线数组.
  {
    // const radius = 10;
    // const sectors = 16;
    // const rings = 8;
    // const divisions = 64;
    // const helper = new THREE.PolarGridHelper(radius, sectors, rings, divisions);
    // scene.add(helper);
  }

  //用于模拟平面 Plane 的辅助对象.
  {
    // const plane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
    // const helper = new THREE.PlaneHelper(plane, 10, 0xffff00);
    // scene.add(helper);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

onMounted(() => {
  main();
});
</script>
