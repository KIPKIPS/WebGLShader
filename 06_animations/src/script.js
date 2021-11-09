import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: 800,
    height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();
let func = function() {
    gsap.to(mesh.position, { x: 1, duration: 1, delay: 0 });
    gsap.to(mesh.position, { y: -1, duration: 1, delay: 1 });
    gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 });
    gsap.to(mesh.position, { y: 0, duration: 1, delay: 3 });
}
func();
setInterval(func, 4000);
const tick = () => {
    //一秒一圈
    mesh.rotation.y = clock.getElapsedTime() * Math.PI;
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();