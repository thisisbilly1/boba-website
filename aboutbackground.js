import './style.css'

import * as THREE from "three";

let container,about,camera,scene,renderer;
init()
animate()

function init(){
  about=document.getElementById("about");//document.querySelector("#bg2")
  container = document.getElementById("bg2");//document.querySelector("#bg2")
  camera = new THREE.PerspectiveCamera(75,about.offsetWidth / about.offsetHeight,0.1,1000);
  camera.position.set(0,0,100)
  scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0xcccccc );
  renderer = new THREE.WebGLRenderer({canvas:container})
  
  const r = "textures/cube/MilkyWay/";

  const urls = [
    r + "dark-s_px.jpg", r + "dark-s_nx.jpg",
    r + "dark-s_py.jpg", r + "dark-s_ny.jpg",
    r + "dark-s_pz.jpg", r + "dark-s_nz.jpg"
  ];
  

  //const textureCube = new THREE.CubeTextureLoader().load( urls );
  //textureCube.mapping = THREE.CubeRefractionMapping;
  //scene.background = textureCube;
  scene.background = new THREE.Color( "black");

  var b = new THREE.Mesh(
    new THREE.BoxGeometry(25,50,25),
    new THREE.MeshBasicMaterial({color: "#EEEDDD"})
  );
  //scene.add(b)

  //make the helix
  const helixradius=25
  const helixheightstep=.5
  for (var i = 0; i < 400; i++) {
    var b = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({color: "#EEEDDD"})
    );
    const t=i*0.05
    const random=(.5-Math.random())*5
    b.position.x=helixradius*Math.cos(t)+random
    b.position.y=i*helixheightstep-helixradius
    b.position.z=helixradius*Math.sin(t)+random
    scene.add(b);
  }
  //make the reverse helix
  for (var i = 0; i < 400; i++) {
    var b = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({color: "#EEEDDD"})
    );
    const t=i*0.05
    const random=(.5-Math.random())*5
    b.position.x=-helixradius*Math.cos(t)+random
    b.position.y=i*helixheightstep-helixradius
    b.position.z=-helixradius*Math.sin(t)+random
    scene.add(b);
  }


  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(about.offsetWidth,about.offsetHeight)

  window.addEventListener( 'resize', onWindowResize );
  document.onscroll=controlscene;
}

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

function onWindowResize(){
  camera.aspect = about.offsetWidth / about.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( about.offsetWidth,about.offsetHeight);
}

//handle the scrolling to update the 3d background
function controlscene(){
  const t=document.body.getBoundingClientRect().top*0.0012;

  camera.position.x = 150* Math.cos(t);
  camera.position.z = 150* Math.sin(t); 
  camera.position.y = t*140+600; 
  //camera.target.position.copy( gltf.scene )
  var position = new THREE.Vector3(0,25,0);
  camera.lookAt( position );
}

controlscene()