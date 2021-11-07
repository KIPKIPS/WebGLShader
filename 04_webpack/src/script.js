import "./style.css";
import * as THREE from "three";
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xfe442f });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
const sizes = {
    width: 720,
    height: 540,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);