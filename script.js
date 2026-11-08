const TOTAL = 36;   // must match how many frames you rendered
const img = document.getElementById('frame');
const box = document.getElementById('viewer');

// preload every frame so dragging is smooth
const frames = [];
for (let i = 1; i <= TOTAL; i++) {
  const im = new Image();
  im.src = 'frames/frame_' + String(i).padStart(4, '0') + '.png';
  frames.push(im);
}

let current = 0, startX = 0, startFrame = 0, dragging = false, zoom = 1;

function show(n) {
  current = ((n % TOTAL) + TOTAL) % TOTAL;
  img.src = frames[current].src;
}

box.addEventListener('pointerdown', (e) => {
  dragging = true;
  startX = e.clientX;
  startFrame = current;
  box.setPointerCapture(e.pointerId);
});

box.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  show(startFrame - Math.round((e.clientX - startX) / 10));
});

box.addEventListener('pointerup', () => { dragging = false; });

function setZoom(z) {
  zoom = Math.min(3, Math.max(1, z));
  img.style.transform = 'scale(' + zoom + ')';
}
document.getElementById('zoom-in').onclick = () => setZoom(zoom + 0.4);
document.getElementById('zoom-out').onclick = () => setZoom(zoom - 0.4);