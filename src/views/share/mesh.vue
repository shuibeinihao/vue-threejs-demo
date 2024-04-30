<template>
  <div>
    <canvas id="c"></canvas>
  </div>
</template>
<script setup>
import * as THREE from "three";
import { onMounted } from "vue";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 40;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 120;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#000");
  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, -2, -4);
    scene.add(light);
  }

  const objects = [];
  const spread = 15;

  function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }

  function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      color: "#2274db",
      side: THREE.DoubleSide,
      wireframe: true
      //线条模式渲染mesh对应的三角形数据
    });
    return material;
  }

  function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }

  function addLineGeometry(x, y, geometry) {
    const material = new THREE.LineBasicMaterial({ color: "#2274db" });
    const mesh = new THREE.LineSegments(geometry, material);
    addObject(x, y, mesh);
  }

  //立方缓冲几何体（BoxGeometry） 创建立方体或者不规则四边形
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    // width — X轴上面的宽度，默认值为1。
    // height — Y轴上面的高度，默认值为1。
    // depth — Z轴上面的深度，默认值为1。
    // widthSegments — （可选）宽度的分段数，默认值是1。
    // heightSegments — （可选）高度的分段数，默认值是1。
    // depthSegments — （可选）深度的分段数，默认值是1
    // addSolidGeometry(
    //   -2,
    //   2,
    //   new THREE.BoxGeometry(width, height, depth, 2, 2, 2)
    //   // 几何体的分段数决定了该几何体表面的细节程度。较高的分段数可以增加几何体的分辨率和平滑度，但同时也会增加渲染时间和计算负担。较低的分段数则会降低几何体的分辨率和平滑度，但可以提高渲染速度和计算效率。因此，在创建几何体时需要根据实际需求来选择合适的分段数。
    // );
  }

  // 圆柱缓冲几何体（CylinderGeometry）一个用于生成圆柱几何体的类
  {
    const radiusTop = 4;
    const radiusBottom = 4;
    const height = 8;
    const radialSegments = 15;
    // radiusTop — 圆柱的顶部半径，默认值是1。
    // radiusBottom — 圆柱的底部半径，默认值是1。
    // height — 圆柱的高度，默认值是1。
    // radialSegments — 圆柱侧面周围的分段数，默认为32。
    // heightSegments — 圆柱侧面沿着其高度的分段数，默认值为1。
    // openEnded — 一个Boolean值，指明该圆锥的底面是开放的还是封顶的。默认值为false，即其底面默认是封顶的。
    // thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）
    // thetaLength — 圆柱底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆柱。
    // addSolidGeometry(
    //   1,
    //   2,
    //   new THREE.CylinderGeometry(
    //     radiusTop,
    //     radiusBottom,
    //     height,
    //     radialSegments,
    //     2,
    //     false,
    //     0,
    //     2 * Math.PI - 1
    //   )
    // );
  }

  // 圆形缓冲几何体（CircleGeometry）创建规则多边形，其分段数量取决于该规则多边形的边数
  {
    const radius = 7;
    const segments = 10;
    // radius — 圆形的半径，默认值为1
    // segments — 分段（三角面）的数量，最小值为3，默认值为32。
    // thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）
    // thetaLength — 圆形扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆。
    // addSolidGeometry(-1, 2, new THREE.CircleGeometry(radius, segments));
  }

  // 圆锥缓冲几何体（ConeGeometry）一个用于生成圆锥几何体的类
  {
    const radius = 6;
    const height = 8;
    const segments = 16;
    // radius — 圆锥底部的半径，默认值为1。
    // height — 圆锥的高度，默认值为1。
    // radialSegments — 圆锥侧面周围的分段数，默认为32。
    // heightSegments — 圆锥侧面沿着其高度的分段数，默认值为1。
    // openEnded — 一个Boolean值，指明该圆锥的底面是开放的还是封顶的。默认值为false，即其底面默认是封顶的。
    // thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）
    // thetaLength — 圆锥底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆锥。
    // addSolidGeometry(0, 2, new THREE.ConeGeometry(radius, height, segments));
  }

  // 十二面缓冲几何体（DodecahedronGeometry）一个用于创建十二面几何体的类
  {
    const radius = 7;
    // radius — 十二面体的半径，默认值为1。
    // detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个十二面体。
    // addSolidGeometry(2, 2, new THREE.DodecahedronGeometry(radius, 1));
  }

  // 挤压缓冲几何体（ExtrudeGeometry）从一个形状路径中，挤压出一个BufferGeometry
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 6
    };
    // shapes — 形状或者一个包含形状的数组。
    // options — 一个包含有下列参数的对象：

    // curveSegments — int，曲线上点的数量，默认值是12。
    // steps — int，用于沿着挤出样条的深度细分的点的数量，默认值为1。
    // depth — float，挤出的形状的深度，默认值为1。
    // bevelEnabled — bool，对挤出的形状应用是否斜角，默认值为true。
    // bevelThickness — float，设置原始形状上斜角的厚度。默认值为0.2。
    // bevelSize — float。斜角与原始形状轮廓之间的延伸距离，默认值为bevelThickness-0.1。
    // bevelOffset — float. Distance from the shape outline that the bevel starts. Default is 0.
    // bevelSegments — int。斜角的分段层数，默认值为3。
    // extrudePath — THREE.Curve对象。一条沿着被挤出形状的三维样条线。Bevels not supported for path extrusion.
    // UVGenerator — Object。提供了UV生成器函数的对象。
    // 该对象将一个二维形状挤出为一个三维几何体。
    // addSolidGeometry(-2, 1, new THREE.ExtrudeGeometry(shape, extrudeSettings));
  }

  // 二十面缓冲几何体（IcosahedronGeometry）一个用于生成二十面体的类
  {
    const radius = 7;
    // radius — 二十面体的半径，默认为1。
    // detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个二十面体。当这个值大于1的时候，实际上它将变成一个球体。
    // addSolidGeometry(-1, 1, new THREE.IcosahedronGeometry(radius, 0));
  }

  // 车削缓冲几何体（LatheGeometry）创建具有轴对称性的网格，比如花瓶。车削绕着Y轴来进行旋转
  // 车削几何体是3D打印中的一个术语，指的是将一个二维图形沿着中轴线旋转360度形成的三维物体。这个过程叫做车削
  {
    const points = [];
    for (let i = 0; i < 10; ++i) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8));
    }
    // points — 一个Vector2对象数组。每个点的X坐标必须大于0。 Default is an array with (0,-0.5), (0.5,0) and (0,0.5) which creates a simple diamond shape.
    // segments — 要生成的车削几何体圆周分段的数量，默认值是12。
    // phiStart — 以弧度表示的起始角度，默认值为0。
    // phiLength — 车削部分的弧度（0-2PI）范围，2PI将是一个完全闭合的、完整的车削几何体，小于2PI是部分的车削。默认值是2PI
    // addSolidGeometry(0, 1, new THREE.LatheGeometry(points));
  }

  // 八面缓冲几何体（OctahedronGeometry）一个用于创建八面体的类
  {
    const radius = 7;
    // radius — 八面体的半径，默认值为1。
    // detail — 默认值为0，将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个八面体。
    // addSolidGeometry(1, 1, new THREE.OctahedronGeometry(radius));
  }

  // 平面缓冲几何体（PlaneGeometry）一个用于生成平面几何体的类
  {
    const width = 9;
    const height = 9;
    const widthSegments = 2;
    const heightSegments = 2;
    // width — 平面沿着X轴的宽度。默认值是1。
    // height — 平面沿着Y轴的高度。默认值是1。
    // widthSegments — （可选）平面的宽度分段数，默认值是1。
    // heightSegments — （可选）平面的高度分段数，默认值是1。
    // addSolidGeometry(
    //   -2,
    //   0,
    //   new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
    // );
  }

  // 多面缓冲几何体（PolyhedronGeometry）
  {
    const verticesOfCube = [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
      -1, 1, 1
    ];
    const indicesOfFaces = [
      2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2,
      3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4
    ];
    const radius = 7;
    const detail = 2;
    // addSolidGeometry(
    //   -1,
    //   0,
    //   new THREE.PolyhedronGeometry(
    //     verticesOfCube,
    //     indicesOfFaces,
    //     radius,
    //     detail
    //   )
    // );
  }

  // 圆环缓冲几何体（RingGeometry）一个用于生成二维圆环几何体的类
  {
    const innerRadius = 2;
    const outerRadius = 7;
    const segments = 18;
    // innerRadius — 内部半径，默认值为0.5。
    // outerRadius — 外部半径，默认值为1。
    // thetaSegments — 圆环的分段数。这个值越大，圆环就越圆。最小值为3，默认值为32。
    // phiSegments — 最小值为1，默认值为8。
    // thetaStart — 起始角度，默认值为0。
    // thetaLength — 圆心角，默认值为Math.PI * 2。
    // addSolidGeometry(
    //   0,
    //   0,
    //   new THREE.RingGeometry(innerRadius, outerRadius, segments)
    // );
  }

  // 形状缓冲几何体（ShapeGeometry）从一个或多个路径形状中创建一个单面多边形几何体
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    // shapes — 一个单独的shape，或者一个包含形状的Array。Default is a single triangle shape.
    // curveSegments - Integer - 每一个形状的分段数，默认值为12。
    // addSolidGeometry(1, 0, new THREE.ShapeGeometry(shape));
  }

  // 球缓冲几何体（SphereGeometry）一个用于生成球体的类
  {
    const radius = 7;
    const widthSegments = 12;
    const heightSegments = 8;
    // radius — 球体半径，默认为1。
    // widthSegments — 水平分段数（沿着经线分段），最小值为3，默认值为32。
    // heightSegments — 垂直分段数（沿着纬线分段），最小值为2，默认值为16。
    // phiStart — 指定水平（经线）起始角度，默认值为0。。
    // phiLength — 指定水平（经线）扫描角度的大小，默认值为 Math.PI * 2。
    // thetaStart — 指定垂直（纬线）起始角度，默认值为0。
    // thetaLength — 指定垂直（纬线）扫描角度大小，默认值为 Math.PI。
    // addSolidGeometry(
    //   2,
    //   0,
    //   new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    // );
  }

  // 四面缓冲几何体（TetrahedronGeometry）一个用于生成四面几何体的类
  {
    const radius = 7;
    // radius — 四面体的半径，默认值为1。
    // detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个四面体
    // addSolidGeometry(-2, -1, new THREE.TetrahedronGeometry(radius));
  }

  // 圆环缓冲几何体（TorusGeometry）一个用于生成圆环几何体的类
  {
    const radius = 5;
    const tubeRadius = 2;
    const radialSegments = 8;
    const tubularSegments = 24;
    // radius - 环面的半径，从环面的中心到管道横截面的中心。默认值是1。
    // tube — 管道的半径，默认值为0.4。
    // radialSegments — 管道横截面的分段数，默认值为12。
    // tubularSegments — 管道的分段数，默认值为48。
    // arc — 圆环的圆心角（单位是弧度），默认值为Math.PI * 2
    // addSolidGeometry(
    //   0,
    //   -1,
    //   new THREE.TorusGeometry(
    //     radius,
    //     tubeRadius,
    //     radialSegments,
    //     tubularSegments
    //   )
    // );
  }

  // 圆环缓冲扭结几何体（TorusKnotGeometry）创建一个圆环扭结，其特殊形状由一对互质的整数，p和q所定义。如果p和q不互质，创建出来的几何体将是一个环面链接
  {
    const radius = 5.5;
    const tube = 0.5;
    const radialSegments = 3;
    const tubularSegments = 64;
    const p = 2;
    const q = 3;
    // 创建一个圆环扭结，其特殊形状由一对互质的整数，p和q所定义。如果p和q不互质，创建出来的几何体将是一个环面链接。
    // radius - 圆环的半径，默认值为1。
    // tube — 管道的半径，默认值为0.4。
    // tubularSegments — 管道的分段数量，默认值为64。
    // radialSegments — 横截面分段数量，默认值为8。
    // p — 这个值决定了几何体将绕着其旋转对称轴旋转多少次，默认值是2。
    // q — 这个值决定了几何体将绕着其内部圆环旋转多少次，默认值是3。
    // addSolidGeometry(
    //   1,
    //   -1,
    //   new THREE.TorusKnotGeometry(
    //     radius,
    //     tube,
    //     tubularSegments,
    //     radialSegments,
    //     p,
    //     q
    //   )
    // );
  }

  // 管道缓冲几何体（TubeGeometry）创建一个沿着三维曲线延伸的管道
  {
    class CustomSinCurve extends THREE.Curve {
      constructor(scale) {
        super();
        this.scale = scale;
      }
      getPoint(t) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin(2 * Math.PI * t);
        const tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(4);
    const tubularSegments = 20;
    const radius = 1;
    const radialSegments = 8;
    const closed = false;
    // path — Curve - 一个由基类Curve继承而来的3D路径。 Default is a quadratic bezier curve.
    // tubularSegments — Integer - 组成这一管道的分段数，默认值为64。
    // radius — Float - 管道的半径，默认值为1。
    // radialSegments — Integer - 管道横截面的分段数目，默认值为8。
    // closed — Boolean 管道的两端是否闭合，默认值为false。
    // addSolidGeometry(
    //   2,
    //   -1,
    //   new THREE.TubeGeometry(
    //     path,
    //     tubularSegments,
    //     radius,
    //     radialSegments,
    //     closed
    //   )
    // );
  }

  // 边缘几何体（EdgesGeometry）这可以作为一个辅助对象来查看geometry的边缘。
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    const thresholdAngle = 15;
    // addLineGeometry(
    //   -1,
    //   -2,
    //   new THREE.EdgesGeometry(
    //     new THREE.BoxGeometry(width, height, depth, 2, 2, 2),
    //     thresholdAngle
    //   )
    // );
  }

  // 网格几何体（WireframeGeometry）
  // 这个类可以被用作一个辅助物体，来对一个geometry以线框的形式进行查看。
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    // 在Three.js中，边缘几何体和网格几何体有着明显的区别。
    // 首先，边缘几何体是用来绘制物体的边缘线，它可以用来框住某个具体的物体，
    // 例如一个立方体或者球体等。而网格几何体是由顶点、线和面构成的图形，
    // 这种几何体决定了3D物体的形状和大小。实际上，网格几何体是一种线构成的图形，
    // 这与材质中的wireframe类似，但二者其实有明显的区别。网格几何体是通过geometry的方式定义的，
    // 也就是说，几何体本身就由线条构成；而wireframe则是给物体披上了一层透明的“衣服”，
    // 使得你只能看到线条
    // addLineGeometry(
    //   1,
    //   -2,
    //   new THREE.WireframeGeometry(
    //     new THREE.BoxGeometry(width, height, depth, 2, 2, 2)
    //   )
    // );
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

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj, ndx) => {
      const speed = 0.1 + ndx * 0.05;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
onMounted(() => {
  main();
});
</script>
<style scoped lang="less"></style>
