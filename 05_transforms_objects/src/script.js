import './style.css';
import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 0;
// mesh.rotation.reorder('YXZ');
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.x = Math.PI * 0.25;

scene.add(mesh);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const sizes = {
    width: 800,
    height: 600,
};


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 555);
camera.position.z = 3;
scene.add(camera);


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
let thea = 0;
const tick = () => {
    thea += Math.PI / 180
    if (thea > 2 * Math.PI) {
        thea = 0;
    }
    renderer.render(scene, camera);
    mesh.position.x = 2 * Math.cos(thea);
    mesh.position.y = 2 * Math.sin(thea);
    // camera.lookAt(mesh.position)
    window.requestAnimationFrame(tick);
};
tick();