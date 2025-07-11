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
    lottiePlayer.style.top = "55%";
    lottiePlayer.style.left = "50%";
    lottiePlayer.style.transform = "translateX(-50%) scale(1)";
    lottiePlayer.style.zIndex = "0";
    lottiePlayer.classList.add("ignore-z");

    return lottiePlayer;
}

function createBeeToHive() {
    // Create Hive Anim
    const lottiePlayer = document.createElement("lottie-player");
    lottiePlayer.src = animationPath + "Bee_to_Hive.json";
    lottiePlayer.setAttribute("background", "transparent");
    lottiePlayer.setAttribute("speed", "1");
    lottiePlayer.setAttribute("loop", "");
    lottiePlayer.setAttribute("autoplay", "");

    lottiePlayer.style.width = "200px";
    lottiePlayer.style.height = "200px";
    lottiePlayer.style.position = "absolute";
    lottiePlayer.style.top = "55%";
    lottiePlayer.style.left = "45%";
    lottiePlayer.style.transform = "translateX(-50%) scale(1)";
    lottiePlayer.style.zIndex = "0";
    lottiePlayer.classList.add("ignore-z");

    return lottiePlayer;
}

document.addEventListener("DOMContentLoaded", () => {
    const content_container = document.getElementById("content-container");
    const animationPath = "/animations/";
    const backgroundPath = animationPath + "Background.png";

    if (content_container) {
        initChildren(content_container);

        // Set background
        content_container.style.backgroundImage = `url('${backgroundPath}')`;
        content_container.style.backgroundSize = "cover";
        content_container.style.backgroundPosition = "bottom center";
        content_container.style.backgroundRepeat = "no-repeat";

        const hive = createHive();
        const beeToHive = createBeeToHive();

        // Append to container
        content_container.appendChild(hive);
        content_container.appendChild(beeToHive);
    }
});
