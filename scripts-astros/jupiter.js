import * as THREE from 'three';

export function createJupiter(scene) {
    // ==================================================
    // CONFIGURAÇÃO DE JÚPITER
    // ==================================================

    const jupiterGroup = new THREE.Group();
    scene.add(jupiterGroup);
    
    jupiterGroup.rotation.z = THREE.MathUtils.degToRad(3.13);

    const geometry = new THREE.SphereGeometry(1.2, 64, 64);

    // ==================================================
    // TEXTURA DE JúPITER
    // ==================================================

    const jupiterCanvas = document.createElement("canvas");
    jupiterCanvas.width = 1024;
    jupiterCanvas.height = 512;

    const ctxJupiter = jupiterCanvas.getContext("2d");

    const gradient = ctxJupiter.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, "#D9B99B");
    gradient.addColorStop(0.05, "#B98762");
    gradient.addColorStop(0.2, "#D9B99B");
    gradient.addColorStop(0.45, "#A96849");
    gradient.addColorStop(0.5, "#E8D5B9");
    gradient.addColorStop(0.65, "#A96849");
    gradient.addColorStop(0.8, "#D9B99B");
    gradient.addColorStop(0.95, "#B98762");
    gradient.addColorStop(1, "#D9B99B");

    ctxJupiter.fillStyle = gradient;
    ctxJupiter.fillRect(0, 0, 1024, 512);

    for (let i = 0; i < 100; i++) {
        const y = Math.random() * 512;
        const height = Math.random() * 30 + 15;
        const alpha = Math.random() * 0.35 + 0.05;

        ctxJupiter.fillStyle = i % 2 === 0 
            ? `rgba(255, 240, 190, ${alpha})` 
            : `rgba(130, 45, 5, ${alpha})`;
        ctxJupiter.beginPath();
        ctxJupiter.moveTo(0, y);

        for (let x = 0; x < 1024; x += 16) {
            const waveY = y + Math.sin((x / 1024) * Math.PI * 2 * 3 + i) * 18;
            ctxJupiter.lineTo(x, waveY);
        }

        ctxJupiter.lineTo(1024, y + height);
        ctxJupiter.lineTo(0, y + height);
        ctxJupiter.closePath();
        ctxJupiter.fill();
    }

    // ==================================================
    // GRANDE MANCHA VERMELHA
    // ==================================================

    const x = 180;
    const y = 300;

    const radiusX = 65;
    const radiusY = 32;

    ctxJupiter.save();
    ctxJupiter.translate(x, y);
    ctxJupiter.scale(1, radiusY /radiusX);

    const gradientStain = ctxJupiter.createRadialGradient(
        0, 0, 2,
        0, 0, radiusX
    )
    gradientStain.addColorStop(0, "#E8794D");
    gradientStain.addColorStop(0.35, "#C85B3D");
    gradientStain.addColorStop(0.7, "#A94732");
    gradientStain.addColorStop(1, "rgba(169, 71, 50, 0)");

    ctxJupiter.fillStyle = gradientStain;
    ctxJupiter.beginPath();
    ctxJupiter.arc(0, 0, radiusX, 0, Math.PI * 2);
    ctxJupiter.fill();

    ctxJupiter.restore();

    // ==================================================
    // MATERIAL DE JÚPITER
    // ==================================================

    const jupiterTexture = new THREE.CanvasTexture(jupiterCanvas);

    jupiterTexture.needsUpdate = true;

    const material = new THREE.MeshStandardMaterial({
        map: jupiterTexture,
        transparent: false,
        opacity: 1,
        roughness: 0.9,
        metalness: 0
    });

    const sphere = new THREE.Mesh(geometry, material);
    jupiterGroup.add(sphere);
    
    // ==================================================
    // ATUALIZAÇÃO DE JÚPITER
    // ==================================================

    function update() {
        jupiterGroup.rotation.y += 0.005;
    }
    
    return {
        group: jupiterGroup,
        update
    };
}