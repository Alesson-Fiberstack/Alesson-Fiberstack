// ===============================
// network3D.js — Fiberstack
// ===============================

// Pega o canvas
const canvas = document.getElementById('networkCanvas3D');

if (!canvas) {
  console.warn('Canvas networkCanvas3D não encontrado');
  throw new Error('Canvas não encontrado');
}

// ===============================
// CENA
// ===============================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0f14);

// ===============================
// CÂMERA
// ===============================
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// ===============================
// RENDERER
// ===============================
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ===============================
// LUZ
// ===============================
const light = new THREE.PointLight(0x00ffff, 1.2, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Luz ambiente leve
scene.add(new THREE.AmbientLight(0x00ffff, 0.25));

// ===============================
// PARTÍCULAS
// ===============================
const particlesCount = 220;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  color: 0x00ffff,
  size: 0.08,
  transparent: true,
  opacity: 0.85,
  depthWrite: false
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// ===============================
// INTERAÇÃO COM MOUSE
// ===============================
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

// ===============================
// ANIMAÇÃO
// ===============================
function animate() {
  requestAnimationFrame(animate);

  // Rotação contínua
  particles.rotation.y += 0.0018;
  particles.rotation.x += 0.0006;

  // Movimento suave da câmera
  camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.05;

  renderer.render(scene, camera);
}

animate();

// ===============================
// RESPONSIVIDADE
// ===============================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
