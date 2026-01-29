// leve interação de profundidade no mouse
const hero = document.querySelector('.hero-photo');

if (hero && window.innerWidth > 900) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;

    hero.style.transform = `translate(${x}px, ${y}px)`;
  });
}
