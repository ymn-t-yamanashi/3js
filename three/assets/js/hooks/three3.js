
import * as THREE from 'three';

const Three2 = {
  v: {},
  mounted() {
    this.handleEvent("move", ({ "x": x }) => {
      console.log(v.cube)
      v.cube.position.x = x;
      console.log(x)
      v.render();
    });
    v = init(this.el);
  }
};
function init(el) {
  // シーンの作成
  const scene = new THREE.Scene();
  // カメラの作成
  const camera = new THREE.PerspectiveCamera(75, 1000 / 800, 0.1, 1000);
  camera.position.z = 1.7;
  camera.position.y = 0.8;
  // レンダラーの作成
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(1000, 800);
  el.appendChild(renderer.domElement);

  // 立方体のジオメトリを作成
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

  // マテリアルを作成
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ee });

  // メッシュ（ジオメトリとマテリアルを組み合わせたもの）を作成
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = 0

  function render() {
    renderer.render(scene, camera);
  }

  render()
  return { "cube": cube, "render": render };
}

export default Three2