// ======================================
// network3D.js — ENTERPRISE STABLE (FIXED)
// ======================================

(() => {
  const canvas = document.getElementById('networkCanvas3D');
  if (!canvas || !window.THREE) return;

  const isMobile = window.innerWidth < 768;

  // Cena
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x070a0f, 6, 18);

  // Câmera
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    50
  );
  camera.position.z = 9;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Luz
  scene.add(new THREE.AmbientLight(0x6faeff, 0.18));

  const keyLight = new THREE.DirectionalLight(0x88ccff, 0.45);
  keyLight.position.set(3, 5, 8);
  scene.add(keyLight);

  // Loader
  const textureLoader = new THREE.TextureLoader();
  textureLoader.setCrossOrigin('anonymous');

  textureLoader.load(
    'assets/rede-datacenter.png',
    (texture) => {
      texture.minFilter = THREE.LinearFilter;

      const aspect = window.innerWidth / window.innerHeight;

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(14 * aspect, 8),
        new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          opacity: 0.9,
          roughness: 0.9,
          metalness: 0.05
        })
      );

      plane.position.z = -3;
      scene.add(plane);

      let particles;

      if (!isMobile) {
        const particleCount = 90;
        const geometry = new THREE.BufferGeometry();
        const positions = [];

        for (let i = 0; i < particleCount; i++) {
          positions.push(
            (Math.random() - 0.5) * 14,
            (Math.random() - 0.5) * 7,
            Math.random() * -8
          );
        }

        geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(positions, 3)
        );

        particles = new THREE.Points(
          geometry,
          new THREE.PointsMaterial({
            color: 0x5fa9ff,
            size: 0.012,
            transparent: true,
            opacity: 0.25
          })
        );

        scene.add(particles);
      }

      let targetX = 0;
      let targetY = 0;

      if (!isMobile) {
        window.addEventListener('mousemove', (e) => {
          targetX = (e.clientX / window.innerWidth - 0.5) * 0.18;
          targetY = (e.clientY / window.innerHeight - 0.5) * 0.12;
        });
      }

      function animate() {
        requestAnimationFrame(animate);

        plane.position.x += (targetX - plane.position.x) * 0.02;
        plane.position.y += (-targetY - plane.position.y) * 0.02;

        if (particles) {
          particles.rotation.y += 0.00015;
        }

        renderer.render(scene, camera);
      }

      animate();
    },
    undefined,
    () => console.warn('Falha ao carregar textura de fundo')
  );

  // Resize controlado
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 150);
  });
})();
