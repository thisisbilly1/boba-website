import './style.css'

import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ObjectSpaceNormalMap } from 'three';

let camera,scene,renderer;
init()
animate()

function init(){
  const container = document.querySelector("#bg")
  camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
  scene = new THREE.Scene();
  scene.background = new THREE.Color( "white" );
  renderer = new THREE.WebGLRenderer({canvas:container})

  const loader = new GLTFLoader();
  loader.load( 'assets/boba/tea.glb', function ( gltf ) {
    scene.add( gltf.scene );
  }, undefined, function ( error ) {
    console.error( error );
  });

  /*
  const glassmaterial = new THREE.MeshPhysicalMaterial( { 
    map: null,
    color: 0x0000ff,
    metalness: 1,
    roughness: 1,
    opacity: 0.2,
    transparent: true,
    envMapIntensity: 0,
    premultipliedAlpha: false
  } );
  */
  const r = "textures/cube/MilkyWay/";

  const urls = [
    r + "dark-s_px.jpg", r + "dark-s_nx.jpg",
    r + "dark-s_py.jpg", r + "dark-s_ny.jpg",
    r + "dark-s_pz.jpg", r + "dark-s_nz.jpg"
  ];
  

  const textureCube = new THREE.CubeTextureLoader().load( urls );
  textureCube.mapping = THREE.CubeRefractionMapping;
  //scene.background = textureCube;
  //scene.background.generateMipmaps
/*
  const glassmaterial = new THREE.MeshPhongMaterial( { 
    color: 0xffffff, 
    envMap: textureCube, 
    refractionRatio: 0.9,
    transparent:true,
    opacity:.1,
    side:THREE.FrontSide,
    reflectivity:0,
  } );
  */
  const glassmaterial = new THREE.MeshPhysicalMaterial( { 
    envMap: textureCube,
    color: 0xffffff, 
    //metalness: .2,
    roughness: .1,
    //opacity: 0.5,
    //transparent: true,
    //premultipliedAlpha: false,
    refractionRatio:1,
    transmission:1,
    reflectivity:1,
    ior:1.450
  } );

  
  loader.load( 'assets/boba/glass.glb', function ( gltf ) {
    //scene.add( gltf.scene );
    let objects=[]
    gltf.scene.traverse(function(child){
      if (child instanceof THREE.Mesh) {
        //child.material=glassmaterial

        child.material = glassmaterial;
        objects.push( child );
      }
    })
    //let mesh = new THREE.Mesh( gltf.scene, glassmaterial );
    //scene.add( mesh );
    //scene.add(gltf.scene)
    objects.forEach(object=>{
      scene.add(object)
    })
    
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
function controlscene(){
  
  const t=document.body.getBoundingClientRect().top*(0.0003)*(window.innerWidth / window.innerHeight)+1.5;

  camera.position.y = 4* Math.cos(t)+2;
  camera.position.z = 3.5* Math.sin(t); 
  //camera.target.position.copy( gltf.scene )
  var position = new THREE.Vector3(0,2,0);
  camera.lookAt( position );

}
function mouseMove(e){
  //console.log(e)
  //camera.position.x=-e.clientX/window.innerWidth
  //camera.position.y=e.clientY/window.innerHeight
  //var position = new THREE.Vector3(0,1,0);
  //camera.lookAt( position );
}
document.body.onmousemove=mouseMove;

document.body.onscroll=controlscene;
controlscene()