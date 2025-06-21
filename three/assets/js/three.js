
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
    addPlane(name, x, y, color) {
      const geometry = new  THREE.PlaneGeometry(x, y)

      // マテリアルを作成
      const material = new THREE.MeshBasicMaterial({ color: color });

      // メッシュ（ジオメトリとマテリアルを組み合わせたもの）を作成
      const cube = new THREE.Mesh(geometry, material);
      this.v.scene.add(cube);
      this.v[name] = cube;
    },
    rotation(name, x, y, z) {
      if (this.v[name] == undefined) return;
      rotation = this.v[name].rotation;
      if (x != null) rotation.x = x;
      if (y != null) rotation.y = y;
      if (z != null) rotation.z = z;
    },
    position(name, x, y, z) {
      if (this.v[name] == undefined) return;
      position = this.v[name].position;
      if (x != null) position.x = x;
      if (y != null) position.y = y;
      if (z != null) position.z = z;
    },
    loadModel(name, path) {
      const loader = new GLTFLoader();
      const v = this.v
      const t = this
      loader.load(
        path, // VRoid Studioから出力したVRMファイル名
        function (gltf) {
          model = gltf.scene; // ロードされたシーン全体を格納
          v.scene.add(model);
          v[name] = model;
          t.pushEvent('load_model', { status: "completion", name: name })
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
          console.error('An error happened', error);
        }
      );
    },
    loadTexture(name, path) {
      const v = this.v
      const t = this;
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(path,
        // 読み込み成功時のコールバック
        function (texture) {
          v[name] = new THREE.MeshBasicMaterial({ map: texture });
          t.pushEvent('load_texture', { status: "completion", name: name })
        },
        // 読み込み進捗時のコールバック (オプション)
        undefined,
        // 読み込みエラー時のコールバック
        undefined
      );
    },
    setTexture(objName, textureName) {
      if (this.v[objName] == undefined) return;
      const obj = this.v[objName];
      if (!obj || !obj.material) {
        console.warn(`オブジェクト '${objName}' またはそのマテリアルが見つかりません。`);
        console.log(obj)
        return;
      }

      const material = obj.material;

      const newMaterialWithTexture = this.v[textureName];
      if (!newMaterialWithTexture || !(newMaterialWithTexture instanceof THREE.MeshBasicMaterial)) {
        console.warn(`テクスチャ '${textureName}' に対応する有効なマテリアルが見つかりません。`);
        return;
      }
      const texture = newMaterialWithTexture.map; // 読み込まれたテクスチャを取得

      if (material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshStandardMaterial) {
        material.map = texture;
        material.needsUpdate = true; // マテリアルの更新をThree.jsに通知
      } else {
        console.warn(`オブジェクト '${objName}' のマテリアルはテクスチャマップをサポートしていません。`);
      }
    },
    handleEventInit() {
      this.handleEvent("addCube", data => {
        this.addCube(data.name, data.x, data.y, data.z, data.color)
      });

      this.handleEvent("addPlane", data => {
        this.addPlane(data.name, data.x, data.y, data.color)
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
      this.handleEvent("loadTexture", data => {
        this.loadTexture(data.name, data.path)
      });

      this.handleEvent("setTexture", data => {
        this.setTexture(data.obj_name, data.texture_name)
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



