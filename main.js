import './style.css'

import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let camera,scene,renderer;
init()
animate()

function init(){
  const container = document.querySelector("#bg")
  camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
  renderer = new THREE.WebGLRenderer({canvas:container})

  //load the tea
  /*
  const glassMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    refractionRatio: 0.8
  });*/
  const loader = new GLTFLoader();
  loader.load( 'boba/tea.glb', function ( gltf ) {
    scene.add( gltf.scene );
  }, undefined, function ( error ) {
    console.error( error );
  });

  loader.load( 'boba/glass.glb', function ( gltf ) {
    scene.add( gltf.scene );
  }, undefined, function ( error ) {
    console.error( error );
  });


  //lighting
  const dirLight1 = new THREE.DirectionalLight( 0xffffff );
  dirLight1.position.set( 1, 1, 1 );
  scene.add( dirLight1 );

  const dirLight2 = new THREE.DirectionalLight( 0x002288 );
  dirLight2.position.set( - 1, - 1, - 1 );
  scene.add( dirLight2 );

  const ambientLight = new THREE.AmbientLight( 0x222222 );
  scene.add( ambientLight );



  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  const pmremGenerator = new THREE.PMREMGenerator( renderer );
  pmremGenerator.compileEquirectangularShader();

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth,window.innerHeight)

  window.addEventListener( 'resize', onWindowResize );
}

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

//handle the scrolling to update the 3d background
var angle = 0;
var radius = 10; 

function moveCamera(){
  
  const t=document.body.getBoundingClientRect().top*0.001+2;
  camera.position.y = 1.5* Math.cos(t);
  camera.position.z = 2* Math.sin(t); 
  //camera.target.position.copy( gltf.scene )
  var position = new THREE.Vector3(0,1,0);
  camera.lookAt( position );

}
document.body.onscroll=moveCamera;
moveCamera()