// ---- Global State ----
window.threeReady = false;
let preloaderDone = false;
const startTime = Date.now();

// ---- Custom Cursor ----
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
const isTouchDevice = 'ontouchstart' in window;
if (!isTouchDevice) {
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  (function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
    requestAnimationFrame(animateCursor);
  })();
  document.querySelectorAll('a, button, .holo-card, .project-card, .nav-link, .contact-link, .skill-node').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });
} else {
  cursorDot.style.display = 'none';
  cursorRing.style.display = 'none';
}

// ---- Preloader Boot Sequence ----
const bootLines = [
  { text: '> INITIALIZING AHMED_OS v1.0...', cls: '' },
  { text: '> SCANNING NEURAL ARCHITECTURE... [OK]', cls: 'ok' },
  { text: '> LOADING AI SUBSYSTEMS... [OK]', cls: 'ok' },
  { text: '> DECRYPTING CLASSIFIED PROTOCOLS... [OK]', cls: 'ok' },
  { text: '> CALIBRATING FRONTEND MATRIX... [OK]', cls: 'ok' },
  { text: '> ACTIVATING PROMPT ENGINE... [OK]', cls: 'ok' },
  { text: '> ESTABLISHING SECURE CONNECTION... [OK]', cls: 'ok' },
  { text: '> WARNING: HIGH INTELLIGENCE DETECTED', cls: 'alert' },
  { text: '> SYSTEM OPERATIONAL. WELCOME, OPERATOR.', cls: 'ok' }
];
const bootContainer = document.getElementById('boot-lines');
const progressFill = document.getElementById('progress-fill');
const progressPct = document.getElementById('progress-pct');
let lineIndex = 0;

function typeLine() {
  if (lineIndex >= bootLines.length) {
    finishBoot();
    return;
  }
  const line = bootLines[lineIndex];
  const el = document.createElement('div');
  el.className = 'boot-line' + (line.cls ? ' ' + line.cls : '');
  bootContainer.appendChild(el);
  el.classList.add('visible');
  let charIdx = 0;
  const speed = 18;
  function typeChar() {
    if (charIdx < line.text.length) {
      el.textContent = line.text.substring(0, charIdx + 1);
      charIdx++;
      setTimeout(typeChar, speed);
    } else {
      lineIndex++;
      const pct = Math.round((lineIndex / bootLines.length) * 100);
      progressFill.style.width = pct + '%';
      progressPct.textContent = pct + '%';
      setTimeout(typeLine, 150);
    }
  }
  typeChar();
}

function finishBoot() {
  preloaderDone = true;
  tryDismiss();
}

function tryDismiss() {
  if (!preloaderDone) return;
  // Wait minimum 1 more second for dramatic effect
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    gsap.to(preloader, { y: '-100%', duration: 1, ease: 'power3.inOut', onComplete: () => {
      preloader.style.display = 'none';
      document.getElementById('nav').classList.add('visible');
      startHeroAnimation();
    }});
  }, 800);
}

// Wait for Three.js OR max 8 seconds
setTimeout(() => {
  if (!preloaderDone) {
    preloaderDone = true;
    tryDismiss();
  }
}, 8000);

window.addEventListener('threeReady', () => {
  window.threeReady = true;
  if (preloaderDone) tryDismiss();
});

// Start boot sequence
setTimeout(typeLine, 400);

// ---- Lenis Smooth Scroll ----
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) lenis.scrollTo(el);
}

// ---- Hero Animation ----
function startHeroAnimation() {
  const tl = gsap.timeline();
  tl.to('#hero-subtitle', { opacity: 1, duration: 0.8, ease: 'power2.out' })
    .to('#hero-name', { opacity: 1, duration: 0.1 }, '-=0.4')
    .to('#hero-name', { className: 'hero-title mb-4 filled', duration: 1.2, ease: 'power2.out' }, '-=0.1')
    .to('#hero-tagline', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .to('#hero-roles', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .to('#hero-cta', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
}

// ---- GSAP ScrollTrigger Animations ----
gsap.registerPlugin(ScrollTrigger);

// Origin section
gsap.utils.toArray('.origin-block .holo-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 50%', toggleActions: 'play none none reverse' },
    y: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: i * 0.15
  });
});

// Command Center cards
gsap.utils.toArray('.command-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
    y: 80, opacity: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1
  });
});

// Project cards
gsap.utils.toArray('.project-item').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
    x: i % 2 === 0 ? -60 : 60, opacity: 0, duration: 1, ease: 'power3.out'
  });
});

// Cyber cards
gsap.utils.toArray('.cyber-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
    y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.12
  });
});

// Timeline items
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' },
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
    onComplete: () => {
      const dot = item.querySelector('.timeline-dot');
      if (dot) dot.classList.add('active');
    }
  });
});

// Contact section typing
let contactTyped = false;
ScrollTrigger.create({
  trigger: '#contact-terminal',
  start: 'top 70%',
  onEnter: () => {
    if (contactTyped) return;
    contactTyped = true;
    typeContactText();
  }
});

function typeContactText() {
  const lines = [
    '> INITIATING SECURE TRANSMISSION...',
    '> CHANNEL: OPEN',
    '> ENCRYPTION: AES-256',
    '',
    '  Name:     AHMED ULLAH',
    '  Role:     AI-NATIVE FRONTEND DEVELOPER',
    '  Location: Hyderabad, Telangana, India',
    '  Email:    ahmedullah8341@gmail.com',
    '  Phone:    +91 8688935411',
    '',
    '> TRANSMISSION READY.',
    '> AWAITING RESPONSE...'
  ];
  const container = document.getElementById('contact-typed');
  let lineIdx = 0;
  function addLine() {
    if (lineIdx >= lines.length) return;
    const div = document.createElement('div');
    div.textContent = lines[lineIdx];
    if (lines[lineIdx].startsWith('>')) div.style.color = 'rgba(0,240,255,0.5)';
    container.appendChild(div);
    lineIdx++;
    setTimeout(addLine, lines[lineIdx - 1] === '' ? 100 : 80);
  }
  addLine();
}

// Section title reveals
gsap.utils.toArray('.section-title').forEach(title => {
  gsap.from(title, {
    scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none reverse' },
    y: 40, opacity: 0, duration: 1, ease: 'power3.out'
  });
});

gsap.utils.toArray('.section-label').forEach(label => {
  gsap.from(label, {
    scrollTrigger: { trigger: label, start: 'top 85%', toggleActions: 'play none none reverse' },
    x: -30, opacity: 0, duration: 0.8, ease: 'power3.out'
  });
});

// ---- Skills Visualization ----
const skillsData = [
  { name: 'HTML5', x: 0.5, y: 0.15 },
  { name: 'CSS3', x: 0.25, y: 0.25 },
  { name: 'JavaScript', x: 0.75, y: 0.25 },
  { name: 'Python', x: 0.15, y: 0.5 },
  { name: 'Tailwind', x: 0.85, y: 0.5 },
  { name: 'Git', x: 0.3, y: 0.65 },
  { name: 'GitHub', x: 0.7, y: 0.65 },
  { name: 'MongoDB', x: 0.2, y: 0.82 },
  { name: 'REST APIs', x: 0.5, y: 0.75 },
  { name: 'AI Tools', x: 0.8, y: 0.82 },
  { name: 'Netlify', x: 0.4, y: 0.9 },
  { name: 'Prompt Eng', x: 0.6, y: 0.9 }
];

const skillsContainer = document.getElementById('skills-container');
const skillNodesContainer = document.getElementById('skill-nodes');
const skillsCanvas = document.getElementById('skills-canvas');
const sCtx = skillsCanvas.getContext('2d');
let skillsActive = false;

// Position skill nodes
function layoutSkills() {
  const rect = skillsContainer.getBoundingClientRect();
  const w = rect.width, h = rect.height;
  skillsCanvas.width = w * window.devicePixelRatio;
  skillsCanvas.height = h * window.devicePixelRatio;
  skillsCanvas.style.width = w + 'px';
  skillsCanvas.style.height = h + 'px';
  sCtx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

  skillNodesContainer.innerHTML = '';
  skillsData.forEach((skill, i) => {
    const node = document.createElement('div');
    node.className = 'skill-node';
    node.textContent = skill.name;
    node.style.left = (skill.x * w - 36) + 'px';
    node.style.top = (skill.y * h - 36) + 'px';
    node.dataset.index = i;
    skillNodesContainer.appendChild(node);
  });
}

layoutSkills();
window.addEventListener('resize', layoutSkills);

// Connections (index pairs)
const connections = [
  [0,1],[0,2],[1,3],[2,4],[1,5],[2,6],[3,7],[4,9],[5,8],[6,8],[7,10],[8,11],[9,11],[5,7],[6,9],[10,8],[0,8]
];

let skillAnimFrame;
function drawSkills(time) {
  const rect = skillsContainer.getBoundingClientRect();
  const w = rect.width, h = rect.height;
  sCtx.clearRect(0, 0, w, h);

  if (!skillsActive) { skillAnimFrame = requestAnimationFrame(drawSkills); return; }

  // Draw connections
  connections.forEach(([a, b], ci) => {
    const sa = skillsData[a], sb = skillsData[b];
    const ax = sa.x * w, ay = sa.y * h, bx = sb.x * w, by = sb.y * h;
    sCtx.beginPath();
    sCtx.moveTo(ax, ay);
    sCtx.lineTo(bx, by);
    sCtx.strokeStyle = `rgba(0,240,255,${0.06 + Math.sin(time * 0.001 + ci) * 0.03})`;
    sCtx.lineWidth = 0.5;
    sCtx.stroke();

    // Animated pulse along line
    const t = ((time * 0.0003 + ci * 0.15) % 1);
    const px = ax + (bx - ax) * t;
    const py = ay + (by - ay) * t;
    sCtx.beginPath();
    sCtx.arc(px, py, 1.5, 0, Math.PI * 2);
    sCtx.fillStyle = 'rgba(0,240,255,0.4)';
    sCtx.fill();
  });

  // Draw node glows
  skillsData.forEach((skill, i) => {
    const x = skill.x * w, y = skill.y * h;
    const glow = 4 + Math.sin(time * 0.002 + i * 0.5) * 2;
    const gradient = sCtx.createRadialGradient(x, y, 0, x, y, Math.max(1, glow * 5));
    gradient.addColorStop(0, 'rgba(0,240,255,0.08)');
    gradient.addColorStop(1, 'rgba(0,240,255,0)');
    sCtx.beginPath();
    sCtx.arc(x, y, Math.max(1, glow * 5), 0, Math.PI * 2);
    sCtx.fillStyle = gradient;
    sCtx.fill();
  });

  skillAnimFrame = requestAnimationFrame(drawSkills);
}
requestAnimationFrame(drawSkills);

ScrollTrigger.create({
  trigger: '#skills',
  start: 'top 70%',
  onEnter: () => { skillsActive = true; }
});

// ---- Uptime Counter ----
setInterval(() => {
  const elapsed = Date.now() - startTime;
  const hrs = Math.floor(elapsed / 3600000).toString().padStart(4, '0');
  const mins = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
  const secs = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
  document.getElementById('uptime-counter').textContent = `${hrs}:${mins}:${secs}`;
}, 1000);

// ---- Easter Egg: Terminal ----
let terminalOpen = false;
function toggleTerminal() {
  const overlay = document.getElementById('terminal-overlay');
  terminalOpen = !terminalOpen;
  if (terminalOpen) {
    overlay.classList.add('open');
    document.getElementById('term-input').focus();
    termOutput('> AHMED_OS Terminal v1.0 — Type "help" for commands.');
  } else {
    overlay.classList.remove('open');
  }
}

const termHistory = [];
function termOutput(text) {
  const output = document.getElementById('terminal-output');
  const div = document.createElement('div');
  div.textContent = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

document.getElementById('term-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const input = e.target.value.trim().toLowerCase();
    e.target.value = '';
    termOutput('visitor@ahmed_os:~$ ' + input);

    if (isTerminalCommand(input)) {
      processTerminalCommand(input);
    } else if (input.length > 0) {
      processChatMessage(input);
    }
  } else if (e.key === 'Escape') {
    toggleTerminal();
  }
});

// Check if input is a terminal command
function isTerminalCommand(input) {
  const commands = ['help', 'about', 'skills', 'projects', 'clear', 'whoami', 'secret', 'exit'];
  return commands.includes(input);
}

// Process terminal commands
function processTerminalCommand(input) {
  if (input === 'help') {
    termOutput('Available commands: help, about, skills, projects, clear, whoami, secret, exit');
    termOutput('Or just chat freely — type anything to talk to AHMED_OS neural interface!');
  } else if (input === 'about') {
    termOutput('AHMED ULLAH — AI-Native Frontend Developer & Prompt Engineer.');
    termOutput('Building the future, one prompt at a time.');
  } else if (input === 'skills') {
    termOutput('HTML5 | CSS3 | JavaScript | Python | Tailwind CSS | Git | GitHub | MongoDB | REST APIs | AI Tools | Netlify | Prompt Engineering');
  } else if (input === 'projects') {
    termOutput('01. Personal Portfolio — ahmedullah-dev.netlify.app');
    termOutput('02. Quiz App — quiz-app-ahmedullah.netlify.app');
    termOutput('03. Creamery Dairy System — CLASSIFIED');
    termOutput('04. AI & Cybersecurity Research — ENCRYPTED');
  } else if (input === 'clear') {
    document.getElementById('terminal-output').innerHTML = '';
  } else if (input === 'whoami') {
    termOutput('You are a visitor. Clearance level: PUBLIC.');
  } else if (input === 'secret') {
    termOutput('███████ DECRYPTED ███████');
    termOutput('The architect is always watching.');
    termOutput('Every line of code is a message.');
    termOutput('The system evolves. Do you?');
  } else if (input === 'exit') {
    toggleTerminal();
  }
}

// Process chat messages via AI
let chatInProgress = false;
async function processChatMessage(userMessage) {
  if (chatInProgress) {
    termOutput('> Still processing previous message...');
    return;
  }

  chatInProgress = true;
  termOutput('> Connecting to neural network...');

  try {
    const response = await sendChatMessage(userMessage);
    const formattedResponse = formatChatResponse(response);

    // Split response by newlines and output each line
    const responseLines = formattedResponse.split('\n');
    responseLines.forEach(line => {
      termOutput('AHMED_OS> ' + line);
    });
  } catch (error) {
    termOutput('> ERROR: Unable to process message. Please try again.');
  } finally {
    chatInProgress = false;
  }
}

// Keyboard shortcut: T to open terminal
document.addEventListener('keydown', e => {
  if (e.key === 't' || e.key === 'T') {
    if (!terminalOpen && document.activeElement.tagName !== 'INPUT') {
      toggleTerminal();
    }
  }
  if (e.key === 'Escape' && terminalOpen) {
    toggleTerminal();
  }
});

// ---- Easter Egg: Konami Code ----
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', e => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      // Show secret message
      const msg = document.createElement('div');
      msg.style.cssText = 'position:fixed;inset:0;z-index:10002;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer';
      msg.innerHTML = `
        <div style="font-family:Orbitron;font-size:clamp(24px,5vw,48px);font-weight:900;color:#00f0ff;text-shadow:0 0 40px rgba(0,240,255,0.5);margin-bottom:16px">ACCESS GRANTED</div>
        <div style="font-family:JetBrains Mono;font-size:14px;color:rgba(0,240,255,0.5);letter-spacing:4px">YOU FOUND THE HIDDEN PROTOCOL</div>
        <div style="font-family:JetBrains Mono;font-size:12px;color:rgba(224,240,255,0.3);margin-top:24px">Click anywhere to close</div>
      `;
      msg.addEventListener('click', () => msg.remove());
      document.body.appendChild(msg);
    }
  } else {
    konamiIndex = 0;
  }
});

// ---- Easter Egg: Triple-click name ----
let nameClicks = 0;
let nameClickTimer;
document.getElementById('hero-name')?.addEventListener('click', () => {
  nameClicks++;
  clearTimeout(nameClickTimer);
  nameClickTimer = setTimeout(() => nameClicks = 0, 800);
  if (nameClicks >= 5) {
    nameClicks = 0;
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);z-index:9999;padding:12px 24px;background:rgba(0,240,255,0.1);border:1px solid rgba(0,240,255,0.3);font-family:JetBrains Mono;font-size:12px;color:#00f0ff;letter-spacing:2px;border-radius:2px;pointer-events:none';
    toast.textContent = 'CLEARNING ELEVATED: LEVEL 5 — WELCOME, ARCHITECT';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
});

// ---- Parallax on scroll ----
gsap.to('#hero-subtitle', {
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  y: -60, opacity: 0
});
gsap.to('#hero-name', {
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  y: -100
});
gsap.to('#hero-tagline', {
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  y: -40, opacity: 0
});

