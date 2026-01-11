const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const PARTICLE_COUNT = 80;    // menos partículas
const MAX_DISTANCE = 120;     // distancia de conexión más corta
const particles = [];
let mouse = { x: null, y: null };

// Crear partículas
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5, // velocidad lenta
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1      // tamaño pequeño
  });
}

// Eventos
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Animación
function animate() {
  // Fondo negro normal (sin trails exagerados)
  ctx.fillStyle = '#27252b';
  ctx.fillRect(0, 0, width, height);

  // Dibujar partículas
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    // Rebote en bordes
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = '#646464'; // amarillo '#FFD700'
    ctx.fill();
    ctx.closePath();
  }

  // Líneas entre partículas cercanas
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < MAX_DISTANCE) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255,215,0,${0.2 * (1 - dist/MAX_DISTANCE)})`; // muy sutil
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  // Líneas hacia el mouse (sutil)
  if (mouse.x !== null && mouse.y !== null) {
    for (let p of particles) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < MAX_DISTANCE / 2) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255, 255, 13, 0.2)`; 
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();
