import * as THREE from 'three';

export function createMercury(scene) {
    // ==================================================
    // CONFIGURAÇÃO DE MERCÚRIO
    // ==================================================

    const mercuryGroup = new THREE.Group();
    scene.add(mercuryGroup);

    mercuryGroup.rotation.z = THREE.MathUtils.degToRad(0.034);

    const geometry = new THREE.SphereGeometry(0.8, 64, 64);

    // ==================================================
    // TEXTURA DE MERCÚRIO
    // ==================================================

    const mercuryCanvas = document.createElement("canvas");
    mercuryCanvas.width = 512;
    mercuryCanvas.height = 256;

    const ctxMercury = mercuryCanvas.getContext("2d");

    ctxMercury.fillStyle = "#625D56";
    ctxMercury.fillRect(0, 0, 512, 256);

    function drawCrater(ctx, x, y, radius) {
        // ==================================================
        // FORMATO IRREGULAR DA CRATERA
        // ==================================================

        const points = 60;
        const shape = [];

        for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2;

            const variation = 1 + Math.sin(angle * 3) * 0.08 + Math.cos(angle * 8) * 0.05 + Math.sin(angle * 13) * 0.025;

            const irregularRadius = radius * variation;

            shape.push({
                x: x + Math.cos(angle) * irregularRadius,
                y: y + Math.sin(angle) * irregularRadius
            });
        }

        // ==================================================
        // CAMINHO DA CRATERA
        // ==================================================

        function createShape(scale = 1) {
            ctx.beginPath();

            shape.forEach((point, i) => {
                const px = x + (point.x - x) * scale;
                const py = y + (point.y - y) * scale;

                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            });

            ctx.closePath();
        }

        // ==================================================
        // SOMBRA EXTERNA
        // ==================================================

        ctx.save();

        createShape(1.2);

        ctx.shadowColor = "rgba(20, 18, 16, 0.8)";
        ctx.shadowBlur = radius * 0.3;
        ctx.fillStyle = "rgba(35, 32, 29, 0.7)";
        ctx.fill();

        ctx.restore();

        // ==================================================
        // BORDA DA CRATERA
        // ==================================================

        createShape();

        const rim = ctx.createRadialGradient(
            x - radius * 0.25,
            y - radius * 0.25,
            0,
            x, y, radius
        );

        rim.addColorStop(0, "rgba(55, 51, 46, 0.95)");
        rim.addColorStop(0.75, "rgba(110, 103, 92, 0.9)");
        rim.addColorStop(1, "rgba(210, 205, 195, 0.85)");

        ctx.fillStyle = rim;
        ctx.fill();

        // ==================================================
        // INTERIOR DA CRATERA
        // ==================================================

        createShape(0.72);

        const interior = ctx.createRadialGradient(
            x - radius * 0.2,
            y - radius * 0.2,
            0,
            x, y, radius
        );

        interior.addColorStop(0, "rgba(30, 28, 25, 0.95)");
        interior.addColorStop(0.7, "rgba(55, 51, 46, 0.9)");
        interior.addColorStop(1, "rgba(85, 80, 73, 0.3)");

        ctx.fillStyle = interior;
        ctx.fill();
    }

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const radius = Math.random() * 12 + 5;

        const gradient = ctxMercury.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(45, 43, 40, 0.85)");
        gradient.addColorStop(0.5, "rgba(105, 100, 93, 0.55)");
        gradient.addColorStop(1, "rgba(160, 155, 145, 0)");

        ctxMercury.fillStyle = gradient;
        ctxMercury.beginPath();
        ctxMercury.arc(x, y, radius, 0, Math.PI * 2);
        ctxMercury.fill();
    }

    for (let i = 0; i < 18; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const radius = Math.random() * 12 + 12;

        drawCrater(ctxMercury, x, y, radius);
    }

    for (let i = 0; i < 200; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const radius = Math.random() * 18 + 10;

        const gradient = ctxMercury.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(220, 215, 205, 0.45)");
        gradient.addColorStop(0.5, "rgba(175, 170, 160, 0.30)");
        gradient.addColorStop(1, "rgba(135, 130, 120, 0)");

        ctxMercury.fillStyle = gradient;
        ctxMercury.beginPath();
        ctxMercury.arc(x, y, radius, 0, Math.PI * 2);
        ctxMercury.fill();
    }

    for (let i = 0; i < 500; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const radius = Math.random() * 12 + 5;

        const gradient = ctxMercury.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(190, 185, 175, 0.25)");
        gradient.addColorStop(0.5, "rgba(145, 140, 130, 0.18)");
        gradient.addColorStop(1, "rgba(110, 105, 95, 0)");

        ctxMercury.fillStyle = gradient;
        ctxMercury.beginPath();
        ctxMercury.arc(x, y, radius, 0, Math.PI * 2);
        ctxMercury.fill();
    }

    for (let i = 0; i < 15; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const radius = Math.random() * 15 + 18;

        const gradient = ctxMercury.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(83, 82, 81, 0.75)");
        gradient.addColorStop(0.65, "rgba(75, 70, 63, 0.45) ");
        gradient.addColorStop(1, "rgba(130, 125, 115, 0)");

        ctxMercury.fillStyle = gradient;
        ctxMercury.beginPath();
        ctxMercury.arc(x, y, radius, 0, Math.PI * 2);
        ctxMercury.fill();
    }

    for (let i = 0; i < 7; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const radius = Math.random() * 15 + 18;

        const gradient = ctxMercury.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(210, 205, 195, 0.85)");
        gradient.addColorStop(0.65, "rgba(175, 170, 160, 0.65)");
        gradient.addColorStop(1, "rgba(145, 140, 130, 0)");

        ctxMercury.fillStyle = gradient;
        ctxMercury.beginPath();
        ctxMercury.arc(x, y, radius, 0, Math.PI * 2);
        ctxMercury.fill();
    }

    // ==================================================
    // MATERIAL MERCÚRIO
    // ==================================================

    const mercuryTexture = new THREE.CanvasTexture(mercuryCanvas);

    const material = new THREE.MeshStandardMaterial({
        map: mercuryTexture,
        color: 0xffffff,
        emissive: 0x000000,
        emissiveIntensity: 0,
        roughness: 0.95,
        metalness: 0.05
    });

    const sphere = new THREE.Mesh(geometry, material);
    mercuryGroup.add(sphere);
    
    // ==================================================
    // ATUALIZAÇÃO DE MERCÚRIO
    // ==================================================

    function update() {
        mercuryGroup.rotation.y += 0.009;
    }
    
    return {
        group: mercuryGroup,
        update
    };
}