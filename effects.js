// efeitos de profundidade na imagem do hero (desktop apenas)
const heroImg = document.querySelector('.hero-photo img');

if (heroImg && window.innerWidth > 900) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    // efeito 1: movimento
    heroImg.style.transform =
      `translate(${x * 14}px, ${y * 14}px) translateY(0) scale(1)`;

    // efeito 2: sombra dinâmica
    heroImg.style.filter =
      `drop-shadow(${-x * 6}px ${-y * 6}px 20px rgba(29,78,216,0.25))`;
  });
}
