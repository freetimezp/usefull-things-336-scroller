const track = document.querySelector(".slider-track");
const items = document.querySelectorAll(".slider-item");

track.innerHTML += track.innerHTML;

let currentX = 0;
let speed = 0.5;
let totalWidth = 0;

function calculateWidth() {
    totalWidth = 0;
    document.querySelectorAll(".slider-item").forEach((item) => {
        totalWidth += item.offsetWidth + 60;
    });
}

calculateWidth();

function animate() {
    currentX -= speed;

    if (Math.abs(currentX) >= totalWidth / 2) {
        currentX = 0;
    }

    gsap.set(track, { x: currentX });

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

        const scale = 1 - (distance / maxDistance) * 0.4;
        const rotateY = (center - itemCenter) / 40;

        gsap.to(item, {
            scale: scale,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out",
        });
    });
}

animate();
