import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";
import ky from "kyouka";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
const params = {
    color: 0xff0000,
    wireframe: true,
    transparent: true,
    spin() {
        gsap.to(mesh.rotation, {
            y: mesh.rotation.y + ky.deg2rad(360),
            duration: 1,
        });
    },
};

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial(params);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// const clock = new THREE.Clock();
const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
const gui = new dat.GUI();
//gui.add(mesh.position, "y",-3,3,0.01);
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
gui.add(mesh, "visible");
// gui.add(material, "wireframe");
gui.addColor(params, "color").onChange(() => material.color.set(params.color));
gui.add(params, "wireframe").onChange(() => material.wireframe = params.wireframe);
gui.add(params, "spin");
gui.add(mesh.material, "opacity").min(0).max(1).step(0.01).name("opacity").onChange((v) => {
    console.log(v);
})