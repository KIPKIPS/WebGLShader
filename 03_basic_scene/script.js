window.onload = load;

function load() {
    var scene = new THREE.Scene();
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var mtl = new THREE.MeshBasicMaterial({
        color: 0xff0000,
    });
    var mesh = new THREE.Mesh(geometry, mtl);
    scene.add(mesh);
    mesh.position.set(0, 0, -10);
    var size = {
        width: 800,
        height: 600,
    }
    var camera = new THREE.PerspectiveCamera(75, size.width / size.height);
    camera.position.set(0, 0, 0);
    camera.lookAt(scene.position)
    scene.add(camera);
    var canvas = document.querySelector(".webgl");
    // canvas.width = size.width;
    // canvas.height = size.height;
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });
    renderer.setSize(size.width, size.height);
    renderer.render(scene, camera);
}