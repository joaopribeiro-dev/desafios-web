import * as THREE from 'three';

export function createSun(scene) {
    // ==================================================
    // CONFIGURAÇÃO DO SOL
    // ==================================================

    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // ==================================================
    // TEXTURA SOLAR
    // ==================================================

    const sunCanvas = document.createElement("canvas");
    sunCanvas.width = 512;
    sunCanvas.height = 256;

    const ctxSun = sunCanvas.getContext("2d");

    const baseGradient = ctxSun.createLinearGradient(0, 0, 512, 256);

    baseGradient.addColorStop(0, "#d96b00");
    baseGradient.addColorStop(0.35, "#c95600");
    baseGradient.addColorStop(0.7, "#b84300");
    baseGradient.addColorStop(1, "#d15f00");

    ctxSun.fillStyle = baseGradient;
    ctxSun.fillRect(0, 0, 512, 256);

    // Granulação solar
    for (let i = 0; i < 900; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;

        const radiusX = Math.random() * 3 + 1;
        const radiusY = Math.random() * 2 + 1;

        const brightness = Math.random();

        ctxSun.fillStyle = brightness > 0.5
            ? "rgba(255, 220, 120, 0.18)"
            : "rgba(180, 45, 0, 0.14)";

        ctxSun.beginPath();
        ctxSun.ellipse(
            x,
            y,
            radiusX,
            radiusY,
            Math.random() * Math.PI,
            0,
            Math.PI * 2
        );
        ctxSun.fill();
    }

    // Manchas médias
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const radius = Math.random() * 15 + 3;

        const spotGradient = ctxSun.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        spotGradient.addColorStop(0, "rgba(255, 230, 100, 0.9)");
        spotGradient.addColorStop(0.5, "rgba(255, 120, 0, 0.5)");
        spotGradient.addColorStop(1, "rgba(255, 80, 0, 0)");

        ctxSun.fillStyle = spotGradient;
        ctxSun.beginPath();
        ctxSun.arc(x, y, radius, 0, Math.PI * 2);
        ctxSun.fill();
    }

    // Pequenos detalhes
    for (let i = 0; i < 350; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const radius = Math.random() * 3 + 1;

        const gradient = ctxSun.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(255, 220, 100, 0.5)");
        gradient.addColorStop(1, "rgba(255, 150, 0, 0)");

        ctxSun.fillStyle = gradient;
        ctxSun.beginPath();
        ctxSun.arc(x, y, radius, 0, Math.PI * 2);
        ctxSun.fill();
    }

    // Manchas brilhantes
    for (let i = 0; i < 12; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const radius = Math.random() * 18 + 10;

        const gradient = ctxSun.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(255, 230, 100, 0.9)");
        gradient.addColorStop(0.5, "rgba(255, 170, 30, 0.5)");
        gradient.addColorStop(1, "rgba(255, 100, 0, 0)");

        ctxSun.fillStyle = gradient;
        ctxSun.beginPath();
        ctxSun.arc(x, y, radius, 0, Math.PI * 2);
        ctxSun.fill();
    }

    // Manchas escuras
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * 512;
        const y = 30 + Math.random() * 196;
        const radius = Math.random() * 12 + 5;

        const gradient = ctxSun.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(0, "rgba(100, 20, 0, 0.9)");
        gradient.addColorStop(0.6, "rgba(180, 40, 0, 0.5)");
        gradient.addColorStop(1, "rgba(180, 40, 0, 0)");

        ctxSun.fillStyle = gradient;
        ctxSun.beginPath();
        ctxSun.arc(x, y, radius, 0, Math.PI * 2);
        ctxSun.fill();
    }

    // ==================================================
    // MATERIAL SOLAR
    // ==================================================

    const sunTexture = new THREE.CanvasTexture(sunCanvas);

    const material = new THREE.MeshStandardMaterial({
        map: sunTexture,
        color: 0xffffff,
        emissive: 0xff5500,
        emissiveMap: sunTexture,
        emissiveIntensity: 2,
        roughness: 1,
        metalness: 0
    });

    const sphere = new THREE.Mesh(geometry, material);
    sunGroup.add(sphere);

    // ==================================================
    // PROEMINÊNCIAS SOLARES
    // ==================================================

    const prominenceCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0.7, 0.5, 0.5).normalize().multiplyScalar(0.8),
        new THREE.Vector3(0.9, 1.2, 0.5),
        new THREE.Vector3(0.28, 0.84, 0.46).normalize().multiplyScalar(0.8)
    );

    const prominenceGeometry = new THREE.TubeGeometry(
        prominenceCurve,
        32,
        0.035,
        8,
        false
    );

    // Textura das proeminências
    const prominenceCanvas = document.createElement("canvas");
    prominenceCanvas.width = 256;
    prominenceCanvas.height = 32;

    const ctxProminence = prominenceCanvas.getContext("2d");

    const gradientProminence = ctxProminence.createLinearGradient(
        0, 0,
        256, 0
    );

    gradientProminence.addColorStop(0, "#ff3c00");
    gradientProminence.addColorStop(0.25, "#ff8c00");
    gradientProminence.addColorStop(0.5, "#ffb52e");
    gradientProminence.addColorStop(0.75, "#ff8c00");
    gradientProminence.addColorStop(1, "#ff3c00");

    ctxProminence.fillStyle = gradientProminence;
    ctxProminence.fillRect(0, 0, 256, 32);

    const prominenceTextures = new THREE.CanvasTexture(prominenceCanvas);

    // Materiais
    const prominenceMaterial = new THREE.MeshBasicMaterial({
        map: prominenceTextures,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true
    });

    const prominenceGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6500,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        depthTest: true
    });

    // Proeminência original
    const prominenceGlowGeometry = new THREE.TubeGeometry(
        prominenceCurve,
        32,
        0.075,
        8,
        false
    );

    const prominenceGlow = new THREE.Mesh(
        prominenceGlowGeometry,
        prominenceGlowMaterial
    );

    const prominence = new THREE.Mesh(
        prominenceGeometry,
        prominenceMaterial
    );

    const originalProminence = new THREE.Group();

    originalProminence.add(prominence);
    originalProminence.add(prominenceGlow);

    sunGroup.add(originalProminence);

    // Criação das outras proeminências
    function createProminence(start, control, end) {
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...start).normalize().multiplyScalar(0.8),
            new THREE.Vector3(...control),
            new THREE.Vector3(...end).normalize().multiplyScalar(0.8)
        );

        const geometry = new THREE.TubeGeometry(
            curve,
            32,
            0.035,
            8,
            false
        );

        const glowGeometry = new THREE.TubeGeometry(
            curve,
            32,
            0.075,
            8,
            false
        );

        const prominence = new THREE.Mesh(
            geometry,
            prominenceMaterial
        );

        const glow = new THREE.Mesh(
            glowGeometry,
            prominenceGlowMaterial
        );

        const prominenceGroup = new THREE.Group();

        prominenceGroup.add(glow);
        prominenceGroup.add(prominence);

        sunGroup.add(prominenceGroup);

        return prominenceGroup;
    }

    // Lista de proeminências
    const prominences = [
        originalProminence,

        createProminence(
            [0.15, 0.98, 0.08],
            [0.10, 1.30, 0.08],
            [-0.15, 0.98, 0.08]
        ),

        createProminence(
            [-0.98, 0.12, 0.08],
            [-1.28, 0.35, 0.08],
            [-0.92, 0.38, 0.08]
        ),

        createProminence(
            [-0.25, -0.95, 0.08],
            [-0.45, -1.28, 0.08],
            [-0.65, -0.76, 0.08]
        ),

        createProminence(
            [0.85, -0.50, -0.08],
            [1.18, -0.75, -0.08],
            [0.65, -0.76, -0.08]
        )
    ];

    // Configuração das animações
    const prominenceAnimations = prominences.map(() => ({
        time: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.003,
        maxScale: 0.8 + Math.random() * 0.5
    }));

    // ==================================================
    // ERUPÇÕES SOLARES
    // ==================================================

    function createEruption(origin) {
        const eruptionGeometry = new THREE.BufferGeometry();

        const particleCount = 100;

        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        let eruptionActive = false;
        let eruptionTimer = 0;

        const eruptionCooldown = 180;

        let particlesReturned = 0;

        const returnedParticles = new Array(particleCount).fill(false);

        const eruptionDirection = origin.clone().normalize();

        const tangent = new THREE.Vector3()
            .crossVectors(eruptionDirection, new THREE.Vector3(0, 1, 0))
            .normalize();

        const bitangent = new THREE.Vector3()
            .crossVectors(eruptionDirection, tangent)
            .normalize();

        // Lançamento
        function launchEruption() {
            particlesReturned = 0;
            returnedParticles.fill(false);

            for (let i = 0; i < particleCount; i++) {
                const index = i * 3;

                const spreadX = (Math.random() - 0.5) * 0.15;
                const spreadY = (Math.random() - 0.5) * 0.15;

                const direction = eruptionDirection.clone()
                    .addScaledVector(tangent, spreadX)
                    .addScaledVector(bitangent, spreadY)
                    .normalize();

                positions[index] = eruptionDirection.x;
                positions[index + 1] = eruptionDirection.y;
                positions[index + 2] = eruptionDirection.z;

                const speed = 0.1 + Math.random() * 0.3;

                velocities[index] = direction.x * speed;
                velocities[index + 1] = direction.y * speed;
                velocities[index + 2] = direction.z * speed;
            }

            eruptionGeometry.attributes.position.needsUpdate = true;
        }

        eruptionGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        // Animação
        function animateEruption() {
            const positionAttribute = eruptionGeometry.attributes.position;
            const position = positionAttribute.array;

            const gravity = 0.01;

            if (!eruptionActive) {
                eruptionTimer++;

                if (eruptionTimer >= eruptionCooldown) {
                    launchEruption();
                    eruptionActive = true;
                }

                return;
            }

            for (let i = 0; i < particleCount; i++) {
                const index = i * 3;

                const distance = Math.sqrt(
                    position[index] ** 2 +
                    position[index + 1] ** 2 +
                    position[index + 2] ** 2
                );

                const radialMotion =
                    position[index] * velocities[index] +
                    position[index + 1] * velocities[index + 1] +
                    position[index + 2] * velocities[index + 2];

                if (
                    distance <= 1.05 &&
                    radialMotion < 0 &&
                    !returnedParticles[i]
                ) {
                    returnedParticles[i] = true;
                    particlesReturned++;
                    continue;
                }

                if (returnedParticles[i]) continue;

                const directionToCenter = new THREE.Vector3(
                    -position[index],
                    -position[index + 1],
                    -position[index + 2]
                );

                if (directionToCenter.lengthSq() > 0.000001) {
                    directionToCenter.normalize();
                } else {
                    directionToCenter.set(0, 0, 0);
                }

                velocities[index] += directionToCenter.x * gravity;
                velocities[index + 1] += directionToCenter.y * gravity;
                velocities[index + 2] += directionToCenter.z * gravity;

                velocities[index] *= 0.995;
                velocities[index + 1] *= 0.995;
                velocities[index + 2] *= 0.995;

                positionAttribute.array[index] += velocities[index] * 0.1;
                positionAttribute.array[index + 1] += velocities[index + 1] * 0.1;
                positionAttribute.array[index + 2] += velocities[index + 2] * 0.1;
            }

            if (particlesReturned >= particleCount) {
                eruptionActive = false;
                eruptionTimer = 0;
            }

            positionAttribute.needsUpdate = true;
        }

        // Material e objeto
        const eruptionMaterial = new THREE.PointsMaterial({
            color: 0xffa500,
            size: 0.08,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const eruption = new THREE.Points(
            eruptionGeometry,
            eruptionMaterial
        );

        sunGroup.add(eruption);

        return {
            update: animateEruption
        };
    }

    // Lista de erupções
    const eruptions = [
        createEruption(new THREE.Vector3(1, 1, 1)),
        createEruption(new THREE.Vector3(-1, -1, 1)),
        createEruption(new THREE.Vector3(-1, 1, -1)),
        createEruption(new THREE.Vector3(1, -1, -1))
    ];

    // ==================================================
    // HALO SOLAR (GLOW)
    // ==================================================

    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 256;
    glowCanvas.height = 256;

    const ctxGlow = glowCanvas.getContext("2d");

    const gradient = ctxGlow.createRadialGradient(
        128, 128, 0,
        128, 128, 128
    );

    gradient.addColorStop(0, "rgba(255, 180, 60, 0.85)");
    gradient.addColorStop(0.2, "rgba(255, 120, 20, 0.65)");
    gradient.addColorStop(0.45, "rgba(255, 80, 0, 0.35)");
    gradient.addColorStop(0.7, "rgba(255, 50, 0, 0.12)");
    gradient.addColorStop(1, "rgba(255, 50, 0, 0)");

    ctxGlow.fillStyle = gradient;
    ctxGlow.fillRect(0, 0, 256, 256);

    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    const glowMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xffffff,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const glow = new THREE.Sprite(glowMaterial);

    glow.scale.set(4.5, 4.5, 1);

    sunGroup.add(glow);

    // ==================================================
    // ATUALIZAÇÃO DO SOL
    // ==================================================

    function update() {
        // Rotação solar
        sunGroup.rotation.y += 0.009;
        sunGroup.rotation.x += 0.006;

        // Animação das proeminências
        prominences.forEach((prominence, index) => {
            const animation = prominenceAnimations[index];

            animation.time += animation.speed;

            const cycle = (Math.sin(animation.time) + 1) / 2;

            prominence.scale.set(
                1,
                cycle * animation.maxScale,
                1
            );
        });

        // Animação das erupções
        eruptions.forEach(eruption => {
            eruption.update();
        });
    }

    return {
        group: sunGroup,
        update
    };
}