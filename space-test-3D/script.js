import * as THREE from 'three';

import { createSun } from '../scripts-astros/sun.js';
import { createMercury } from '../scripts-astros/mercury.js';

// ==================================================
// CONFIGURAÇÃO INICIAL
// ==================================================

const universe3D = document.getElementById("universe3D");

const cameraX = document.getElementById("cameraX");
const cameraY = document.getElementById("cameraY");
const cameraZ = document.getElementById("cameraZ");

const scene = new THREE.Scene();

const light = new THREE.PointLight(0xffffff, 3);
light.position.set(3, 3, 5);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 5);

// Luz da câmera
const cameraLight = new THREE.PointLight(0xffffff, 0, 100);
camera.add(cameraLight);

// ==================================================
// RENDERIZADOR
// ==================================================

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

universe3D.appendChild(renderer.domElement);

// ==================================================
// ASTROS 3D
// ==================================================

const sun = createSun(scene);

sun.group.position.set(0, -1.5, -10);

const mercury = createMercury(scene);

mercury.group.position.set(-3.5, -0.5, -30);

// ==================================================
// MOVIMENTAÇÃO DOS ASTROS
// ==================================================

let sunApproach = 0;
let startSunApproach = false;

let startMercuryApproach = false;

// ==================================================
// ANIMAÇÃO PRINCIPAL
// ==================================================

function animate3D() {
    requestAnimationFrame(animate3D);

    // Aproximação do Sol
    if (startSunApproach && sunApproach < 1) {
        sunApproach = Math.min(sunApproach + 0.01, 1);

        sun.group.position.z = -10 + (30 * sunApproach);
    }

    // Aproximação de Mercúrio
    if (startMercuryApproach && mercury.group.position.z < 5) {
        mercury.group.position.z += 0.2;

        const distance = mercury.group.position.z;

        // Iluminação gradual
        cameraLight.intensity = THREE.MathUtils.clamp(
            (distance + 15) / 10,
            0,
            8
        );
    }

    // Atualização dos astros
    sun.update();
    mercury.update();

    // Atualização das coordenadas da câmera
    cameraX.textContent = camera.position.x.toFixed(2);
    cameraY.textContent = camera.position.y.toFixed(2);
    cameraZ.textContent = camera.position.z.toFixed(2);

    renderer.render(scene, camera);
}

animate3D();

// ==================================================
// REDIMENSIONAMENTO DA TELA
// ==================================================

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );
});

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext('2d');
const form = document.getElementById("acessForm");
const input = document.getElementById("commandInput");
const errorMessage = document.getElementById("errorMessage");

let focalLength = window.innerWidth * 0.8;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    focalLength = window.innerWidth * 0.8;
}
resizeCanvas();

let stars = [];
let speed = 2;
let fadeOpacity = 0;
let time = 0;

const numStars = 500;

function createStars() {
    return {
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width + 10,
        prevZ: 0,
        radius: Math.random() * 1.5,
        alpha: Math.random()
    };
}

function resetStar(star) {
    star.x = (Math.random() - 0.5) * canvas.width * 2;
    star.y = (Math.random() - 0.5) * canvas.height * 2;
    star.z = canvas.width;
    star.prevZ = star.z;
    star.radius = Math.random() * 1.5;
    star.alpha = Math.random();
}

for (let i = 0; i < numStars; i++) {
    let s = createStars();
    s.prevZ = s.z;
    stars.push(s);
}

window.addEventListener('resize', ()=> {
    resizeCanvas();

    stars.forEach(star => {
        star.x = (Math.random() - 0.5) * canvas.width * 2;
        star.y = (Math.random() - 0.5) * canvas.height * 2;
    });
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "screen";

    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

stars.forEach(star => {
    const previousX = star.x;
    const previousY = star.y;
    const previousZ = star.z;

    let wasReset = false;

    star.z -= speed;

    if (star.z <= 0) {
        resetStar(star);
        wasReset = true;
    }

    let k = focalLength / star.z;
    let px = centerX + star.x * k;
    let py = centerY + star.y * k;

    if (!wasReset && star.z < canvas.width * 0.5 && (px < 0 || px > canvas.width || py < 0 || py > canvas.height)) {
        resetStar(star);
        wasReset = true;

        k = focalLength / star.z;
        px = centerX + star.x * k;
        py = centerY + star.y * k;
    }

    if (wasReset) {
        return;
    }

    const prevK = focalLength / previousZ;
    const prevPx = centerX + previousX * prevK;
    const prevPy = centerY + previousY * prevK;

    if (px < 0 || px > canvas.width || py < 0 || py > canvas.height) {
        return;
    }

    ctx.globalAlpha = star.alpha;

    if (speed >= 30) {
        ctx.lineWidth = Math.min(1.5, Math.max(0.4, star.radius * (1 - star.z / canvas.width) * 1.2));

        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.stroke();
    } else {
        const currentRadius = Math.max(
            0.2,
            (1 - star.z / canvas.width) * star.radius * 2.5
        );

        ctx.beginPath();
        ctx.arc(px, py, currentRadius, 0, Math.PI * 2);
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

requestAnimationFrame(animate);

const central = document.querySelector(".central");

form.addEventListener('submit', (event)=> {
    event.preventDefault();

    const typedValue = input.value.trim().toLowerCase();

    if (typedValue === "hello world" || typedValue === "hello world!") {
        errorMessage.style.color = "#00f2fe";
        errorMessage.textContent = "ACESSO CONCEDIDO! Entrando...";

        startSunApproach = true;
        startMercuryApproach = true;

        central.style.pointerEvents = "none";
        central.inert = true;

        document.querySelector(".central").style.transition = "opacity 0.5s";
        document.querySelector(".central").style.opacity = "0";

        const velocidade = setInterval(() => {
            speed += 2;

            if (speed >= 230) {
                fadeOpacity = (speed - 230) / 25;
            }

            if (speed >= 280) {
                fadeOpacity = 1;
                clearInterval(velocidade);

                window.location.href = "index.html";
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