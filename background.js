const animationPath = "/animations/";

function initChildren(content_container) {
    Array.from(content_container.children).forEach(child => {
        if (!child.classList.contains("ignore-z")) {
            if (getComputedStyle(child).position === 'static') {
                child.style.position = 'relative';
            }
            child.style.zIndex = '2';
        }
    });
}

function createLottie(src, xPercent, yPercent) {
    const lottie = document.createElement("lottie-player");
    lottie.src = animationPath + src;
    lottie.setAttribute("background", "transparent");
    lottie.setAttribute("speed", "1");
    lottie.setAttribute("loop", "");
    lottie.setAttribute("autoplay", "");

    lottie.style.width = "150px";
    lottie.style.height = "150px";
    lottie.style.position = "absolute";
    lottie.style.left = `${xPercent * 100}%`;
    lottie.style.top = `${yPercent * 100}%`;
    lottie.style.transform = "translate(-50%, -50%)";
    lottie.style.zIndex = "1";
    lottie.classList.add("ignore-z");

    return lottie;
}

document.addEventListener("DOMContentLoaded", () => {
    const content_container = document.getElementById("content-container");
    const backgroundPath = animationPath + "Background.png";

    if (content_container) {
        initChildren(content_container);

        // styles fürs Bild festlegen
        // Set styles
        content_container.style.position = "relative";
        content_container.style.overflow = "hidden";

        // Hintergrundbild als Element
        const img = document.createElement("img");
        img.src = backgroundPath;
        img.style.position = "absolute";
        img.style.bottom = "0";
        img.style.left = "50%";
        img.style.transform = "translateX(-50%)";
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.objectFit = "cover";
        img.style.objectPosition = "bottom center";
        img.style.zIndex = "0";
        img.style.pointerEvents = "none";
        img.classList.add("ignore-z");

        // Container für Lotties
        const overlay = document.createElement("div");
        overlay.style.position = "absolute";
        overlay.style.bottom = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "auto";
        overlay.style.zIndex = "1";
        overlay.style.pointerEvents = "none";

        // Lotties platzieren (mit Prozent-Koordinaten relativ zum Bild!)
        const hive = createLottie("Hive.json", 0.47, 0.67);
        const bee = createLottie("Bee_to_Hive.json", 0.42, 0.68);

        overlay.appendChild(hive);
        overlay.appendChild(bee);

        content_container.appendChild(img);
        content_container.appendChild(overlay);
    }
});