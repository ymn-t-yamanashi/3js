
import * as THREE from 'three';

export const hooks = {
  v: {},
  threejs: {
    mounted() {
      console.log("mounted");
      this.handleEvent("add", ({ x, y, z }) => {
        add(scene, x, y, z)
      });
      v = init(this.el);

    },
    updated() {
      console.log("updated");
      dataset = this.el.dataset
      console.log(dataset.data);
      v.cube.rotation.x = dataset.data;
      v.render()
    },
  },
};
function add(scene, x, y, z) {
  const geometry = new THREE.BoxGeometry(x, y, z);

  // マテリアルを作成
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // メッシュ（ジオメトリとマテリアルを組み合わせたもの）を作成
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  return cube;
}

function init(el) {
  // シーンの作成
  const scene = new THREE.Scene();

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(75, 1000 / 800, 0.1, 1000);
  camera.position.z = 5;

  // レンダラーの作成
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(1000, 800);
  el.appendChild(renderer.domElement);

  cube = add(scene, 2, 2, 2)

  cube.rotation.x += 0.31;
  cube.rotation.y += 0.31;


  function render() {
    renderer.render(scene, camera);
  }

  render();
  return { "cube": cube, "render": render, "scene": scene };
}


