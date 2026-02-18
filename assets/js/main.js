const track = document.querySelector(".slider-track");
track.innerHTML += track.innerHTML;

let current = 0;
let target = 0;
let speed = 4.3;
let ease = 0.05;
let totalWidth = 0;

function calculateWidth() {
    totalWidth = 0;
    document.querySelectorAll(".slider-item").forEach((item) => {
        totalWidth += item.offsetWidth + 100;
    });
}

calculateWidth();

function animate() {
    target -= speed;

    if (Math.abs(target) >= totalWidth / 2) {
        target = 0;
        current = 0;
    }

    current += (target - current) * ease;

    gsap.set(track, { x: current });

    updateDepth();

    requestAnimationFrame(animate);
}

function updateDepth() {
    const center = window.innerWidth / 2;

    document.querySelectorAll(".slider-item").forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(center - itemCenter);
        const maxDistance = window.innerWidth / 2;

        const progress = distance / maxDistance;

        const scale = 1 - progress * 0.35;
        const rotateY = (center - itemCenter) / 30;
        const opacity = 1 - progress * 0.6;
        const blur = progress * 8;
        const floatY = Math.sin(Date.now() * 0.001 + itemCenter) * 8;

        gsap.to(item, {
            scale,
            rotateY,
            opacity,
            y: floatY,
            filter: `blur(${blur}px)`,
            duration: 1.6,
            ease: "power3.out",
        });

        item.style.setProperty("--glow", 1 - progress * 2);
    });
}

animate();
