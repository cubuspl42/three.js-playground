import './index.css';
import * as THREE from 'three';

function range(n: number): number[] {
    return Array.from({length: n}, (value, key) => key);
}

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.Renderer;
init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
    // camera.position.x = window.innerWidth / 2;
    // camera.position.y = window.innerHeight / 2;
    camera.position.z = 2000;

    scene = new THREE.Scene();
    let texture = new THREE.TextureLoader().load('textures/crate.gif');

    const a = 200;
    const w = 16;
    let geometry = new THREE.PlaneGeometry(w, w, 32);
    let material = new THREE.MeshBasicMaterial({map: texture});

    range(20000).forEach((i: number) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (i % a) * w - 2000;
        mesh.position.y = Math.floor(i / a) * w - 600;
        scene.add(mesh);
    });


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
