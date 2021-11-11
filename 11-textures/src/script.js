import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xfffeee)
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager);
// const colorTexture = textureLoader.load('/textures/door/color.jpg');
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png');
const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png');
// const colorTexture = textureLoader.load('/textures/minecraft.png');
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg');
// const normalTexture = textureLoader.load('/textures/door/normal.jpg');
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
// const geometry = new THREE.SphereBufferGeometry(1, 32, 32);
// const geometry = new THREE.ConeBufferGeometry(1, 1, 32);
// const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32, 100);

// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// colorTexture.repeat.copy(new THREE.Vector2(2, 3));
// colorTexture.offset.copy(new THREE.Vector2(0.5, 0.5));

// colorTexture.rotation = Math.PI * 0.5;
colorTexture.center.copy(new THREE.Vector2(0.5, 0.5));

//colorTexture.minFilter = THREE.NearestFilter;//低精度图mipmap
colorTexture.magFilter = THREE.NearestFilter;
// colorTexture.generateMipmaps = false;

const material = new THREE.MeshBasicMaterial({ map: colorTexture });
// const material = new THREE.MeshBasicMaterial({ map: alphaTexture });
// const material = new THREE.MeshBasicMaterial({ map: heightTexture });
// const material = new THREE.MeshBasicMaterial({ map: normalTexture });
// const material = new THREE.MeshBasicMaterial({ map: ambientOcclusionTexture });
// const material = new THREE.MeshBasicMaterial({ map: metalnessTexture });
// const material = new THREE.MeshBasicMaterial({ map: roughnessTexture });
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
    colorTexture.rotation = 2 * Math.PI * (elapsedTime % 360);
}
tick()