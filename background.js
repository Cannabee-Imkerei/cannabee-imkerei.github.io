const animationPath = "/animations/";

function initChildren(content_container) {
    Array.from(content_container.children).forEach(child => {
        if (!child.classList.contains("ignore-z")) {
            if (getComputedStyle(child).position === 'static') {
                child.style.position = 'relative';
            }
            child.style.zIndex = '1';
        }
    });
}

function createHive() {
    // Create Hive Anim
    const lottiePlayer = document.createElement("lottie-player");
    lottiePlayer.src = animationPath + "Hive.json";
    lottiePlayer.setAttribute("background", "transparent");
    lottiePlayer.setAttribute("speed", "1");
    lottiePlayer.setAttribute("loop", "");
    lottiePlayer.setAttribute("autoplay", "");

    lottiePlayer.style.width = "200px";
    lottiePlayer.style.height = "200px";
    lottiePlayer.style.position = "absolute";
    lottiePlayer.style.top = "53%";
    lottiePlayer.style.left = "47%";
    lottiePlayer.style.transform = "translateX(-50%) scale(1)";
    lottiePlayer.style.zIndex = "0";
    lottiePlayer.classList.add("ignore-z");

    return lottiePlayer;
}

document.addEventListener("DOMContentLoaded", () => {
    const content_container = document.getElementById("content-container");
    if (!content_container) return;

    // Init Children (deine bestehende Funktion)
    initChildren(content_container);

    // Canvas erstellen und einfügen
    const canvas = document.createElement("canvas");
    canvas.id = "background-canvas";
    canvas.className = "w-100 h-100 position-absolute top-0 start-0";
    canvas.style.zIndex = "0"; // hinter allem
    content_container.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // Responsive Größe
    function resizeCanvas() {
        canvas.width = content_container.clientWidth;
        canvas.height = content_container.clientHeight;
        drawGrid();
        positionHive();
    }

    // 200x200 Grid zeichnen
    function drawGrid() {
        const cellSize = 100;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.strokeStyle = "#ccc";

        for (let x = 0; x <= canvas.width; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (let y = 0; y <= canvas.height; y += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    // Hive erzeugen und einfügen
    const hive = createHive();
    hive.style.position = "absolute";
    hive.style.zIndex = "1"; // über dem Canvas
    content_container.appendChild(hive);

    // Hive im unteren Drittel zentrieren
    function positionHive() {
        const containerHeight = content_container.clientHeight;
        const hiveHeight = hive.offsetHeight || 100; // Fallback falls noch nicht gerendert
        const targetY = containerHeight * (2 / 3) + (containerHeight / 6 - hiveHeight / 2);
        hive.style.left = "50%";
        hive.style.top = `${targetY}px`;
        hive.style.transform = "translateX(-50%)";
    }

    // Initialisierung
    resizeCanvas();

    // Bei Resize neu zeichnen
    window.addEventListener("resize", resizeCanvas);
});