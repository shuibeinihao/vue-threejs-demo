<template>
  <!-- <div id="tag">万物归一</div> -->
  <div id="changeColor" class="btn">改变颜色</div>
  <div id="changePosition" class="btn">改变坐标</div>
  <div id="animation" class="btn">旋转跳跃</div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { showSuccessToast } from "vant";
import { OrbitControls } from "three/examples/jsm/controls/orbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { onMounted } from "vue";
import snow001 from "../../textures/sprites/snow001.png";
import grasslight from "../../textures/terrain/grasslight-big.jpg";
// import ShaderBall from "../models/gltf/ShaderBall.glb";
let camera: any,
  scene: any,
  renderer: any,
  model: any,
  controls: any,
  group: any,
  css2Renderer: any;

// 监听鼠标事件
let mouseDownTime: number, mouseUpTime, timeDifference: number;

onMounted(() => {
  init();
  initTag();

  rain();
  onClick();
  animate();
});

//初始化相机场景渲染器
const init = () => {
  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#000");
  scene.fog = new THREE.FogExp2(scene.background, 0.002);
  // 创建相机-拍照
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    200,
    10000
  );
  camera.position.set(0, 0, 500);
  camera.lookAt(0, 0, 0);
  // 创建渲染器-洗照片打印照片
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true; //阴影需要
  // 渲染器渲染好的内容（洗好的照片）插入到页面上
  document.body.appendChild(renderer.domElement);

  //监听鼠标事件记录点击时间
  renderer.domElement.addEventListener("mousedown", () => {
    mouseDownTime = Date.now();
  });
  renderer.domElement.addEventListener("mouseup", () => {
    mouseUpTime = Date.now();
    timeDifference = mouseUpTime - mouseDownTime;
  });

  //控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 5, 0);
  controls.maxPolarAngle = Math.PI / 2;
  controls.minDistance = 300;
  controls.maxDistance = 600;
  controls.update();

  //环境光
  const ambientLight = new THREE.AmbientLight(0xcccccc);
  ambientLight.name = "AmbientLight";
  scene.add(ambientLight);

  //平行光
  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.target.position.set(0, 0, -1);
  dirLight.add(dirLight.target);
  dirLight.lookAt(-1, -1, 0);
  dirLight.name = "DirectionalLight";
  dirLight.castShadow = true;
  scene.add(dirLight);
  //window resize监听
  window.addEventListener("resize", onWindowResize);

  //创建地面
  createGround();

  //加载gltf模型
  loaderGLTF();
};

//创建草地
const createGround = () => {
  // GROUND
  const groundGeo = new THREE.PlaneGeometry(1000, 1000);
  var loader = new THREE.TextureLoader();
  var loaderTexture = loader.load(grasslight);
  loaderTexture.wrapS = THREE.RepeatWrapping;
  loaderTexture.wrapT = THREE.RepeatWrapping;

  const groundMat = new THREE.MeshLambertMaterial({
    map: loaderTexture,
    side: THREE.DoubleSide
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -80;
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.name = "ground";
  scene.add(ground);
};

//加载gltf模型
const loaderGLTF = () => {
  const loader = new GLTFLoader();
  loader.load("models/gltf/ShaderBall.glb", function (gltf) {
    model = gltf.scene;
    model.scale.setScalar(50);
    model.position.set(0, -80, 0);
    model.traverse(function (obj: any) {
      if (obj.isMesh) {
        //UI按钮与3D对象交互
        handleMesh(obj);
      }
    });
    scene.add(model);
  });
};

//UI按钮与3D对象交互
const handleMesh = (_obj: any) => {
  //模型节点名字
  console.log("模型节点名字", _obj.name);
  (document.getElementById("changeColor") as HTMLHtmlElement).addEventListener(
    "click",
    function () {
      _obj.material.color.set("#f00");
    }
  );
  (
    document.getElementById("changePosition") as HTMLHtmlElement
  ).addEventListener("click", function () {
    _obj.position.set(1, 1, 2);
  });
  (document.getElementById("animation") as HTMLHtmlElement).addEventListener(
    "click",
    function () {
      animateChange();
    }
  );
};

//gltf模型旋转
const animateChange = () => {
  requestAnimationFrame(animateChange);
  model.rotation.y += 0.01;
  renderer.render(scene, camera);
};

//模型点击事件
const onClick = () => {
  // 创建一个 Raycaster 对象
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  // 在鼠标点击事件中更新 raycaster 和 mouse
  function onMouseClick(event: any) {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围都是 (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // 通过鼠标点的位置和当前相机的矩阵更新射线
    raycaster.setFromCamera(mouse, camera);
    // 计算物体和射线的交点
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0 && timeDifference < 100) {
      // 如果射线与物体有交点，那么交点就在 intersects 数组中
      var object = intersects[0].object;
      console.log("点击了", object.name); // 输出被点击的对象的名称
      switch (object.name) {
        case "Calibration_Mesh":
          showSuccessToast("点击了天使之眼~球！");
          break;
        case "Preview_Mesh":
          showSuccessToast("点击了天使之眼！");
          break;
        case "ground":
          showSuccessToast("点击了大草原！");
          break;
        case "snow":
          showSuccessToast("点击了雪花！");
          break;
        default:
        // 其他情况的处理
      }
    }
  }
  window.addEventListener("click", onMouseClick, false);
};

//模拟下雨下雪
const rain = () => {
  // 加载雨滴理贴图
  var textureTree = new THREE.TextureLoader().load(snow001);
  // 创建一个组表示所有的雨滴
  group = new THREE.Group();
  // 批量创建雨滴精灵模型
  for (let i = 0; i < 400; i++) {
    const spriteMaterial = new THREE.SpriteMaterial({
      map: textureTree //设置精灵纹理贴图
    });
    // 创建精灵模型对象
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.name = "snow";
    scene.add(sprite);
    // 控制精灵大小,
    sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
    const k1 = Math.random() - 0.5;
    const k2 = Math.random() - 0.5;
    // 设置精灵模型位置，在空间中随机分布
    sprite.position.set(1000 * k1, 300 * Math.random(), 1000 * k2);
    group.add(sprite);
  }
  scene.add(group); //雨滴群组插入场景中
};

//window resize
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  controls.update();
  renderer.setSize(window.innerWidth, window.innerHeight);
  css2Renderer.setSize(window.innerWidth, window.innerHeight);
};

//动画
const animate = () => {
  requestAnimationFrame(animate);
  //物体
  // model.rotation.y += 0.01;
  //雨滴动画
  // 每次渲染都会更新雨滴的位置，进而产生动画效果
  group.children.forEach((sprite: any) => {
    // 雨滴的y坐标每次减1
    sprite.position.y -= 0.5;
    if (sprite.position.y < -70) {
      // 如果雨滴落到地面，重置y，从新下落
      sprite.position.y = 200;
    }
  });
  render();
};

//渲染
const render = () => {
  renderer.render(scene, camera);
  css2Renderer.render(scene, camera);
};

const initTag = () => {
  const changeColorDiv = document.getElementById(
    "changeColor"
  ) as HTMLHtmlElement;
  const changePositionDiv = document.getElementById(
    "changePosition"
  ) as HTMLHtmlElement;
  const animationDiv = document.getElementById("animation") as HTMLHtmlElement;
  // HTML元素转化为threejs的CSS2网格模型对象
  const changeColorMesh = new CSS2DObject(changeColorDiv);
  const changePositionMesh = new CSS2DObject(changePositionDiv);
  const animationMesh = new CSS2DObject(animationDiv);
  changeColorMesh.position.set(0, 100, 100);
  changePositionMesh.position.set(-100, 100, 100);
  animationMesh.position.set(100, 100, 100);
  scene.add(changeColorMesh, changePositionMesh, animationMesh);

  // 创建一个CSS2渲染器CSS2DRenderer WebGLRenderer主要是渲染threejs自身的网格、点、线等模型，CSS2DRenderer用来渲染HTML元素标签对应的CSS2模型对象CSS2DObject。
  css2Renderer = new CSS2DRenderer();
  css2Renderer.setSize(window.innerWidth, window.innerHeight);
  // 使HTML标签<div id="tag"></div>外面父元素叠加到canvas画布上且重合
  css2Renderer.domElement.style.position = "absolute";
  css2Renderer.domElement.style.top = "0px";
  //设置.pointerEvents=none，解决HTML元素标签对threejs canvas画布鼠标事件的遮挡
  // css2Renderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(css2Renderer.domElement);
};
</script>
<style scoped lang="less">
.btn {
  background: #066;
  color: #fff;
  padding: 5px 10px;
  border-radius: 3px;
}
</style>
