
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Three1 = {
    v: {},
    model: null, 

     mounted() {
       console.log("mounted");
       v = init(this.el);

      },
      updated() {
       dataset = this.el.dataset
       console.log(dataset);
       model.rotation.y = dataset.data;
       v.render()
      },
  };

  function init(el) {
      const loader = new GLTFLoader();

       // シーンの作成
       const scene = new THREE.Scene();
       // カメラの作成
       const camera = new THREE.PerspectiveCamera( 75, 1000/800, 0.1, 1000 );
       camera.position.z = 1.7;
       camera.position.y = 0.8;
       // レンダラーの作成
       const renderer = new THREE.WebGLRenderer();
       renderer.setSize( 1000,  800);
       el.appendChild( renderer.domElement );
   
       // 立方体のジオメトリを作成
       const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
   
       // マテリアルを作成
       const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
   
       // メッシュ（ジオメトリとマテリアルを組み合わせたもの）を作成
       const cube = new THREE.Mesh( geometry, material );
       // scene.add( cube );
   
       // cube.rotation.x += 0.00;
       // cube.rotation.y += 0.00;
  
             // モデルをロード
      loader.load(
        'images/test.vrm', // VRoid Studioから出力したVRMファイル名
        function (gltf) {
          model = gltf.scene; // ロードされたシーン全体を格納
          scene.add(model);
          render();
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
      );

       function render() {
        renderer.render( scene, camera );
       }
       return {"render": render};
  }
  
  export default Three1;
