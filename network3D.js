// network3D.js

const canvas = document.getElementById('networkCanvas3D');

if (!canvas) {
  console.warn("Canvas networkCanvas3D não encontrado");
} else {
  // Cena
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0f14);

  // Câmera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Luz
  const light = new THREE.PointLight(0x00ffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  // Partículas
  const particlesCount = 200;
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < particlesCount; i++) {
    positions.push((Math.random() - 0.5) * 10); // x
    positions.push((Math.random() - 0.5) * 10); // y
    positions.push((Math.random() - 0.5) * 10); // z
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.1,
    transparent: true,
    opacity: 0.8
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Animação
  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.002;
    renderer.render(scene, camera);
  }

  animate();

  // Responsivo
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
