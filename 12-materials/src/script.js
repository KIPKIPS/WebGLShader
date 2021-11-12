import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff);
// GUI
const gui = new dat.GUI()

// Textures
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const cubeTextureLoader = new THREE.CubeTextureLoader()
cubeTextureLoader.setPath('/textures/environmentMaps/3/')

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const ambientOcclusionTexture = textureLoader.load(
    '/textures/door/ambientOcclusion.jpg'
)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg'); //高度图
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const gradient3Texture = textureLoader.load('/textures/gradients/3.jpg')
const matcaps8Texture = textureLoader.load('/textures/matcaps/8.png')

const environmentMapTexture = cubeTextureLoader.load([
    'px.jpg', //x轴正方向
    'nx.jpg', //x轴负方向
    'py.jpg', //y轴正方向
    'ny.jpg', //y轴负方向
    'pz.jpg', //z轴正方向
    'nz.jpg', //z轴负方向
])

// Object
const material = new THREE.MeshStandardMaterial();
// const material = new THREE.MeshBasicMaterial();
// material.wireframe = true;
// material.color = new THREE.Color(0xff0000);
material.metalness = 0;
material.roughness = 1;
material.matcap = matcaps8Texture;
// material.opacity = 0.5;
material.transparent = true;
material.alphaMap = doorAlphaTexture;
material.side = THREE.DoubleSide;
material.map = colorTexture;
material.aoMap = ambientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = heightTexture;
material.displacementScale = 0.05;
material.metalnessMap = metalnessTexture;
material.roughnessMap = roughnessTexture;
material.normalMap = normalTexture;
material.normalScale.set(0.5, 0.5);
// material.envMap = environmentMapTexture;
gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);
gui.add(material, 'aoMapIntensity').min(0).max(1).step(0.0001);
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 16, 16),
    material,
)
sphere.position.x = -1.5
const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material,
);
plane.geometry.setAttribute("uv2", new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2));
const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
    material,
)
torus.position.x = 1.5
const box = new THREE.Mesh(
    new THREE.BoxBufferGeometry(2, 2, 2),
    material,
)
box.position.x = 3;


var geometry = new LineGeometry();
// 顶点坐标构成的数组pointArr
var pointArr = [-2, 0, 0, -2, 2, 0,
    0, 0, 0,
    2, 2, 0,
    2, 0, 0,
];
// 几何体传入顶点坐标
geometry.setPositions(pointArr);
// 自定义的材质
var linematerial = new LineMaterial({
    color: 0xdd2222,
    // 线宽度
    linewidth: 5,
});
linematerial.resolution.set(window.innerWidth, window.innerHeight);
// 把渲染窗口尺寸分辨率传值给材质LineMaterial的resolution属性
// resolution属性值会在着色器代码中参与计算
var line = new Line2(geometry, linematerial);

scene.add(sphere, plane, torus, box, line);

// Lights
const ambientLight = new THREE.AmbientLight(0x404040)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(pointLight, ambientLight);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
scene.add(camera)

const control = new OrbitControls(camera, canvas)
control.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update Object
    // sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = 0.15 * elapsedTime
    // plane.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime

    // Update Controls
    control.update()

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()