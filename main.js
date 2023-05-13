// import "./style.css";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const model = document.querySelector(".model");

const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
const height = window.innerHeight;
const width = window.innerWidth;
const camera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  height / 2,
  height / -2,
  1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
model.appendChild(renderer.domElement);

const loader = new GLTFLoader();

loader.load(
  "scene.gltf",
  function (gltf) {
    scene.add(gltf.scene);
    scene.scale.set(1.5, 1.5, 1.5);
    // scene.rotation.y = Math.PI / 8;
    // scene.position.y = -1;
    // scene.rotation.x = Math.PI /4;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);
const light2 = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 600);
scene.add(directionalLight);
directionalLight.target = scene;

const directionalLightTOP = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLightTOP);
directionalLightTOP.position.set(0, 0, 600);


// const directionalLightTwo = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLightTwo.position.set(0, 0, 600);
// scene.add(directionalLightTwo);

camera.position.z = 200;

let currentTimeline = window.pageYOffset / 3000;
let aimTimeline = window.pageYOffset / 3000;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  scene.rotateY = 0.7;
  currentTimeline += (aimTimeline - currentTimeline) * 0.1;

  const rx = currentTimeline * 0.2;
  const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 2;
  scene.rotation.set(rx, ry, 0);
}
animate();

window.addEventListener("scroll", () => {
  aimTimeline = window.pageYOffset / 3000;
});
