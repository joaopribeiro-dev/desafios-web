import * as THREE from 'three';

export function createMars(scene) {
    // ==================================================
    // CONFIGURAÇÃO DE MARTE
    // ==================================================

    const marsGroup = new THREE.Group();
    scene.add(marsGroup);

    marsGroup.rotation.z = THREE.MathUtils.degToRad(25.19);

    const geometry = new THREE.SphereGeometry(0.95, 64, 64);

    // ==================================================
    // TEXTURA DE MARTE
    // ==================================================

    const marsCanvas = document.createElement("canvas");
    marsCanvas.width = 1024;
    marsCanvas.height = 512;

    const ctxMars = marsCanvas.getContext("2d");

    const width = marsCanvas.width;
    const height = marsCanvas.height;

    ctxMars.fillStyle = "#C65D36";
    ctxMars.fillRect(0, 0, width, height);

    function drawCrater(x, y, radius) {
        const ellipseY = radius * 0.78;
        const rotation = Math.random() * Math.PI;

        ctxMars.save();

        const outerShadow = ctxMars.createRadialGradient(
            x, y, radius * 0.3,
            x, y, radius * 1.3
        );

        outerShadow.addColorStop(0, "rgba(75, 37, 29, 0.45)");
        outerShadow.addColorStop(0.7, "rgba(75, 37, 29, 0.2)");
        outerShadow.addColorStop(1, "rgba(75, 37, 29, 0)");

        ctxMars.fillStyle = outerShadow;
        ctxMars.beginPath();
        ctxMars.ellipse(x, y, radius * 1.3, ellipseY * 1.3, rotation, 0, Math.PI * 2);
        ctxMars.fill();

        const interior = ctxMars.createRadialGradient(
            x - radius * 0.2,
            y - ellipseY * 0.2,
            radius * 0.05,
            x, y, radius
        );

        interior.addColorStop(0, "rgba(75, 38, 30, 0.9)");
        interior.addColorStop(0.55, "rgba(105, 51, 37, 0.85)");
        interior.addColorStop(0.85, "rgba(145, 72, 48, 0.7)");
        interior.addColorStop(1, "rgba(180, 91, 58, 0.1)");

        ctxMars.fillStyle = interior;
        ctxMars.beginPath();
        ctxMars.ellipse(x, y, radius, ellipseY, rotation, 0, Math.PI * 2);
        ctxMars.fill();

        ctxMars.beginPath();
        ctxMars.ellipse(x, y, radius * 0.94, ellipseY * 0.94, rotation, Math.PI * 1.05, Math.PI * 1.9);

        ctxMars.strokeStyle = "rgba(235, 157, 108, 0.8)";
        ctxMars.lineWidth = Math.max(1, radius * 0.13);
        ctxMars.lineCap = "round";
        ctxMars.stroke();

        ctxMars.beginPath();
        ctxMars.ellipse(x, y, radius * 0.94, ellipseY * 0.94, rotation, 0.1, Math.PI * 0.9);

        ctxMars.strokeStyle = "rgba(65, 32, 25, 0.65)";
        ctxMars.lineWidth = Math.max(1, radius * 0.15);
        ctxMars.lineCap = "round";
        ctxMars.stroke();

        ctxMars.restore();
    }

    for (let i = 0; i < 300; i++) {
        const x = Math.random() * 1024;
        const y = 30 + Math.random() * 512;
        const radius = Math.random() * 12 + 18;

        const gradient = ctxMars.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(169, 71, 45, 1)");
        gradient.addColorStop(0.5, "rgba(169, 71, 45, 0.5)");
        gradient.addColorStop(1, "rgba(169, 71, 45, 0)");

        ctxMars.fillStyle = gradient;
        ctxMars.beginPath();
        ctxMars.arc(x, y, radius, 0, Math.PI * 2);
        ctxMars.fill();
    }
    
    for (let i = 0; i < 150; i++) {
        const x = Math.random() * 1024;
        const y = 30 + Math.random() * 512;
        const radius = Math.random() * 12 + 18;

        const gradient = ctxMars.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(217, 130, 80, 1)");
        gradient.addColorStop(0.5, "rgba(217, 130, 80, 0.5)");
        gradient.addColorStop(1, "rgba(217, 130, 80, 0)");

        ctxMars.fillStyle = gradient;
        ctxMars.beginPath();
        ctxMars.arc(x, y, radius, 0, Math.PI * 2);
        ctxMars.fill();
    }

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 1024;
        const y = 30 + Math.random() * 512;
        const radius = Math.random() * 12 + 18;

        const gradient = ctxMars.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(139, 96, 72, 1)");
        gradient.addColorStop(0.5, "rgba(139, 96, 72, 0.5)");
        gradient.addColorStop(1, "rgba(139, 96, 72, 0)");

        ctxMars.fillStyle = gradient;
        ctxMars.beginPath();
        ctxMars.arc(x, y, radius, 0, Math.PI * 2);
        ctxMars.fill();
    }

    for (let i = 0; i < 75; i++) {
        const x = Math.random() * 1024;
        const y = 30 + Math.random() * 512;
        const radius = Math.random() * 12 + 18;

        const gradient = ctxMars.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(230, 164, 119, 1)");
        gradient.addColorStop(0.5, "rgba(230, 164, 119, 0.5)");
        gradient.addColorStop(1, "rgba(230, 164, 119, 0)");

        ctxMars.fillStyle = gradient;
        ctxMars.beginPath();
        ctxMars.arc(x, y, radius, 0, Math.PI * 2);
        ctxMars.fill();
    }

    for (let i = 0; i < 65; i++) {
        const radius = Math.random() * 12 + 6;
        const x = radius * 1.5 + Math.random() * (width - radius * 3);
        const y = radius * 1.5 + Math.random() * (height - radius * 3);

        drawCrater(x, y, radius);
    }

    // ==================================================
    // MATERIAL DE MARTE
    // ==================================================

    const marsTexture = new THREE.CanvasTexture(marsCanvas);

    marsTexture.needsUpdate = true;

    const material = new THREE.MeshStandardMaterial({
        map: marsTexture,
        roughness: 1,
        metalness: 0
    });

    const sphere = new THREE.Mesh(geometry, material);
    marsGroup.add(sphere);

    // ==================================================
    // CONFIGURAÇÃO DA ATMOSFERA
    // ==================================================

    const atmosphericGeometry = new THREE.SphereGeometry(1.01, 64, 64);

    const atmosphericMaterial = new THREE.MeshBasicMaterial({
        color: 0xD98A68,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide
    });

    const atmosphere = new THREE.Mesh(atmosphericGeometry, atmosphericMaterial);
    marsGroup.add(atmosphere);
    
    // ==================================================
    // ATUALIZAÇÃO DE MARTE
    // ==================================================

    function update() {
        marsGroup.rotation.y += 0.005;
    }
    
    return {
        group: marsGroup,
        update
    };
}