
import * as THREE from 'three';

export const hooks = {
  threejs: {
    v: {},
    mounted() {
      console.log("mounted");
      this.init(this.el);

      this.handleEvent("addCube", data => {
        this.addCube(data.name, data.x, data.y, data.z)
      });

    },
    updated() {
      console.log("updated");
      dataset = this.el.dataset
      this.v.cube.rotation.x = dataset.data;
    },
    addCube(name, x, y, z) {
      const geometry = new THREE.BoxGeometry(x, y, z);

      // マテリアルを作成
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      // メッシュ（ジオメトリとマテリアルを組み合わせたもの）を作成
      const cube = new THREE.Mesh(geometry, material);
      this.v.scene.add(cube);
      this.v[name] = cube;
    },
    init(el) {
      // シーンの作成
      const scene = new THREE.Scene();

      // カメラの作成
      const camera = new THREE.PerspectiveCamera(75, 1000 / 800, 0.1, 1000);
      camera.position.z = 5;

      // レンダラーの作成
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(1000, 800);
      el.appendChild(renderer.domElement);

      function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      }

      render();
      this.v = { "render": render, "scene": scene };
    }
  }
};



