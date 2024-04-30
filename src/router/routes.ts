import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: "home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "home"
        }
      },
      {
        path: "/demo1",
        name: "demo1",
        component: () => import("@/views/控制器辅助坐标系.vue"),
        meta: {
          title: "demo1"
        }
      },
      {
        path: "/demo2",
        name: "demo2",
        component: () => import("@/views/元素位置.vue"),
        meta: {
          title: "demo2"
        }
      },
      {
        path: "/demo3",
        name: "demo3",
        component: () => import("@/views/元素位置GUI.vue"),
        meta: {
          title: "demo3"
        }
      },
      {
        path: "/demo5",
        name: "demo5",
        component: () => import("@/views/lookat.vue"),
        meta: {
          title: "demo5"
        }
      },
      {
        path: "/scene",
        name: "scene",
        component: () => import("@/views/share/scene.vue"),
        meta: {
          title: "scene"
        }
      },
      {
        path: "/camera",
        name: "camera",
        component: () => import("@/views/share/camera.vue"),
        meta: {
          title: "camera"
        }
      },
      {
        path: "/control",
        name: "control",
        component: () => import("@/views/share/control.vue"),
        meta: {
          title: "control"
        }
      },
      {
        path: "/fog",
        name: "fog",
        component: () => import("@/views/share/fog.vue"),
        meta: {
          title: "fog"
        }
      },
      {
        path: "/light",
        name: "light",
        component: () => import("@/views/share/light.vue"),
        meta: {
          title: "light"
        }
      },
      {
        path: "/mesh",
        name: "mesh",
        component: () => import("@/views/share/mesh.vue"),
        meta: {
          title: "mesh"
        }
      },
      {
        path: "/raycaster",
        name: "raycaster",
        component: () => import("@/views/share2/raycaster.vue"),
        meta: {
          title: "raycaster"
        }
      },
      {
        path: "/shadow",
        name: "shadow",
        component: () => import("@/views/share/shadow.vue"),
        meta: {
          title: "shadow"
        }
      },
      {
        path: "/texture",
        name: "texture",
        component: () => import("@/views/share2/texture.vue"),
        meta: {
          title: "texture"
        }
      },
      {
        path: "/helper",
        name: "helper",
        component: () => import("@/views/share2/helper.vue"),
        meta: {
          title: "helper"
        }
      },
      {
        path: "/cubeTexture",
        name: "cubeTexture",
        component: () => import("@/views/share2/cubeTexture.vue"),
        meta: {
          title: "cubeTexture"
        }
      },
      {
        path: "/temp",
        name: "temp",
        component: () => import("@/views/share2/temp.vue"),
        meta: {
          title: "temp"
        }
      },
      {
        path: "/texture2",
        name: "texture2",
        component: () => import("@/views/share2/texture2.vue"),
        meta: {
          title: "texture2"
        }
      },
      {
        path: "/textureLoader",
        name: "textureLoader",
        component: () => import("@/views/share2/textureLoader.vue"),
        meta: {
          title: "textureLoader"
        }
      },
      {
        path: "/fileLoader",
        name: "fileLoader",
        component: () => import("@/views/share2/fileLoader.vue"),
        meta: {
          title: "fileLoader"
        }
      },
      {
        path: "/bufferGeometryLoader",
        name: "bufferGeometryLoader",
        component: () => import("@/views/share2/bufferGeometryLoader.vue"),
        meta: {
          title: "bufferGeometryLoader"
        }
      },
      {
        path: "/audioLoader",
        name: "audioLoader",
        component: () => import("@/views/share2/audioLoader.vue"),
        meta: {
          title: "audioLoader"
        }
      },
      {
        path: "/gltfLoader",
        name: "gltfLoader",
        component: () => import("@/views/share2/gltfLoader.vue"),
        meta: {
          title: "gltfLoader"
        }
      },
      {
        path: "/sceneTag",
        name: "sceneTag",
        component: () => import("@/views/share2/sceneTag.vue"),
        meta: {
          title: "sceneTag"
        }
      },
      {
        path: "/animationGltfMultiple",
        name: "animationGltfMultiple",
        component: () => import("@/views/share2/animationGltfMultiple.vue"),
        meta: {
          title: "animationGltfMultiple"
        }
      },
      {
        path: "/keyFrameAnimation",
        name: "keyFrameAnimation",
        component: () => import("@/views/share2/keyFrameAnimation.vue"),
        meta: {
          title: "keyFrameAnimation"
        }
      },
      {
        path: "/tween",
        name: "tween",
        component: () => import("@/views/share2/tween.vue"),
        meta: {
          title: "tween"
        }
      },
      {
        path: "/cannonjs",
        name: "cannonjs",
        component: () => import("@/views/share2/cannonjs.vue"),
        meta: {
          title: "cannonjs"
        }
      }
    ]
  }
];

export default routes;
