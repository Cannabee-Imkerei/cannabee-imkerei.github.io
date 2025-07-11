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
    const lottiePlayer = document.createElement("lottie-player");
    lottiePlayer.src = animationPath + "Hive.json";
    lottiePlayer.setAttribute("background", "transparent");
    lottiePlayer.setAttribute("speed", "1");
    lottiePlayer.setAttribute("loop", "");
    lottiePlayer.setAttribute("autoplay", "");
    lottiePlayer.classList.add("hive-anim", "ignore-z");
    return lottiePlayer;
}

function createBeeToHive() {
    const lottiePlayer = document.createElement("lottie-player");
    lottiePlayer.src = animationPath + "Bee_to_Hive.json";
    lottiePlayer.setAttribute("background", "transparent");
    lottiePlayer.setAttribute("speed", "1");
    lottiePlayer.setAttribute("loop", "");
    lottiePlayer.setAttribute("autoplay", "");
    lottiePlayer.classList.add("bee-anim", "ignore-z");
    return lottiePlayer;
}

document.addEventListener("DOMContentLoaded", () => {
    const content_container = document.getElementById("content-container");
    const backgroundPath = animationPath + "Background.png";

    if (content_container) {
        // Set container style
        content_container.style.position = "relative";
        content_container.style.overflow = "hidden";

        const bgImage = document.createElement("img");
        bgImage.src = backgroundPath;
        bgImage.alt = "Wiese";
        bgImage.classList.add("background-image", "ignore-z");
        content_container.appendChild(bgImage);

        initChildren(content_container);

        const hive = createHive();
        const beeToHive = createBeeToHive();

        content_container.appendChild(hive);
        content_container.appendChild(beeToHive);
    }
});