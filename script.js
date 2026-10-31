const targetDate = new Date("2026-11-02T00:00:00");
const timeElements = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCountdown() {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    Object.values(timeElements).forEach((element) => {
      element.textContent = "00";
    });
    document.querySelector(".countdown__date").textContent = "¡Hoy es tu día! Feliz cumpleaños, mi amor ♥";
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  timeElements.days.textContent = String(days).padStart(2, "0");
  timeElements.hours.textContent = String(hours).padStart(2, "0");
  timeElements.minutes.textContent = String(minutes).padStart(2, "0");
  timeElements.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

function showBirthdayCelebration() {
  const celebration = document.querySelector("#birthdayCelebration");
  const canvas = document.querySelector("#fireworks");
  const context = canvas.getContext("2d");
  const particles = [];
  const colors = ["#f6b6ac", "#f9d6c6", "#ffffff", "#e78378", "#ffd166"];
  let animationFrame;

  celebration.classList.add("is-visible");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createFirework() {
    const originX = Math.random() * canvas.width;
    const originY = Math.random() * canvas.height * 0.62;
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let index = 0; index < 70; index += 1) {
      const angle = (Math.PI * 2 * index) / 70;
      const speed = 1.5 + Math.random() * 3.5;
      particles.push({
        x: originX,
        y: originY,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: 1 + Math.random() * 2,
      });
    }
  }

  function animate() {
    context.fillStyle = "rgba(69, 44, 58, .18)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.velocityY += 0.025;
      particle.alpha -= 0.009;
      context.globalAlpha = Math.max(particle.alpha, 0);
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
    });

    context.globalAlpha = 1;
    for (let index = particles.length - 1; index >= 0; index -= 1) {
      if (particles[index].alpha <= 0) particles.splice(index, 1);
    }
    animationFrame = requestAnimationFrame(animate);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  createFirework();
  setInterval(createFirework, 900);
  animate();
}

if (Date.now() >= targetDate.getTime()) showBirthdayCelebration();
