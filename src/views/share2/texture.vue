<template>
  <div></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { DoubleSide } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
const main = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const scene = new THREE.Scene();
  // const axesHelper = new THREE.AxesHelper(1);
  // scene.add(axesHelper);
  // 10.添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 监听控制器事件
  controls.addEventListener("change", () => {
    // 执行渲染操作
    renderer.render(scene, camera);
  });

  let cube: THREE.Object3D<THREE.Object3DEventMap>;
  const geometry = new THREE.BoxGeometry(2, 2, 2); // 创建一个立方体网格

  //普通纹理贴图--凸凹贴图
  {
    // const textureLoader = new THREE.TextureLoader(); // 添加纹理加载器
    // const normalTexture = textureLoader.load("/src/textures/brick_diffuse.jpg");
    // const bumpTexture = textureLoader.load("/src/textures/brick_bump.jpg"); //一张灰度图 ps叠加原理
    // const material = new THREE.MeshPhongMaterial({
    //   // color: "#00f",
    //   map: normalTexture, //使用纹理贴图
    //   bumpMap: bumpTexture, //使用凹凸贴图
    //   bumpScale: 0.5 //调整凹凸程度
    // });
    // cube = new THREE.Mesh(geometry, material);
    // scene.add(cube); // 将立方体添加到场景中
    // AmbientLight(); //环境光
    // DirectionalLight(); //方向光
  }

  // 高光贴图
  {
    // const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    // dirLight.position.set(-1, 0, 1).normalize();
    // scene.add(dirLight);
    // const textureLoader = new THREE.TextureLoader();
    // const normalMap = textureLoader.load(
    //   "/src/textures/planets/earth_atmos_2048.jpg"
    // );
    // const specularMap = textureLoader.load(
    //   "/src/textures/planets/earth_specular_2048.jpg"
    // );
    // const materialNormalMap = new THREE.MeshPhongMaterial({
    //   map: normalMap,
    //   shininess: 10, //反射光强度。数值越高，反射光越强，高光越明显
    //   specular: 0x7c7c7c, //镜面反射颜色
    //   specularMap: specularMap //它定义了物体在光线照射下产生的反射和眩光效果
    // });
    // const geometry = new THREE.SphereGeometry(2, 100, 50);
    // const meshPlanet = new THREE.Mesh(geometry, materialNormalMap);
    // meshPlanet.rotation.y = 0;
    // meshPlanet.rotation.z = 0.4;
    // scene.add(meshPlanet);
    // AmbientLight(); //环境光
  }

  // 自发光贴图
  {
    // const textureLoader = new THREE.TextureLoader();
    // const emissiveMap = textureLoader.load(
    //   "/src/textures/decal/decal-diffuse.png"
    // );
    // // 创建材质
    // const material = new THREE.MeshStandardMaterial({
    //   emissiveMap: emissiveMap, // 设置纹理贴图
    //   emissive: "#f00", // 设置自发光颜色
    //   emissiveIntensity: 1, // 设置自发光强度
    //   map: textureLoader.load("/src/textures/decal/decal-normal.jpg"), // 设置法线贴图（可选）
    //   normalScale: new THREE.Vector2(0.85, -0.85) // 设置法线贴图缩放因子（可选）
    // });
    // // 创建几何体（例如立方体）
    // cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    // AmbientLight(); //环境光
  }

  //粗糙度贴图
  {
    {
      const bulbLight = new THREE.PointLight(0xffee88, 4, 100, 2);
      const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8);
      const bulbMat = new THREE.MeshStandardMaterial({
        emissive: 0xffffee,
        emissiveIntensity: 1,
        color: 0x000000
      });
      bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
      bulbLight.position.set(0, 2, 0);
      bulbLight.castShadow = true;
      scene.add(bulbLight);

      const hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
      scene.add(hemiLight);
    }

    const floorMat = new THREE.MeshStandardMaterial({
      roughness: 0.8, //平滑度或光泽度
      color: 0xffffff,
      metalness: 0.2 //金属特性的程度，包括质地、光泽、硬度
    });
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/src/textures/hardwood2_diffuse.jpg", function (map) {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.repeat.set(10, 24); //纹理贴图在S轴和T轴上的重复次数
      map.colorSpace = THREE.SRGBColorSpace; //在渲染过程中，使用这种颜色空间可以更好地匹配人眼在自然环境中的颜色感知
      floorMat.map = map;
      floorMat.needsUpdate = true;
    });

    textureLoader.load("/src/textures/hardwood2_roughness.jpg", function (map) {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.repeat.set(10, 24);
      floorMat.roughnessMap = map; //粗糙度贴图--平滑度或光泽度
      floorMat.needsUpdate = true;
    });

    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    floorMesh.receiveShadow = true;
    floorMesh.rotation.x = -Math.PI / 2.0;
    scene.add(floorMesh);
  }

  //光源--环境光
  function AmbientLight() {
    const color = "#fff";
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
  }

  //光源--方向光
  function DirectionalLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 3, 0);
    light.target.position.set(-1, 0, 0);
    scene.add(light);
    scene.add(light.target);
    // const helper = new THREE.DirectionalLightHelper(light);
    // scene.add(helper);
    // eslint-disable-next-line no-inner-declarations
    function updateLight() {
      light.target.updateMatrixWorld();
      // helper.update();
    }
    updateLight();
  }

  const render = () => {
    // cube.rotation.x += 0.001; // 让立方体每帧旋转一定的角度，以产生动态效果
    // cube.rotation.y += 0.001;
    //canvas viewport变化 自适应
    {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};
main();
</script>
<style scoped lang="less"></style>
