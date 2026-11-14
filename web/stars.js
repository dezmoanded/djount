// Small, dependency-free space magic. The original artwork stays untouched.
const starfield = document.getElementById('starfield');
const sparkleLayer = document.getElementById('sparkle-layer');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const colors = ['#8be5f1', '#ffd77d', '#d7a8ff', '#ff9fc9'];
const positions = [[7,10],[21,31],[88,15],[75,42],[10,65],[93,73],[27,86],[81,92],[4,43],[98,35],[58,6],[48,96]];

positions.forEach(([x, y], i) => {
  const star = document.createElement('span');
  star.className = 'star';
  star.style.cssText = `--x:${x}%;--y:${y}%;--size:${7 + i % 6}px;--color:${colors[i % colors.length]};--delay:-${i * .7}s;--duration:${4 + i % 3}s`;
  starfield.appendChild(star);
});

[[20, 11, 1.5], [76, 14, 7]].forEach(([top, duration, delay]) => {
  const meteor = document.createElement('span');
  meteor.className = 'shooting-star';
  meteor.style.cssText = `--top:${top}%;--duration:${duration}s;--delay:${delay}s`;
  starfield.appendChild(meteor);
});

document.addEventListener('pointerdown', (event) => {
  if (reducedMotion.matches || !event.isPrimary) return;
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2 + Math.random() * .25;
    const distance = 35 + Math.random() * 65;
    const star = document.createElement('span');
    star.className = 'burst-star';
    star.style.cssText = `--x:${event.clientX}px;--y:${event.clientY}px;--dx:${Math.cos(angle) * distance}px;--dy:${Math.sin(angle) * distance}px;--size:${5 + Math.random() * 10}px;--color:${colors[i % colors.length]}`;
    star.addEventListener('animationend', () => star.remove(), { once: true });
    sparkleLayer.appendChild(star);
  }
});
