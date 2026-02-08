const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');
const seahawks = document.getElementById('seahawks');
const patriots = document.getElementById('patriots');
const resultText = document.getElementById('resultText');
const body = document.body;
const decorations = document.getElementById('decorations');
const canvas = document.getElementById('confettiCanvas');

// Start button
startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'flex';
});

// Create confetti
const confettiInstance = confetti.create(canvas, { resize: true });

// LOCK after click
function lockTeams() {
  seahawks.style.pointerEvents = 'none';
  patriots.style.pointerEvents = 'none';
}

// SEAHAWKS WIN
seahawks.addEventListener('click', () => {
  lockTeams();
  gameScreen.style.display = 'none';
  resultScreen.style.display = 'flex';
  body.classList.add('disco');
  resultText.textContent = "GO HAWKS! 🎉";

  // Confetti
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

  // Stop after 6 seconds
  setTimeout(() => {
    clearInterval(confettiInterval);
    clearInterval(flyLogos);
  }, 6000);
});

// DOUBLE CLICK = MEGA CELEBRATION
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

// PATRIOTS LOSE
patriots.addEventListener('click', () => {
  lockTeams();
  gameScreen.style.display = 'none';
  resultScreen.style.display = 'flex';
  body.classList.add('shake');
  resultText.textContent = "LOSER 💥";

  // Explosion confetti
  confettiInstance({
    particleCount: 200,
    spread: 200,
    origin: { y: 0.5 },
    colors: ['#ff0000', '#ff9900', '#000000']
  });

  // Sparks
  const sparksInterval = setInterval(() => {
    const spark = document.createElement('div');
    spark.className = 'spark';
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    spark.style.left = window.innerWidth / 2 + 'px';
    spark.style.top = window.innerHeight / 2 + 'px';
    spark.style.setProperty('--x', x + 'px');
    spark.style.setProperty('--y', y + 'px');
    decorations.appendChild(spark);
    setTimeout(() => spark.remove(), 1000);
  }, 100);

  setTimeout(() => body.classList.remove('shake'), 3000);
});

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 's') seahawks.click();
  if (e.key.toLowerCase() === 'p') patriots.click();
  if (e.key.toLowerCase() === 'r') location.reload();
});
