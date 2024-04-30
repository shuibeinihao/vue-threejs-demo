/// <reference types="vite/client" />
export {};
declare global {
  interface Window {
    wx: any; //全局变量名
  }
}

// 这段代码告诉 TypeScript，所有以 .vue 结尾的文件都是 Vue 组件，可以通过 import 语句进行导入。这样做通常可以解决无法识别模块的问题
declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
