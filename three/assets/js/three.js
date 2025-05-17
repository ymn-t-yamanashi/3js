
import * as THREE from 'three';

export const hooks = {
    threejs: {
      mounted() {
       console.log("mounted");

       
       // シーンの作成
       const scene = new THREE.Scene();
   
       // カメラの作成
       const camera = new THREE.PerspectiveCamera( 75, 1000/800, 0.1, 1000 );
       camera.position.z = 5;
   
       // レンダラーの作成
       const renderer = new THREE.WebGLRenderer();
       renderer.setSize( 1000,  800);
       this.el.appendChild( renderer.domElement );
   
       // 立方体のジオメトリを作成
       const geometry = new THREE.BoxGeometry( 1, 1, 1 );
   
       // マテリアルを作成
       const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
   
       // メッシュ（ジオメトリとマテリアルを組み合わせたもの）を作成
       const cube = new THREE.Mesh( geometry, material );
       scene.add( cube );
   
       cube.rotation.x += 0.31;
       cube.rotation.y += 0.31;
       renderer.render( scene, camera );
   
      },
      updated() {
       console.log("updated");
       console.log(this.el.dataset);
      },
    },
  };
  

