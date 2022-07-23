import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus
//const torusWidth =10;
//const torusHeight = 10;
//const torusDepth = 10;
const geometry = new THREE.TorusGeometry(16, 3, 10, 100);
const material = new THREE.MeshStandardMaterial({ color: 'gray'});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//light shadows
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xfffffff)
scene.add(pointLight, ambientLight)


const controls = new OrbitControls(camera, renderer.domElement)

//add stars
function addStar() {
  const geometry = new THREE.SphereGeometry( .25, 25, 25);
  const material = new THREE.MeshBasicMaterial( {color: 'white'})
  const star = new THREE.Mesh( geometry, material);
   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

   star.position.set(x, y, z);
   scene.add(star)
}
Array(200).fill().forEach(addStar)

//background
const spaceTexture = new THREE.TextureLoader().load('/dist/19816.jpeg');
scene.background = spaceTexture;


//avatar
const meTexture = new THREE.TextureLoader().load('/dist/alienhead.png');

const myAvatar = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: meTexture })
);
scene.add(myAvatar) 


//cell
const cellTexture = new THREE.TextureLoader().load('/dist/cell.jpeg');

const cell = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshBasicMaterial({map: cellTexture})
);
scene.add(cell)

cell.position.z = 25;
cell.position.setX(-5)



myAvatar.position.z = -5;
myAvatar.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  cell.rotation.x += 0.05;
  cell.rotation.y += 0.075;
  cell.rotation.z += 0.05;

  myAvatar.rotation.y += 0.01;
  myAvatar.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


//torus spin
function animate() {
  requestAnimationFrame( animate );
    torus.rotation.x += .01;
    torus.rotation.y += .005;
    torus.rotation.z += .01;

    controls.update()

  renderer.render( scene, camera);
};

animate();