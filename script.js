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

for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random()
    });
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