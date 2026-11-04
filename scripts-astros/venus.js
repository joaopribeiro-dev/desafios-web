import * as THREE from 'three';

export function createVenus(scene) {
    // ==================================================
    // CONFIGURAÇÃO DE VÊNUS
    // ==================================================

    const venusGroup = new THREE.Group();
    scene.add(venusGroup);

    venusGroup.rotation.z = THREE.MathUtils.degToRad(12.5);

    const geometry = new THREE.SphereGeometry(0.9, 64, 64);

    // ==================================================
    // TEXTURA DE VÊNUS
    // ==================================================

    const venusCanvas = document.createElement("canvas");
    venusCanvas.width = 1024;
    venusCanvas.height = 512;

    const ctxVenus = venusCanvas.getContext("2d");

    const gradient = ctxVenus.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0.0, '#a25016');
    gradient.addColorStop(0.25, '#d98e2b');
    gradient.addColorStop(0.5, '#f7cd6d');
    gradient.addColorStop(0.75, '#cb7922');
    gradient.addColorStop(1.0, '#823b0d');

    ctxVenus.fillStyle = gradient;
    ctxVenus.fillRect(0, 0, 1024, 512);

    for (let i = 0; i < 90; i++) {
        const y  = Math.random() * 512;
        const height = Math.random() * 30 + 15;
        const alpha = Math.random() * 0.25 + 0.05;

        ctxVenus.fillStyle = i % 2 === 0 
            ? `rgba(255, 240, 190, ${alpha})` 
            : `rgba(130, 45, 5, ${alpha})`;
        ctxVenus.beginPath();
        ctxVenus.moveTo(0, y)

        for (let x = 0; x <= 1024; x += 16) {
            const waveY = y + Math.sin((x / 1024) * Math.PI * 2 * 3 + i) * 18;
            ctxVenus.lineTo(x, waveY);
        }

        ctxVenus.lineTo(1024, y + height);
        ctxVenus.lineTo(0, y + height);
        ctxVenus.closePath();
        ctxVenus.fill();
    }

    // ==================================================
    // MATERIAL VÊNUS
    // ==================================================

    const venusTexture = new THREE.CanvasTexture(venusCanvas);

    venusTexture.needsUpdate = true;

    const material = new THREE.MeshStandardMaterial({
        map: venusTexture,
        emissive: 0x3d1a04,
        emissiveIntensity: 0.2,
        roughness: 0.7,
        metalness: 0.05
    })

    const sphere = new THREE.Mesh(geometry, material);
    venusGroup.add(sphere);
    
    // ==================================================
    // ATUALIZAÇÃO DE VÊNUS
    // ==================================================

    function update() {
        venusGroup.rotation.y += 0.002;
    }
    
    return {
        group: venusGroup,
        update
    };
}