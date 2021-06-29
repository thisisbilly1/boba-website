import './style.css'

import * as THREE from "three";

let container,camera,scene,renderer;
init()
animate()

function init(){
  container = document.querySelector("#bg2")
  camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

  scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0xcccccc );
  renderer = new THREE.WebGLRenderer({canvas:container})
  
  const r = "textures/cube/MilkyWay/";

  const urls = [
    r + "dark-s_px.jpg", r + "dark-s_nx.jpg",
    r + "dark-s_py.jpg", r + "dark-s_ny.jpg",
    r + "dark-s_pz.jpg", r + "dark-s_nz.jpg"
  ];
  

  const textureCube = new THREE.CubeTextureLoader().load( urls );
  textureCube.mapping = THREE.CubeRefractionMapping;
  scene.background = textureCube;

  for (var i = 0; i < 400; i++) {
    var b = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({color: "#EEEDDD"})
    );
    
    b.position.x = -300 + Math.random() * 600;
    b.position.y = -300 + Math.random() * 600;  
    b.position.z = -300 + Math.random() * 600;

    scene.add(b);
    //console.log("Added cube");
  }

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth,window.innerHeight)

  container.addEventListener( 'resize', onWindowResize );
  container.onscroll=controlscene;
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

}

controlscene()