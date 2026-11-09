import * as THREE from 'three';

export function createMoon(scene) {
    // ==================================================
    // CONFIGURAÇÃO DA LUA
    // ==================================================

    const moonGroup = new THREE.Group();
    scene.add(moonGroup);

    const geometry = new THREE.SphereGeometry(0.5, 64, 64);

    // ==================================================
    // TEXTURA DA LUA
    // ==================================================

    const moonCanvas = document.createElement("canvas");
    moonCanvas.width = 1024;
    moonCanvas.height = 512;

    const ctxMoon = moonCanvas.getContext("2d");

    const width = moonCanvas.width;
    const height = moonCanvas.height;

    ctxMoon.fillStyle = "#8a8a8a";
    ctxMoon.fillRect(0, 0, 1024, 512);

    for (let i = 0; i < 5000; i++) {
        ctxMoon.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
        ctxMoon.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }

    function drawCrater(x, y, radius) {
        const shadowGrad = ctxMoon.createRadialGradient(
            x - radius * 0.2, y - radius * 0.2, 0,
            x, y, radius
        );

        shadowGrad.addColorStop(0, "rgba(30, 30, 30, 1)");
        shadowGrad.addColorStop(0.7, "rgba(50, 50, 50, 1)");
        shadowGrad.addColorStop(0.9, "rgba(100, 100, 100, 0.3)");
        shadowGrad.addColorStop(1, "rgba(138, 138, 138, 0)");

        ctxMoon.fillStyle = shadowGrad;
        ctxMoon.beginPath();
        ctxMoon.arc(x, y, radius, 0, Math.PI * 2);
        ctxMoon.fill();

        const rimGrad = ctxMoon.createRadialGradient(
            x + radius * 0.1, y + radius * 0.1, radius * 0.8,
            x, y, radius * 1.1
        );

        rimGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        rimGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.25)");
        rimGrad.addColorStop(0.8, "rgba(0, 0, 0, 0.4)");
        rimGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctxMoon.fillStyle = rimGrad;
        ctxMoon.beginPath();
        ctxMoon.arc(x, y, radius * 1.1, 0, Math.PI * 2);
        ctxMoon.fill();
    }

    for (let i = 0; i < 150; i++) {
        const x = Math.random() * 1024;
        const y = 30 + Math.random() * 512;
        const radius = Math.random() * 12 + 6;

        const gradient = ctxMoon.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(68, 68, 68, 1)");
        gradient.addColorStop(0.5, "rgba(68, 68, 68, 0.5)");
        gradient.addColorStop(1, "rgba(68, 68, 68, 0)");

        ctxMoon.fillStyle = gradient;
        ctxMoon.beginPath();
        ctxMoon.arc(x, y, radius, 0, Math.PI * 2);
        ctxMoon.fill();
    }

    for (let i = 0; i < 75; i++) {
        const x = Math.random() * 1024;
        const y = 30 + Math.random() * 512;
        const radius = Math.random() * 18 + 12;

        const gradient = ctxMoon.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgb(33, 33, 33)");
        gradient.addColorStop(0.5, "rgba(33, 33, 33, 0.5)");
        gradient.addColorStop(1, "rgba(33, 33, 33, 0)");

        ctxMoon.fillStyle = gradient;
        ctxMoon.beginPath();
        ctxMoon.arc(x, y, radius, 0, Math.PI * 2);
        ctxMoon.fill();
    }

    for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = 60 + Math.random() * (height - 120);
        const radius = Math.random() * 18 + 12;

        drawCrater(x, y, radius);
    }

    // ==================================================
    // MATERIAL DA LUA
    // ==================================================

    const moonTexture = new THREE.CanvasTexture(moonCanvas);
    const bumpTexture = new THREE.CanvasTexture(moonCanvas);

    moonTexture.needsUpdate = true;

    const material = new THREE.MeshStandardMaterial({
        map: moonTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.015,
        roughness: 1,
        metalness: 0
    });

    const sphere = new THREE.Mesh(geometry, material);
    moonGroup.add(sphere);
    
    // ==================================================
    // ATUALIZAÇÃO DA LUA
    // ==================================================

    function update() {
        moonGroup.rotation.y += 0.002;
    }
    
    return {
        group: moonGroup,
        update
    };
}