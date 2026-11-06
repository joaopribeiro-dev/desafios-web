import * as THREE from 'three';

export function createEarth(scene) {
    // ==================================================
    // CONFIGURAÇÃO DA TERRA earth
    // ==================================================

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    earthGroup.rotation.z = THREE.MathUtils.degToRad(23.44);

    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // ==================================================
    // TEXTURA DA TERRA
    // ==================================================

    const earthCanvas = document.createElement("canvas");
    earthCanvas.width = 1024;
    earthCanvas.height = 512;

    const ctxEarth = earthCanvas.getContext("2d");

    ctxEarth.fillStyle = "#0000ff";
    ctxEarth.fillRect(0, 0, 1024, 512);

    // ==================================================
    // CONTINENTES DA TERRA
    // ==================================================

    // CONVERSÃO DE COORDENADAS GEOGRÁFICAS

    function geoToCanvas(longitude, latitude) {
        const x = ((longitude + 180) / 360) * earthCanvas.width;
        const y = ((90 - latitude) / 180) * earthCanvas.height;

        return {x, y};
    };

    function drawPolygon(rings, ctx) {
        ctx.beginPath();

        rings.forEach((ring) => {
            ring.forEach((coordinate, index) => {
                const [longitude, latitude] = coordinate;

                const point = geoToCanvas(longitude, latitude);

                if (index === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });

            ctx.closePath();
        });

        ctx.fill();
    }
    
    function drawGeometry(geometry, ctx) {
        if (geometry.type === "Polygon") {
            drawPolygon(geometry.coordinates, ctx);
        } else if (geometry.type === "MultiPolygon") {
            geometry.coordinates.forEach((polygon) => {
                drawPolygon(polygon, ctx);
            });
        }
    }

    // CARREGAMENTO DOS DADOS GEOGRÁFICOS

    async function loadGeographicData() {

        try {
            const response = await fetch(
                './data/ne_110m_admin_0_countries.geojson'
            );

            if (!response.ok) {
                throw new Error('Não foi possível carregar o GeoJSON.');
            }

            const data = await response.json();

            ctxEarth.fillStyle = "#31966b";

            // AMÉRICA DO NORTE
            const northAmerica = data.features.filter(
                feature => feature.properties.CONTINENT === "North America"
            );

            northAmerica.forEach((feature) => {
                drawGeometry(feature.geometry, ctxEarth);
            });

            // AMÉRICA DO SUL
            const southAmerica = data.features.filter(
                feature => feature.properties.CONTINENT === "South America"
            );

            southAmerica.forEach((feature) => {
                drawGeometry(feature.geometry, ctxEarth);
            });

            // EUROPA
            const europe = data.features.filter(
                feature => feature.properties.CONTINENT === "Europe"
            );

            europe.forEach((feature) => {
                drawGeometry(feature.geometry, ctxEarth);
            });

            // ÁFRICA
            const africa = data.features.filter(
                feature => feature.properties.CONTINENT === "Africa"
            );

            africa.forEach((feature) => {
                drawGeometry(feature.geometry, ctxEarth);
            });

            // ÁSIA
            const asia = data.features.filter(
                feature => feature.properties.CONTINENT === "Asia"
            );

            asia.forEach((feature) => {
                drawGeometry(feature.geometry, ctxEarth);
            });

            // OCEANIA
            const oceania = data.features.filter(
                feature => feature.properties.CONTINENT === "Oceania"
            );

            oceania.forEach((feature) => {
                drawGeometry(feature.geometry, ctxEarth);
            });

            // ANTÁRTIDA
            const antarctica = data.features.filter(
                feature => feature.properties.CONTINENT === "Antarctica"
            );

            antarctica.forEach((feature) => {
                drawGeometry(feature.geometry, ctxEarth);
            });

            earthTexture.needsUpdate = true;

            console.log("GeoJSON carregado!");
            console.log("Total de países:", data.features.length);
            console.log("Territórios da América do Norte:", northAmerica.length);

            console.log(northAmerica);

            console.log(
                "Tipos de geometria:",
                northAmerica.map(feature => ({
                    name: feature.properties.NAME,
                    type: feature.geometry.type
                }))
            );

        } catch (error) {
            console.error("Erro ao carregar dados geográficos:", error);
        }
    }

    loadGeographicData();

    // ==================================================
    // MATERIAL TERRA
    // ==================================================

    const earthTexture = new THREE.CanvasTexture(earthCanvas);

    earthTexture.needsUpdate = true;

    const material = new THREE.MeshStandardMaterial({
        map: earthTexture,
        roughness: 0.8,
        metalness: 0
    })

    const sphere = new THREE.Mesh(geometry, material);
    earthGroup.add(sphere);

    // ==================================================
    // NUVENS
    // ==================================================

    // TEXTURA DAS NUVENS
    const cloudsCanvas = document.createElement("canvas");
    cloudsCanvas.width = 1024;
    cloudsCanvas.height = 512;

    const ctxClouds = cloudsCanvas.getContext("2d");

    // TEXTURA
    const cloudsTexture = new THREE.CanvasTexture(cloudsCanvas);

    function drawCloud(x, y, radius) {
        const gradient = ctxClouds.createRadialGradient(x, y, radius * 0.15, x, y, radius);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.85)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctxClouds.fillStyle = gradient;
        ctxClouds.beginPath();
        ctxClouds.arc(x, y, radius, 0, Math.PI * 2);
        ctxClouds.fill();
    }

    function drawCloudWrapped(x, y, radius) {
        const width = cloudsCanvas.width;

        drawCloud(x, y, radius);

        if (x < radius) {
            drawCloud(x + width, y, radius);
        }

        if (x + radius > width) {
            drawCloud(x - width, y, radius);
        }
    }

    const formationCount = 50;

    for (let i = 0; i < formationCount; i++) {
        const centerX = Math.random() * cloudsCanvas.width;
        const centerY = Math.random() * cloudsCanvas.height;

        const cloudCount = Math.floor(Math.random() * 8) + 8;

        for (let j = 0; j < cloudCount; j++) {
            const x = centerX + (Math.random() - 0.5) * 130;
            const y = centerY + (Math.random() - 0.5) * 70;
            const radius = Math.random() * 18 + 12;

            drawCloudWrapped(x, y, radius);
        }
    }

    cloudsTexture.needsUpdate = true;

    // GEOMETRIA DAS NUVENS
    const cloudsGeometry = new THREE.SphereGeometry(1.05, 64, 64);

    // MATERIAL DAS NUVENS
    const cloudsMaterial = new THREE.MeshStandardMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.8,
        roughness: 1,
        metalness: 0
    });

    // OBJETOS DAS NUVENS
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);

    earthGroup.add(clouds);

    // ==================================================
    // CONFIGURAÇÃO DA ATMOSFERA
    // ==================================================

    // GEOMETRIA DA ATMOSFERA
    const atmosphericGeometry = new THREE.SphereGeometry(1.1, 64, 64);

    // MATERIAL DA ATMOSFERA
    const atmosphericMaterial = new THREE.MeshBasicMaterial({
        color: 0x4da6ff,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide
    })

    const atmosphere = new THREE.Mesh(atmosphericGeometry, atmosphericMaterial);
    earthGroup.add(atmosphere);

    // ==================================================
    // ATUALIZAÇÃO DA TERRA
    // ==================================================

    function update() {
        earthGroup.rotation.y += 0.005;
    }
    
    return {
        group: earthGroup,
        update
    };
}