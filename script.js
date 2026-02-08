const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');
const seahawks = document.getElementById('seahawks');
const patriots = document.getElementById('patriots');
const resultText = document.getElementById('resultText');
const body = document.body;
const decorations = document.getElementById('decorations');
const cheerSound = document.getElementById('cheerSound');
const explosionSound = document.getElementById('explosionSound');
const canvas = document.getElementById('confettiCanvas');

// Start button click
startBtn.addEventListener('click', () => {
  startScreen.classList.remove('screen-active');
  startScreen.classList.add('screen-hidden');

  gameScreen.classList.remove('screen-hidden');
  gameScreen.classList.add('screen-active');
});

// Confetti instance
const confettiInstance = confetti.create(canvas, { resize: true });

// Lock teams after click
function lockTeams() {
  seahawks.style.pointerEvents = 'none';
  patriots.style.pointerEvents = 'none';
}

// SEAHAWKS WIN
seahawks.addEventListener('click', () => {
  lockTeams();
  gameScreen.classList.remove('screen-active');
  gameScreen.classList.add('screen-hidden');

  resultScreen.classList.remove('screen-hidden');
  resultScreen.classList.add('screen-active');

  body.classList.add('disco');
  resultText.textContent = "GO HAWKS! 🎉";

  // Play cheer audio
  cheerSound.currentTime = 0;
  cheerSound.play().catch(() => {});

  // Confetti shower
  const confettiInterval = setInterval(() => {
    confettiInstance({
      particleCount: 150,
      spread: 160,
      origin: { y: 0.6 },
      colors: ['#00aaff', '#00ff99', '#ffffff']
    });
  }, 300);

  // Flying Seahawks logos
  const flyLogos = setInterval(() => {
    const logo = document.createElement('img');
    logo.src = 'https://upload.wikimedia.org/wikipedia/en/1/15/Seattle_Seahawks_logo.svg';
    logo.className = 'flyingLogo';
    logo.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    decorations.appendChild(logo);
    setTimeout(() => logo.remove(), 3000);
  }, 300);

  setTimeout(() => {
    clearInterval(confettiInterval);
    clearInterval(flyLogos);
  }, 6000);
});

// DOUBLE CLICK = MEGA CONFETTI
seahawks.ondblclick = () => {
  for (let i = 0; i < 500; i++) {
    confettiInstance({
      particleCount: 5,
      spread: 360,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ['#69BE28', '#002244', '#A5ACAF']
    });
  }
};

// PATRIOTS LOSE — super explosion
patriots.addEventListener('click', () => {
  lockTeams();
  gameScreen.classList.remove('screen-active');
  gameScreen.classList.add('screen-hidden');

  resultScreen.classList.remove('screen-hidden');
  resultScreen.classList.add('screen-active');

  body.classList.add('shake', 'patriotsFlash');
  resultText.textContent = "LOSER 💥";

  // Play explosion audio
  explosionSound.currentTime = 0;
  explosionSound.play().catch(() => {});

  // directional confetti cannons
  const birdColors = ['#ff0000','#ff9900','#000000'];
  function fireCannons() {
    confettiInstance({
      particleCount: 50,
      angle: 60,
      spread: 90,
      origin: { x: 0, y: 0.6 },
      colors: birdColors,
    });
    confettiInstance({
      particleCount: 50,
      angle: 120,
      spread: 90,
      origin: { x: 1, y: 0.6 },
      colors: birdColors,
    });
    confettiInstance({
      particleCount: 100,
      spread: 180,
      origin: { y: 0.5 },
      colors: birdColors,
    });
  }
  fireCannons();

  // BIG spark bursts
  for (let i = 0; i < 25; i++) {
    const bigSpark = document.createElement('div');
    bigSpark.className = 'sparkBig';
    const angle = Math.random() * Math.PI * 2;
    const dist = 200 + Math.random() * 100;
    bigSpark.style.left = window.innerWidth / 2 + 'px';
    bigSpark.style.top = window.innerHeight / 2 + 'px';
    bigSpark.style.setProperty('--x', Math.cos(angle) * dist + 'px');
    bigSpark.style.setProperty('--y', Math.sin(angle) * dist + 'px');
    decorations.appendChild(bigSpark);
    setTimeout(() => bigSpark.remove(), 1200);
  }

  // Firework style colorful particles
  for (let i = 0; i < 40; i++) {
    const fw = document.createElement('div');
    fw.className = 'fireworkParticle';
    const size = 8 + Math.random() * 8;
    fw.style.width = size + 'px';
    fw.style.height = size + 'px';
    fw.style.background = birdColors[Math.floor(Math.random() * birdColors.length)];
    fw.style.left = window.innerWidth / 2 + 'px';
    fw.style.top = window.innerHeight / 2 + 'px';
    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 150;
    fw.style.setProperty('--x', Math.cos(angle) * distance + 'px');
    fw.style.setProperty('--y', Math.sin(angle) * distance + 'px');
    decorations.appendChild(fw);
    setTimeout(() => fw.remove(), 1000);
  }

  setTimeout(() => body.classList.remove('shake', 'patriotsFlash'), 2000);
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 's') seahawks.click();
  if (e.key.toLowerCase() === 'p') patriots.click();
  if (e.key.toLowerCase() === 'r') location.reload();
});
