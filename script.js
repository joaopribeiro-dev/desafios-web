const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext('2d');
const form = document.getElementById("acessForm");
const input = document.getElementById("commandInput");
const errorMessage = document.getElementById("errorMessage");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', ()=> {
    resizeCanvas();
    createNebulas();

    stars.forEach(star => {
        if (star.x > canvas.width) star.x = Math.random() * canvas.width;
        if (star.y > canvas.height) star.y = Math.random() * canvas.height;
    });
});

let stars = [];
let nebulas = [];
let speed = 0.5;
let fadeOpacity = 0;
let time = 0;

for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random()
    });
}

function cosmos() {
    time += 0.03;

    const sunX = canvas.width * 0.25;
    const sunY = canvas.height * 0.5;
    const sunRadius = 80;

    let sunGlow = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.5, sunX, sunY, sunRadius * 2,);
    sunGlow.addColorStop(0, "rgba(255, 200, 50, 1)");
    sunGlow.addColorStop(0.5, "rgba(255, 100, 0, 0.4)");
    sunGlow.addColorStop(1, "rgba(255, 50, 0, 0)");

    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 180, 30, 0.7)";
    ctx.lineWidth = 3;
    for (let i = 0; i < 12; i++) {
        let angle = (i / 12) * Math.PI * 2 + time * 0.1;
        let pulse = Math.sin(time * 3 + i) * 15 + 10;

        let startX = sunX + Math.cos(angle) * sunRadius;
        let startY = sunY + Math.sin(angle) * sunRadius;
        let endX = sunX + Math.cos(angle) * (sunRadius + pulse);
        let endY = sunY + Math.sin(angle) * (sunRadius + pulse);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    ctx.fillStyle = "#ffcc00";
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();

    const blackHoleX = canvas.width * 0.75;
    const blackHoleY = canvas.height * 0.5;
    const blackHoleRadius = 100;

    const orbitalTime = time % (Math.PI * 2);

    ctx.save();
    ctx.translate(blackHoleX, blackHoleY);
    ctx.rotate(30 * Math.PI / -180);

    const numLinhas = 200;
    for (let i = 0; i < numLinhas; i++) {
        let r = (blackHoleRadius - 50)+ (i * 0.75) + Math.sin(orbitalTime * 2 + i) * 1.5;

        let orbitalSpeed = 1.2 / (r / 40);

        let startAngle = (orbitalTime * orbitalSpeed) + (i * 0.25);
        let arcLength = 1.5 + Math.sin(orbitalTime + i) * 0.8;
        let endAngle = startAngle + arcLength;

        let alpha = (1 - (i / numLinhas)) * 0.45;
        let color = i < 30 ? `rgba(255, 255, 255, ${alpha})`:
                    i < 60 ? `rgba(255, 180, 20, ${alpha * 0.95})`:
                    i < 90 ? `rgba(255, 120, 0, ${alpha * 0.75})`:
                    i < 120 ? `rgba(255, 60, 0, ${alpha * 0.4})`:
                    `rgba(150, 0, 100, ${alpha * 0.4})`;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.8 + (Math.sin(orbitalTime + i) * 0.4);
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 2.5, r * 0.34, 0, Math.PI, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore();

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(blackHoleX, blackHoleY, blackHoleRadius, 0, Math.PI * 2);
    ctx.fill();
    
    let glowGrad = ctx.createRadialGradient(blackHoleX, blackHoleY, blackHoleRadius, blackHoleX, blackHoleY, blackHoleRadius + 30);
    glowGrad.addColorStop(0, "rgba(0, 0, 0, 0.45)");
    glowGrad.addColorStop(0.3, "rgb(255, 255, 255)");
    glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(blackHoleX, blackHoleY, blackHoleRadius + 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgb(206, 206, 206)";
    ctx.lineWidth = 4 + Math.sin(orbitalTime * 5) * 0.4;
    ctx.beginPath();
    ctx.arc(blackHoleX, blackHoleY, blackHoleRadius + 1, 0, Math.PI * 2);
    ctx.stroke();

    ctx.save();
    ctx.translate(blackHoleX, blackHoleY);
    ctx.rotate(30 * Math.PI / -180);

    for (let i = 0; i < numLinhas; i++) {
        let r = (blackHoleRadius - 50)+ (i * 0.75) + Math.sin(orbitalTime * 2 + i) * 1.5;
        let orbitalSpeed = 1.2 / (r / 40);

        let startAngle = (orbitalTime * orbitalSpeed) + (i * 0.25);
        let arcLength = 1.5 + Math.sin(orbitalTime + i) * 0.8;
        let endAngle = startAngle + arcLength;

        let alpha = (1 - (i / numLinhas)) * 0.45;
        let color = i < 30 ? `rgba(255, 255, 255, ${alpha})`:
                    i < 60 ? `rgba(255, 180, 20, ${alpha * 0.95})`:
                    i < 90 ? `rgba(255, 120, 0, ${alpha * 0.75})`:
                    i < 120 ? `rgba(255, 60, 0, ${alpha * 0.4})`:
                    `rgba(150, 0, 100, ${alpha * 0.4})`;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.8 + (Math.sin(orbitalTime + i) * 0.4);
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 2.5, r * 0.34, 0, 0, Math.PI);
        ctx.stroke();
    }
    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "screen";

    nebulas.forEach(nebula => {
        nebula.x += nebula.vx;
        nebula.y += nebula.vy;

        if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
        if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;

        let gradient = ctx.createRadialGradient(
            nebula.x, nebula.y, 0,
            nebula.x, nebula.y, nebula.radius
        );

        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(0.5, nebula.color.replace(/0\.\d+/, "0.1"));
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalCompositeOperation = "source-over";

    cosmos();

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";

    stars.forEach(star => {
        star.x += speed;

        if (star.x > canvas.width) {
            star.x = 0;
            star.y = Math.random() * canvas.height;
        }

        ctx.globalAlpha = star.alpha;

        if (speed >= 30) {
            ctx.lineWidth = star.radius;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star.x - (speed * 0.4), star.y);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    ctx.globalAlpha = 1;

    if (fadeOpacity > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(animate);
}

function createNebula() {
    nebulas = [];

    const colors = [
        "rgba(41, 0, 61, 0.16)",
        "rgba(0, 37, 88, 0.12)",
        "rgba(75, 1, 54, 0.10)",
        "rgba(0, 65, 65, 0.08)"
    ];

    for (let i = 0; i < 7; i++) {
        nebulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 300 + 200,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1
        });
    }
}

createNebula();

animate();

form.addEventListener('submit', (event)=> {
    event.preventDefault();

    const typedValue = input.value.trim().toLowerCase();

    if (typedValue === "hello world" || typedValue === "hello world!") {
        errorMessage.style.color = "#00f2fe";
        errorMessage.textContent = "ACESSO CONCEDIDO! Entrando...";

        document.querySelector(".central").style.transition = "opacity 0.5s";
        document.querySelector(".central").style.opacity = "0";

        const velocidade = setInterval(() => {
            speed += 2;

            if (speed >= 70) {
                fadeOpacity = (speed - 70) / 30;
            }

            if (speed >= 100) {
                fadeOpacity = 1;
                clearInterval(velocidade);

                window.location.href = "home.html";
            }
        }, 100);
    } else {
        errorMessage.style.color = "#ff4d4d";
        errorMessage.textContent = "Comando incorreto. Tente 'Hello World!'";

        input.style.borderColor = "#ff4d4d";
        setTimeout(() => {
            input.style.borderColor = "White";
        }, 1000);
    }
});