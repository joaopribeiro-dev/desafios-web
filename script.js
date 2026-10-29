const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext('2d');
const form = document.getElementById("acessForm");
const input = document.getElementById("commandInput");
const skipBtn = document.getElementById("skipAnimation");
const errorMessage = document.getElementById("errorMessage");

let focalLength = window.innerWidth * 0.8;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    focalLength = window.innerWidth * 0.8;
}
resizeCanvas();

let stars = [];
let nebulas = [];
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
    if (typeof createNebula === "function") createNebula();

    stars.forEach(star => {
        star.x = (Math.random() - 0.5) * canvas.width * 2;
        star.y = (Math.random() - 0.5) * canvas.height * 2;
    });
});

let blackHoleZ = 1;
let saturnZ = 1;
let jupiterZ = 1;
let marsZ = 1;
let moonZ = 1;
let earthZ = 1;
let venusZ = 1;
let mercuryZ = 1;
let sunZ = 1;
let isWarping = false;

function cosmos(frameScale) {
    time += 0.03 * frameScale;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    if (isWarping) {
        sunZ -= 0.015 * frameScale;

        if (speed >= 50) {
            mercuryZ -= 0.015 * frameScale;
        }
        if (speed >= 100) {
            venusZ -= 0.015 * frameScale;
        }
        if (speed >= 150) {
            earthZ -= 0.015 * frameScale;
            moonZ -= 0.015 * frameScale;
        }
        if (speed >= 200) {
            marsZ -= 0.015 * frameScale;
        }
        if (speed >= 250) {
            jupiterZ -= 0.015 * frameScale;
        }
        if (speed >= 300) {
            saturnZ -= 0.015 * frameScale;
        }
        if (speed >= 350) {
            blackHoleZ -= 0.015 * frameScale;
        }
    }

    let baseBhX = 0;
    let baseBhY = 0;
    
    let kBh = 1 / Math.max(0.01, blackHoleZ);
    let blackHoleX = centerX + baseBhX * kBh;
    let blackHoleY = centerY + baseBhY * kBh;
    let blackHoleRadius = 100 * kBh;

    if (speed >= 350 && blackHoleZ > 0.05) {
        const orbitalTime = time % (Math.PI * 2);

        ctx.save();
        ctx.translate(blackHoleX, blackHoleY);
        ctx.rotate(30 * Math.PI / -180);

        const numLinhas = 200;
        for (let i = 0; i < numLinhas; i++) {
            let r = (blackHoleRadius - (50 * kBh)) + (i * 0.75 * kBh) + Math.sin(orbitalTime * 2 + i) * 1.5;

            let orbitalSpeed = 1.2 / Math.max(1, r) / 40;

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
            ctx.lineWidth = Math.max(0.5, (1.8 + Math.sin(orbitalTime + i) * 0.4) * kBh);
            ctx.beginPath();
            ctx.ellipse(0, 0, Math.max(0, r * 2.5), Math.max(0, r * 0.34), 0, Math.PI, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();

        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(blackHoleX, blackHoleY, Math.max(0, blackHoleRadius), 0, Math.PI * 2);
        ctx.fill();

        let glowGrad = ctx.createRadialGradient(blackHoleX, blackHoleY, Math.max(0, blackHoleRadius), blackHoleX, blackHoleY, Math.max(0, blackHoleRadius + 30 * kBh));
        glowGrad.addColorStop(0, "rgba(0, 0, 0, 0.45)");
        glowGrad.addColorStop(0.3, "rgb(255, 255, 255)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(blackHoleX, blackHoleY, Math.max(0, blackHoleRadius + 30 * kBh), 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgb(206, 206, 206)";
        ctx.lineWidth = Math.max(1, (4 + Math.sin(orbitalTime * 5) * 0.4) * kBh);
        ctx.beginPath();
        ctx.arc(blackHoleX, blackHoleY, Math.max(0, blackHoleRadius + 1), 0, Math.PI * 2);
        ctx.stroke();

        ctx.save();
        ctx.translate(blackHoleX, blackHoleY);
        ctx.rotate(30 * Math.PI / -180);

        for (let i = 0; i < numLinhas; i++) {
            let r = (blackHoleRadius - (50 * kBh)) + (i * 0.75 * kBh) + Math.sin(orbitalTime * 2 + i) * 1.5;
            let orbitalSpeed = 1.2 / Math.max(1, r) / 40;

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
            ctx.lineWidth = Math.max(0.5, (1.8 + (Math.sin(orbitalTime + i) * 0.4)) * kBh);
            ctx.beginPath();
            ctx.ellipse(0, 0, Math.max(0, r * 2.5), Math.max(0, r * 0.34), 0, 0, Math.PI);
            ctx.stroke();
        }
        ctx.restore();
    }

    let baseSaturnX = (canvas.width * 0.4) - centerX;
    let baseSaturnY = (canvas.height * 0.7) - centerY;

    let saturnK = 1 / Math.max(0.01, saturnZ);
    let saturnX = centerX + baseSaturnX * saturnK;
    let saturnY = centerY + baseSaturnY * saturnK;
    let saturnRadius = 30 * saturnK;

    if (speed >= 300 && saturnZ > 0.05) {
        const orbitalTime = time % (Math.PI * 2);

        ctx.save();
        ctx.translate(saturnX, saturnY);
        ctx.rotate(30 * Math.PI / 180);

        const numLinhas = 150;

        for (let i = 0; i < numLinhas; i++) {
            let r = (saturnRadius * 1.25) + (i * 0.22 * saturnK) + Math.sin(orbitalTime * 2 + i) * 0.3;
            let orbitalSpeed = 1.2 / Math.max(1, r) / 40;

            let startAngle = (orbitalTime * orbitalSpeed) + (i * 0.25);
            let arcLength = 1.5 + Math.sin(orbitalTime + i) * 0.8;
            let endAngle = startAngle + arcLength;

            let alpha = (1 - (i / numLinhas)) * 0.45;
            let color = i < 30 ? `rgba(120, 96, 71, ${alpha * 0.8})`:
                        i < 60 ? `rgba(185, 154, 107, ${alpha * 0.9})`:
                        i < 90 ? `rgba(220, 196, 154, ${alpha * 0.85})`:
                        i < 120 ? `rgba(229, 213, 181, ${alpha * 0.7})`:
                        `rgba(102, 81, 59, ${alpha * 0.75})`

                        ctx.strokeStyle = color;
                        ctx.lineWidth = Math.max(0.5, (1.8 + (Math.sin(orbitalTime + 1) * 0.4)) * saturnK);
                        ctx.beginPath();
                        ctx.ellipse(0, 0, Math.max(0, r * 2.5), Math.max(0, r * 0.34), 0, Math.PI, Math.PI * 2);
                        ctx.stroke();
        }
        ctx.restore();
        
        let saturnGlow = ctx.createRadialGradient(saturnX - saturnRadius * 0.35, saturnY - saturnRadius * 0.35, 0, saturnX, saturnY, saturnRadius);
        saturnGlow.addColorStop(0, "#F8E8C5");
        saturnGlow.addColorStop(0.45, "#DCC49A");
        saturnGlow.addColorStop(0.8, "#B99A6B");
        saturnGlow.addColorStop(1, "#66513B");

        ctx.fillStyle = saturnGlow;
        ctx.beginPath();
        ctx.arc(saturnX, saturnY, saturnRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();

        ctx.translate(saturnX, saturnY);

        ctx.beginPath();
        ctx.arc(0, 0, saturnRadius, 0, Math.PI * 2);
        ctx.clip();

        const faixasAtmosfericas = [
            { y: -0.7, h: 0.12, color: "rgba(248, 232, 197, 0.35)" },
            { y: -0.5, h: 0.10, color: "rgba(229, 213, 181, 0.45)" },
            { y: -0.3, h: 0.15, color: "rgba(220, 196, 154, 0.55)" },
            { y: -0.1, h: 0.10, color: "rgba(201, 174, 132, 0.4)" },
            { y:  0.1, h: 0.13, color: "rgba(185, 154, 107, 0.5)" },
            { y:  0.3, h: 0.12, color: "rgba(165, 137, 103, 0.35)" },
            { y:  0.5, h: 0.10, color: "rgba(139, 117, 87, 0.45)" },
            { y:  0.7, h: 0.12, color: "rgba(102, 81, 59, 0.3)" }
        ];

        for (const faixa of faixasAtmosfericas) {
            const y = faixa.y * saturnRadius;
            const h = faixa.h * saturnRadius;

            ctx.fillStyle = faixa.color;
            ctx.globalAlpha = 0.75;

            ctx.beginPath();
            ctx.moveTo(-saturnRadius, y);

            ctx.bezierCurveTo(-saturnRadius * 0.4, y - h * 0.6, saturnRadius * 0.3, y + h * 0.6, saturnRadius, y);
            
            ctx.lineTo(saturnRadius, y + h);
            
            ctx.bezierCurveTo(saturnRadius * 0.3, y + h * 1.4, -saturnRadius * 0.4, y + h * 0.4, -saturnRadius, y + h);

            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();

        ctx.globalAlpha = 1;

        ctx.save();
        ctx.translate(saturnX, saturnY);
        ctx.rotate(30 * Math.PI / 180);

        for (let i = 0; i < numLinhas; i++) {
            let r = (saturnRadius * 1.25) + (i * 0.22 * saturnK) + Math.sin(orbitalTime * 2 + i) * 0.3;
            let orbitalSpeed = 1.2 / Math.max(1, r) / 40;

            let startAngle = (orbitalTime * orbitalSpeed) + (i * 0.25);
            let arcLength = 1.5 + Math.sin(orbitalTime + i) * 0.8;
            let endAngle = startAngle + arcLength;

            let alpha = (1 - (i / numLinhas)) * 0.45;
            let color = i < 30 ? `rgba(120, 96, 71, ${alpha * 0.8})`:
                        i < 60 ? `rgba(185, 154, 107, ${alpha * 0.9})`:
                        i < 90 ? `rgba(220, 196, 154, ${alpha * 0.85})`:
                        i < 120 ? `rgba(229, 213, 181, ${alpha * 0.7})`:
                        `rgba(102, 81, 59, ${alpha * 0.75})`

                        ctx.strokeStyle = color;
                        ctx.lineWidth = Math.max(0.5, (1.8 + (Math.sin(orbitalTime + 1) * 0.4)) * saturnK);
                        ctx.beginPath();
                        ctx.ellipse(0, 0, Math.max(0, r * 2.5), Math.max(0, r * 0.34), 0, 0, Math.PI);
                        ctx.stroke();
        }
        ctx.restore();
    }

    let baseJupiterX = (canvas.width * 0.65) - centerX;
    let baseJupiterY = (canvas.height * 0.65) - centerY;

    let jupiterK = 1 / Math.max(0.01, jupiterZ);
    let jupiterX = centerX + baseJupiterX * jupiterK;
    let jupiterY = centerY + baseJupiterY * jupiterK;
    let jupiterRadius = 35 * jupiterK;
 
    if (speed >= 250 && jupiterZ > 0.05) {
        const orbitalTime = time % (Math.PI * 2);

        ctx.save();
        ctx.translate(jupiterX, jupiterY);
        ctx.rotate(30 * Math.PI / -270);

        const numLinhas = 3;
        for (let i = 0; i < numLinhas; i++) {
            let r = (jupiterRadius * 1.3) + (i * 0.75 * jupiterK) + Math.sin(orbitalTime * 2 + i) * 1.5;
            let orbitalSpeed = 1.2 / Math.max(1, r) / 40;

            let startAngle = (orbitalTime * orbitalSpeed) + (i * 0.25);
            let arcLength = 1.5 + Math.sin(orbitalTime + i) * 0.8;
            let endAngle = startAngle + arcLength;

            let alpha = (1 - (i / numLinhas)) * 0.45;
            let color = i < 1 ? `rgba(200, 182, 154, ${alpha * 0.15})`:
                        i < 2 ? `rgba(181, 161, 132, ${alpha * 0.3})`:
                        `rgba(140, 129, 116, ${alpha * 0.12})`
                        
                        ctx.strokeStyle = color;
                        ctx.lineWidth = Math.max(0.5, (1.8 + (Math.sin(orbitalTime + 1) * 0.4)) * jupiterK);
                        ctx.beginPath();
                        ctx.ellipse(0, 0, Math.max(0, r * 2.5), Math.max(0, r * 0.34), 0, Math.PI, Math.PI * 2);
                        ctx.stroke();
        }
        ctx.restore();

        let jupiterGlow = ctx.createRadialGradient(jupiterX - jupiterRadius * 0.35, jupiterY - jupiterRadius * 0.35, 0, jupiterX, jupiterY, jupiterRadius);
        jupiterGlow.addColorStop(0, "#F5E4C5");
        jupiterGlow.addColorStop(0.45, "#D8B58A");
        jupiterGlow.addColorStop(0.8, "#A97850");
        jupiterGlow.addColorStop(1, "#493329");

        ctx.fillStyle = jupiterGlow;
        ctx.beginPath();
        ctx.arc(jupiterX, jupiterY, jupiterRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();

        ctx.translate(jupiterX, jupiterY);

        ctx.beginPath();
        ctx.arc(0, 0, jupiterRadius, 0, Math.PI * 2);
        ctx.clip();

        const faixasAtmosfericas = [
            {y: -0.72, h: 0.12, color: "#B77D55"},
            {y: -0.53, h: 0.10, color: "#F0D5AC"},
            {y: -0.32, h: 0.16, color: "#A96943"},
            {y: -0.08, h: 0.12, color: "#E8C69A"},
            {y: 0.13, h: 0.17, color: "#B87951"},
            {y: 0.38, h: 0.12, color: "#E9D0A9"},
            {y: 0.59, h: 0.13, color: "#A96F4B"},
            {y: 0.79, h: 0.10, color: "#D8B58A"}
        ];

        for (const faixa of faixasAtmosfericas) {
            const y = faixa.y * jupiterRadius;
            const h = faixa.h * jupiterRadius;

            ctx.fillStyle = faixa.color;
            ctx.globalAlpha = 0.72;
            
            ctx.beginPath();
            ctx.moveTo(-jupiterRadius, y);

            ctx.bezierCurveTo(-jupiterRadius * 0.4, y - h * 0.6, jupiterRadius * 0.3, y + h * 0.6, jupiterRadius, y);

            ctx.lineTo(jupiterRadius, y + h);

            ctx.bezierCurveTo(jupiterRadius * 0.3, y + h * 1.4, -jupiterRadius * 0.4, y + h * 0.4, -jupiterRadius, y + h);

            ctx.closePath();
            ctx.fill();
        }

        ctx.globalAlpha = 1;

        ctx.save();

        ctx.translate(jupiterRadius * 0.3, jupiterRadius * 0.28);
        ctx.rotate(-0.12);

        ctx.fillStyle = "#B85E43";
        ctx.beginPath();
        ctx.ellipse(0, 0, jupiterRadius * 0.25, jupiterRadius * 0.13, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = "rgba(112, 52, 39, 0.55)";
        ctx.lineWidth = Math.max(0.5, jupiterRadius * 0.025);
        ctx.beginPath();
        ctx.ellipse(0, 0, jupiterRadius * 0.17, jupiterRadius * 0.07, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();

        ctx.strokeStyle = "rgba(255, 236, 200, 0.4)";
        ctx.lineWidth = Math.max(0.5, jupiterRadius * 0.025);
        ctx.beginPath();
        ctx.arc(jupiterX, jupiterY, jupiterRadius * 0.98, Math.PI * 1.05, Math.PI * 1.65);
        ctx.stroke();

        ctx.restore();

        ctx.save();
        ctx.translate(jupiterX, jupiterY);
        ctx.rotate(30 * Math.PI / -270);

        for (let i = 0; i < numLinhas; i++) {
            let r = (jupiterRadius * 1.3) + (i * 0.75 * jupiterK) + Math.sin(orbitalTime * 2 + i) * 1.5;
            let orbitalSpeed = 1.2 / Math.max(1, r) / 40;

            let startAngle = (orbitalTime * orbitalSpeed) + (i * 0.25);
            let arcLength = 1.5 + Math.sin(orbitalTime + i) * 0.8;
            let endAngle = startAngle + arcLength;

            let alpha = (1 - (i / numLinhas)) * 0.45;
            let color = i < 1 ? `rgba(200, 182, 154, ${alpha * 0.15})`:
                        i < 2 ? `rgba(181, 161, 132, ${alpha * 0.3})`:
                        `rgba(140, 129, 116, ${alpha * 0.12})`
                        
                        ctx.strokeStyle = color;
                        ctx.lineWidth = Math.max(0.5, (1.8 + (Math.sin(orbitalTime + 1) * 0.4)) * jupiterK);
                        ctx.beginPath();
                        ctx.ellipse(0, 0, Math.max(0, r * 2.5), Math.max(0, r * 0.34), 0, 0, Math.PI);
                        ctx.stroke();
        }
        ctx.restore();
    }

    let baseMarsX = (canvas.width * 0.64) - centerX;
    let baseMarsY = (canvas.height * 0.55) - centerY;

    let marsK = 1 / Math.max(0.01, marsZ);
    let marsX = centerX + baseMarsX * marsK;
    let marsY = centerY + baseMarsY * marsK;
    let marsRadius = 23 * marsK;

    if (speed >= 200 && marsZ > 0.05) {
        let marsGlow = ctx.createRadialGradient(marsX - marsRadius * 0.35, marsY - marsRadius * 0.35, 0, marsX, marsY, marsRadius);
        marsGlow.addColorStop(0, "#F4A261");
        marsGlow.addColorStop(0.45, "#D96C3B");
        marsGlow.addColorStop(0.75, "#B84A32");
        marsGlow.addColorStop(1, "#49251F");

        ctx.fillStyle = marsGlow;
        ctx.lineWidth = Math.max(0.5, marsRadius * 0.08);

        ctx.beginPath();
        ctx.arc(marsX, marsY, marsRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.arc(marsX, marsY, marsRadius, 0, Math.PI * 2);
        ctx.clip();

        crateraMars.forEach(cratera => {
            let crateraX = marsX + cratera.x * marsRadius; 
            let crateraY = marsY + cratera.y * marsRadius;
            let crateraRadius = cratera.radius * marsRadius;
            
            ctx.fillStyle = `rgba(114, 81, 48, ${cratera.alpha})`;
            ctx.beginPath();
            ctx.arc(crateraX, crateraY, crateraRadius, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();

        ctx.save();
        
        ctx.beginPath();
        ctx.arc(marsX, marsY, marsRadius, 0, Math.PI * 2);
        ctx.clip();
        
        terrenoMars.forEach(terreno => {
            let terrenoX = marsX + terreno.x * marsRadius;
            let terrenoY = marsY + terreno.y * marsRadius;
            let terrenoWidth = terreno.width * marsRadius;
            let terrenoHeight = terreno.height * marsRadius;
            
            ctx.save();
            ctx.translate(terrenoX, terrenoY);
            ctx.rotate(terreno.rotation);
            
            ctx.beginPath();
            ctx.moveTo(-terrenoWidth * 0.5, 0);
            
            ctx.bezierCurveTo(-terrenoWidth * 0.4, -terrenoHeight, terrenoWidth * 0.2, -terrenoHeight, terrenoWidth * 0.5, -terrenoHeight * 0.2)
            
            ctx.bezierCurveTo(terrenoWidth * 0.7, terrenoHeight * 0.3, terrenoWidth * 0.1, terrenoHeight, -terrenoWidth * 0.5, 0);

            ctx.closePath();
            
            ctx.fillStyle = `rgba(41, 7, 4, ${terreno.alpha})`;
            ctx.fill();
            
            ctx.restore();
        });

        ctx.restore();
        
        createPolos(marsX, marsY, marsRadius, "#E8D2B0");
    }

    let baseMoonX = (canvas.width * 0.37) - centerX;
    let baseMoonY = (canvas.height * 0.34) - centerY;

    let moonK = 1 / Math.max(0.01, moonZ);
    let moonX = centerX + baseMoonX * moonK;
    let moonY = centerY + baseMoonY * moonK;
    let moonRadius = 15 * moonK;

    if (speed >= 150 && moonZ > 0.05) {
        let moonGlow = ctx.createRadialGradient(moonX - moonRadius * 0.3, moonY - moonRadius * 0.3, 0, moonX, moonY, moonRadius);
        moonGlow.addColorStop(0, "#D6D6D6");
        moonGlow.addColorStop(0.5, "#a0a4ac");
        moonGlow.addColorStop(1, "#5b5c5f");

        ctx.fillStyle = moonGlow;
        ctx.lineWidth = Math.max(0.5, moonRadius * 0.08);

        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.clip();

        craterasMoon.forEach(cratera => {
            let crateraX = moonX + cratera.x * moonRadius;
            let crateraY = moonY + cratera.y * moonRadius;
            let crateraRadius = cratera.radius * moonRadius;

            ctx.fillStyle = `rgba(50, 49, 47, ${cratera.alpha})`;
            ctx.beginPath();
            ctx.arc(crateraX, crateraY, crateraRadius, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }

    let baseEarthX = (canvas.width * 0.4) - centerX;
    let baseEarthY = (canvas.height * 0.4) - centerY;

    let earthK = 1 / Math.max(0.01, earthZ);
    let earthX = centerX + baseEarthX * earthK;
    let earthY = centerY + baseEarthY * earthK;
    let earthRadius = 25 * earthK;

    if (speed >= 150 && earthZ > 0.05) {
        let earthGlow = ctx.createRadialGradient(earthX - earthRadius * 0.3, earthY - earthRadius * 0.3, 0, earthX, earthY, earthRadius);
        earthGlow.addColorStop(0, "#061B49");
        earthGlow.addColorStop(0.5, "#1479D1");
        earthGlow.addColorStop(1, "#36B8F2");

        ctx.fillStyle = earthGlow;
        ctx.strokeStyle = "#1479D1";
        ctx.lineWidth = Math.max(0.5, earthRadius * 0.05);

        ctx.beginPath();
        ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
        ctx.clip();

        terrenoEarth.forEach(terreno => {
            const terrenoX = earthX + terreno.x * earthRadius;
            const terrenoY = earthY + terreno.y * earthRadius;
            const terrenoWidth = terreno.width * earthRadius;
            const terrenoHeight = terreno.height * earthRadius;

            ctx.save();
            ctx.translate(terrenoX, terrenoY);
            ctx.rotate(terreno.rotation);

            ctx.beginPath();
            ctx.moveTo(-terrenoWidth * 0.5, 0);

            ctx.bezierCurveTo(-terrenoWidth * 0.4, -terrenoHeight, terrenoWidth * 0.2, -terrenoHeight, terrenoWidth * 0.5, -terrenoHeight * 0.2)

            ctx.bezierCurveTo(terrenoWidth * 0.7, terrenoHeight * 0.3, terrenoWidth * 0.1, terrenoHeight, -terrenoWidth * 0.5, 0);

            ctx.closePath();

            ctx.fillStyle = `rgba(36, 116, 67, ${0.7 + terreno.alpha})`;
            ctx.fill();

            ctx.restore();
        })

        createPolos(earthX, earthY, earthRadius, "#EAF7FF");

        cloudsEarth.forEach(cloud => {
            let cloudX = earthX + cloud.x * earthRadius;
            let cloudY = earthY + cloud.y * earthRadius;
            let cloudWidth = cloud.width * earthRadius;
            let cloudHeight = cloud.height * earthRadius;

            ctx.save();
            ctx.translate(cloudX, cloudY);
            ctx.rotate(cloud.rotation);
            
            ctx.beginPath();
            ctx.moveTo(-cloudWidth, 0);

            ctx.bezierCurveTo(-cloudWidth * 0.5, -cloudHeight, cloudWidth * 0.5, -cloudHeight, cloudWidth, 0);

            ctx.bezierCurveTo(cloudWidth * 0.5, cloudHeight * 0.5, -cloudWidth * 0.5, cloudHeight * 0.5, -cloudWidth, 0);

            ctx.closePath();

            ctx.fillStyle = `rgba(234, 246, 255, ${cloud.alpha + 0.2})`;
            ctx.fill();

            ctx.restore();
        })

        ctx.restore();
    }
    
    let baseVenusX = (canvas.width * 0.55) - centerX;
    let baseVenusY = (canvas.height * 0.4) - centerY;

    let venusK = 1 / Math.max(0.01, venusZ);
    let venusX = centerX + baseVenusX * venusK;
    let venusY = centerY + baseVenusY * venusK;
    let venusRadius = 20 * venusK;

    if (speed >= 100 && venusZ > 0.05) {
        let venusGlow = ctx.createRadialGradient(venusX - venusRadius * 0.3, venusY - venusRadius * 0.3, 0, venusX, venusY, venusRadius);
        venusGlow.addColorStop(0, "#FFF1B8");
        venusGlow.addColorStop(0.5, "#E8C477");
        venusGlow.addColorStop(1, "#B8793E");

        ctx.fillStyle = venusGlow;
        ctx.strokeStyle = "#B8793E";
        ctx.lineWidth = Math.max(0.5, venusRadius * 0.05);

        ctx.beginPath();
        ctx.arc(venusX, venusY, venusRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.beginPath();
        ctx.arc(venusX, venusY, venusRadius, 0, Math.PI * 2);
        ctx.clip();

        cloudsVenus.forEach(cloud => {
            let cloudX = venusX + cloud.x * venusRadius;
            let cloudY = venusY + cloud.y * venusRadius;
            let cloudWidth = cloud.width * venusRadius;
            let cloudHeight = cloud.height * venusRadius;

            ctx.save();
            ctx.translate(cloudX, cloudY);
            ctx.rotate(cloud.rotation);

            ctx.beginPath();
            ctx.moveTo(-cloudWidth, 0);
            ctx.bezierCurveTo(-cloudWidth * 0.5, cloudHeight, cloudWidth * 0.5, cloudHeight, cloudWidth, 0);

            ctx.strokeStyle = `rgba(255, 241, 184, ${cloud.alpha})`;
            ctx.lineWidth = Math.max(1, venusRadius * 0.08);
            ctx.lineCap = "round";
            ctx.stroke();

            ctx.restore();
        });

        ctx.restore();
    }

    let baseMercuryX = (canvas.width * 0.4) - centerX;
    let baseMercuryY = (canvas.height * 0.6) - centerY;

    let mercuryK = 1 / Math.max(0.01, mercuryZ);
    let mercuryX = centerX + baseMercuryX * mercuryK;
    let mercuryY = centerY + baseMercuryY * mercuryK;
    let mercuryRadius = 15 * mercuryK;

    if (speed >= 50 && mercuryZ > 0.05) {
        let mercuryGlow = ctx.createRadialGradient(mercuryX - mercuryRadius * 0.3, mercuryY - mercuryRadius * 0.3, 0, mercuryX, mercuryY, mercuryRadius);
        mercuryGlow.addColorStop(0, "#B5B0A8");
        mercuryGlow.addColorStop(0.5, "#8C8985");
        mercuryGlow.addColorStop(1, "#555451");
    
        ctx.fillStyle = mercuryGlow;
        ctx.strokeStyle = "#555451";
        ctx.lineWidth = Math.max(0.5, mercuryRadius * 0.08);

        ctx.beginPath();
        ctx.arc(mercuryX, mercuryY, Math.max(0, mercuryRadius), 0, Math.PI * 2)
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.beginPath();
        ctx.arc(mercuryX, mercuryY, mercuryRadius, 0, Math.PI * 2);
        ctx.clip();

        craterasMercury.forEach(cratera => {
            let crateraX = mercuryX + cratera.x * mercuryRadius;
            let crateraY = mercuryY + cratera.y * mercuryRadius;
            let crateraRadius = cratera.radius * mercuryRadius;

            ctx.fillStyle = `rgba(50, 49, 47, ${cratera.alpha})`;
            ctx.beginPath();
            ctx.arc(crateraX, crateraY, crateraRadius, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }

    let baseSunX = 0;
    let baseSunY = (canvas.height * 0.75) - centerY;

    let sunK = 1 / Math.max(0.01, sunZ);
    let sunX = centerX + baseSunX * sunK;
    let sunY = centerY + baseSunY * sunK;
    let sunRadius = 80 * sunK;

    if (sunZ > 0.05) {
        let sunGlow = ctx.createRadialGradient(sunX, sunY, Math.max(0, sunRadius * 0.5), sunX, sunY, Math.max(0, sunRadius * 2));
        sunGlow.addColorStop(0, "rgba(255, 200, 50, 1)");
        sunGlow.addColorStop(0.5, "rgba(255, 100, 0, 0.4)");
        sunGlow.addColorStop(1, "rgba(255, 50, 0, 0)");
    
        ctx.fillStyle = sunGlow;
        ctx.beginPath();
        ctx.arc(sunX, sunY, Math.max(0, sunRadius * 2), 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 180, 30, 0.7)";
        ctx.lineWidth = Math.max(1, 3 * sunK);
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
    }

    ctx.fillStyle = "#ffcc00";
    ctx.beginPath();
    ctx.arc(sunX, sunY, Math.max(0, sunRadius), 0, Math.PI * 2);
    ctx.fill();
}

function createPolos(x, y, radius, cor) {
    ctx.fillStyle = cor;

    ctx.beginPath();
    ctx.ellipse(x, y - radius * 0.8, radius * 0.35, radius * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(x, y + radius * 0.8, radius * 0.35, radius * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
}

function createTerreno() {
    let terreno = [];

    for (let i = 0; i < 7; i++) {
        terreno.push({
            x: Math.random() * 1.2 - 0.6,
            y: Math.random() * 1.3 - 0.8,
            width: Math.random() * 0.5 + 0.3,
            height: Math.random() * 0.20 + 0.1,
            alpha: Math.random() * 0.2 + 0.1,
            rotation: Math.random() * Math.PI
        });
    }
    return terreno;
}
const terrenoEarth = createTerreno();
const terrenoMars = createTerreno();

function createClouds() {
    let clouds = [];

    for (let i = 0; i < 25; i++) {
        clouds.push({
            x: Math.random() * 1.2 - 0.6,
            y: Math.random() * 1.4 - 0.7,
            width: Math.random() * 0.5 + 0.3,
            height: Math.random() * 0.25 + 0.1,
            alpha: Math.random() * 0.2 + 0.1,
            rotation: Math.random() * Math.PI
        });
    }
    return clouds;
}
const cloudsVenus = createClouds();
const cloudsEarth = createClouds();

function createCrateras() {
    let crateras = [];

    for (let i = 0; i < 25; i++) {
        crateras.push({
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            radius: Math.random() * 0.08 + 0.02,
            alpha: Math.random() * 0.2 + 0.1
        });
    }
    return crateras;
}
const craterasMercury = createCrateras();
const craterasMoon = createCrateras();
const crateraMars = createCrateras().slice(0, 15);

let lastTime = 0;
const referenceFPS = 60;

function animate(timestamp) {
    const deltaTime = lastTime === 0
        ? 1 / referenceFPS
        : Math.min((timestamp - lastTime) / 1000, 0.05);

    lastTime = timestamp;

    const frameScale = deltaTime * referenceFPS;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "screen";

    nebulas.forEach(nebula => {
        nebula.x += nebula.vx * frameScale;
        nebula.y += nebula.vy * frameScale;

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

    cosmos(frameScale);

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

stars.forEach(star => {
    const previousX = star.x;
    const previousY = star.y;
    const previousZ = star.z;

    let wasReset = false;

    star.z -= speed * frameScale;

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
        const multiplier = Math.min((speed / 30) * 2, 8);

        ctx.lineWidth = Math.min(
            Math.max(
                0.5,
                star.radius *
                (1 - star.z / canvas.width) *
                multiplier
            ),
            3
        );

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

requestAnimationFrame(animate);

form.addEventListener('submit', (event)=> {
    event.preventDefault();

    const typedValue = input.value.trim().toLowerCase();

    if (typedValue === "hello world" || typedValue === "hello world!") {
        errorMessage.style.color = "#00f2fe";
        errorMessage.textContent = "ACESSO CONCEDIDO! Entrando...";

        document.querySelector(".central").style.transition = "opacity 0.5s";
        document.querySelector(".central").style.opacity = "0";

        isWarping = true;

        const velocidade = setInterval(() => {
            speed += 2;

            if (speed >= 400) {
                fadeOpacity = (speed - 400) / 30;
            }

            if (speed >= 450) {
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
skipBtn.addEventListener('click', ()=> {
    window.location.href = "home.html";
})