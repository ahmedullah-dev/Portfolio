import * as THREE from 'three';

const canvas = document.getElementById('hero-canvas');
if (!canvas) throw new Error('Hero canvas not found');

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Particle texture
function createGlowTexture(color = [0, 240, 255]) {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  g.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},1)`);
  g.addColorStop(0.2, `rgba(${color[0]},${color[1]},${color[2]},0.6)`);
  g.addColorStop(0.5, `rgba(${color[0]},${color[1]},${color[2]},0.15)`);
  g.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

const particleTexture = createGlowTexture([0, 240, 255]);
const particleTextureBlue = createGlowTexture([0, 102, 255]);

// Particles
const particleCount = 1500;
const positions = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);
for (let i = 0; i < particleCount; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = 1.5 + Math.random() * 3.5;
  positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i * 3 + 2] = r * Math.cos(phi);
  sizes[i] = Math.random() * 3 + 1;
}
const particleGeom = new THREE.BufferGeometry();
particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

const particleMat = new THREE.PointsMaterial({
  map: particleTexture,
  size: 0.06,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  sizeAttenuation: true,
  opacity: 0.7,
  color: 0x00f0ff
});
const particles = new THREE.Points(particleGeom, particleMat);
scene.add(particles);

// Inner particles (blue)
const innerCount = 500;
const innerPos = new Float32Array(innerCount * 3);
for (let i = 0; i < innerCount; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = 0.5 + Math.random() * 1.5;
  innerPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  innerPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  innerPos[i * 3 + 2] = r * Math.cos(phi);
}
const innerGeom = new THREE.BufferGeometry();
innerGeom.setAttribute('position', new THREE.BufferAttribute(innerPos, 3));
const innerMat = new THREE.PointsMaterial({
  map: particleTextureBlue,
  size: 0.04,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  sizeAttenuation: true,
  opacity: 0.5,
  color: 0x0066ff
});
const innerParticles = new THREE.Points(innerGeom, innerMat);
scene.add(innerParticles);

// Central Icosahedron
const icoGeom = new THREE.IcosahedronGeometry(1, 1);
const icoMat = new THREE.MeshBasicMaterial({
  color: 0x00f0ff,
  wireframe: true,
  transparent: true,
  opacity: 0.12
});
const icosahedron = new THREE.Mesh(icoGeom, icoMat);
scene.add(icosahedron);

// Inner icosahedron
const innerIcoGeom = new THREE.IcosahedronGeometry(0.6, 0);
const innerIcoMat = new THREE.MeshBasicMaterial({
  color: 0x0066ff,
  wireframe: true,
  transparent: true,
  opacity: 0.08
});
const innerIco = new THREE.Mesh(innerIcoGeom, innerIcoMat);
scene.add(innerIco);

// Orbiting ring
const ringGeom = new THREE.TorusGeometry(2.2, 0.005, 8, 100);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.15 });
const ring = new THREE.Mesh(ringGeom, ringMat);
ring.rotation.x = Math.PI * 0.35;
scene.add(ring);

// Second ring
const ring2Geom = new THREE.TorusGeometry(2.8, 0.003, 8, 100);
const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.08 });
const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
ring2.rotation.x = Math.PI * 0.6;
ring2.rotation.y = Math.PI * 0.3;
scene.add(ring2);

// Floating small geometries
const floaters = [];
for (let i = 0; i < 6; i++) {
  const geomType = i % 3;
  let geom;
  if (geomType === 0) geom = new THREE.OctahedronGeometry(0.08);
  else if (geomType === 1) geom = new THREE.TetrahedronGeometry(0.06);
  else geom = new THREE.BoxGeometry(0.07, 0.07, 0.07);
  const mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.3 });
  const mesh = new THREE.Mesh(geom, mat);
  const angle = (i / 6) * Math.PI * 2;
  const radius = 2.5 + Math.random();
  mesh.userData = { angle, radius, speed: 0.15 + Math.random() * 0.15, yOffset: (Math.random() - 0.5) * 2 };
  scene.add(mesh);
  floaters.push(mesh);
}

// Mouse tracking
let targetMouseX = 0, targetMouseY = 0, mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Animation
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;

  // Camera subtle movement
  camera.position.x = mouseX * 0.3;
  camera.position.y = -mouseY * 0.3;
  camera.lookAt(0, 0, 0);

  // Rotate particles
  particles.rotation.y = t * 0.03;
  particles.rotation.x = t * 0.01;
  innerParticles.rotation.y = -t * 0.05;
  innerParticles.rotation.z = t * 0.02;

  // Icosahedron
  icosahedron.rotation.x = t * 0.1;
  icosahedron.rotation.y = t * 0.15;
  icosahedron.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);

  innerIco.rotation.x = -t * 0.15;
  innerIco.rotation.y = -t * 0.1;

  // Rings
  ring.rotation.z = t * 0.05;
  ring2.rotation.z = -t * 0.03;

  // Floaters
  floaters.forEach(f => {
    f.userData.angle += f.userData.speed * 0.01;
    f.position.x = Math.cos(f.userData.angle) * f.userData.radius;
    f.position.z = Math.sin(f.userData.angle) * f.userData.radius;
    f.position.y = f.userData.yOffset + Math.sin(t + f.userData.angle) * 0.3;
    f.rotation.x = t * 0.5;
    f.rotation.y = t * 0.3;
  });

  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Signal ready
window.dispatchEvent(new Event('threeReady'));
