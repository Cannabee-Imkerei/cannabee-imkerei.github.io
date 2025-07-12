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

    // Init DOM
    initChildren(content_container);

    // Canvas erstellen und einfügen
    const canvas = document.createElement("canvas");
    canvas.id = "background-canvas";
    canvas.className = "w-100 h-100 position-absolute top-0 start-0";
    canvas.style.zIndex = "0";
    content_container.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const backgroundPath = animationPath + "Background.png";
    const backgroundImage = new Image();
    backgroundImage.src = backgroundPath;

    // Hive erstellen und einfügen
    const hive = createHive();
    hive.style.position = "absolute";
    hive.style.zIndex = "1";
    content_container.appendChild(hive);

    function resizeCanvasAndPosition() {
        // Canvas auf Containergröße anpassen
        canvas.width = content_container.clientWidth;
        canvas.height = content_container.clientHeight;

        // Hintergrund zeichnen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Logisches Grid
        const cellWidth = 200;
        const cellHeight = 200;
        const cols = Math.floor(canvas.width / cellWidth);
        const rows = Math.floor(canvas.height / cellHeight);

        // Ziel: Mitte im unteren Drittel
        const targetCol = Math.floor(cols / 2);
        const targetRow = Math.floor(rows * 2 / 3);

        // Position Hive basierend auf Grid-Zelle
        const x = targetCol * cellWidth + cellWidth / 2;
        const y = targetRow * cellHeight + cellHeight / 2;

        hive.style.left = `${x}px`;
        hive.style.top = `${y}px`;
        hive.style.transform = "translate(-50%, -50%)";
    }

    // Wenn Bild geladen, canvas zeichnen und Hive positionieren
    backgroundImage.onload = () => {
        resizeCanvasAndPosition();
    };

    window.addEventListener("resize", resizeCanvasAndPosition);
});