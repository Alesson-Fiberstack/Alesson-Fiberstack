const canvas = document.getElementById("networkCanvas");

if (!canvas) {
  console.warn("Canvas networkCanvas não encontrado");
} else {
  const ctx = canvas.getContext("2d");

  const isMobile = window.innerWidth < 768;
  const POINTS = isMobile ? 35 : 70;
  const MAX_DIST = isMobile ? 90 : 120;

  let animationId;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener("resize", resize);

  const points = [];

  for (let i = 0; i < POINTS; i++) {
    points.push({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6
    });
  }

  function draw() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
    });

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST) {
          ctx.strokeStyle = "rgba(255,255,255,0.08)";
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    points.forEach(p => {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    animationId = requestAnimationFrame(draw);
  }

  draw();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      draw();
    }
  });
}
