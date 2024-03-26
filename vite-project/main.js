import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas__'),
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3); 


// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);


// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
const gridHelper = new THREE.GridHelper(200, 50);

scene.add( pointLightHelper, gridHelper );

// Orbital COntrol
const controls = new OrbitControls(camera, renderer.domElement);


function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;
  
  renderer.render(scene, camera);
}

animate();

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().map(addStar);

//background img
const backgrnd = new THREE.TextureLoader().load('./space2.jpg');
scene.background = backgrnd;
const moonGeomtery = new THREE.SphereGeometry(10, 24, 24);
const textureMap = new THREE.TextureLoader().load( './moon.jpg' );
const normalMap = new THREE.TextureLoader().load( './normal.jpg' );

const moonMaterial = new THREE.MeshStandardMaterial({ map: textureMap, normalMap: normalMap});
const moon = new THREE.Mesh(moonGeomtery, moonMaterial);

scene.add(moon)


// run karwane ke liye terminal me phle cmd vite-project ya cd vite-project karna then to generate the link; npm run dev and click on it .