import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 'rgb(255, 149, 41)' });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.VideoTexture('space.jpg');
scene.background = spaceTexture;

// Logo

const logotext = new THREE.TextureLoader().load('logo.png');

const logo = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: logotext }));

scene.add(logo);

// Mars

const marsTexture = new THREE.TextureLoader().load('mars.jpg');


const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
      map: marsTexture,
      
     color: 0xff6347   })
);
const verretexture = new THREE.TextureLoader().load('domeverre.jpg');
var geometrydome = new THREE.SphereGeometry(1, 10, 10, Math.PI / 2, 2 * Math.PI, Math.PI/2, Math.PI/2);
var materialdome = new THREE.MeshStandardMaterial({
    map: verretexture
});
const dome = new THREE.Mesh(geometrydome, materialdome);
dome.material.side = THREE.DoubleSide;


scene.add(mars);

mars.add(dome)
mars.position.z = 30;
mars.position.setX(-10);
dome.position.set(0, 0, 0);
dome.rotation.x = 0 ;
let rx = 1 * Math.PI * 2;
let ry = 1 * Math.PI;
dome.castShadow = true;
dome.receiveShadow = true;
dome.position.setFromSphericalCoords(2.7, ry, rx);
logo.position.z = -5;
logo.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;

  logo.rotation.y += 0.01;
  logo.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  mars.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
