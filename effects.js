// Efeito de profundidade sutil na foto (desktop apenas)
const photo = document.querySelector('.hero-photo img');

if (photo && window.innerWidth > 900) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;

    photo.style.transform =
      `translate(${x}px, ${y}px) translateY(0) scale(1)`;
  });
}
// reforço: efeito de profundidade adicional (sem remover o atual)
const heroImg = document.querySelector('.hero-photo img');

if (heroImg && window.innerWidth > 900) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 6;
    const y = (e.clientY / window.innerHeight - 0.5) * 6;

    heroImg.style.filter =
      `drop-shadow(${-x}px ${-y}px 20px rgba(29,78,216,0.25))`;
  });
}
