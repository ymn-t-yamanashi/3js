
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const hooks = {
  threejs: {
    v: {},
    mounted() {
      console.log("mounted");
      this.init(this.el);
      this.handleEventInit();
    },
    addCube(name, x, y, z, color) {
      const geometry = new THREE.BoxGeometry(x, y, z);

      // マテリアルを作成
      const material = new THREE.MeshBasicMaterial({ color: color });

      // メッシュ（ジオメトリとマテリアルを組み合わせたもの）を作成
      const cube = new THREE.Mesh(geometry, material);
      this.v.scene.add(cube);
      this.v[name] = cube;
    },
    rotation(name, x, y, z) {
      rotation = this.v[name].rotation;
      if (x != null) rotation.x = x;
      if (y != null) rotation.y = y;
      if (z != null) rotation.y = z;
    },
    position(name, x, y, z) {
      position = this.v[name].position;
      if (x != null) position.x = x;
      if (y != null) position.y = y;
      if (z != null) position.y = z;
    },
    loadModel(name, path) {
      const loader = new GLTFLoader();
      const v = this.v
      loader.load(
        path, // VRoid Studioから出力したVRMファイル名
        function (gltf) {
          model = gltf.scene; // ロードされたシーン全体を格納
          v.scene.add(model);
          v[name] = model;

        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
          console.error('An error happened', error);
        }
      );
    },
    handleEventInit() {
      this.handleEvent("addCube", data => {
        this.addCube(data.name, data.x, data.y, data.z, data.color)
      });

      this.handleEvent("rotation", data => {
        this.rotation(data.name, data.x, data.y, data.z)
      });

      this.handleEvent("position", data => {
        this.position(data.name, data.x, data.y, data.z)
      });

      this.handleEvent("loadModel", data => {
        this.loadModel(data.name, data.path)
      });

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



