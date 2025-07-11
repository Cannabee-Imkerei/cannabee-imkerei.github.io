document.addEventListener("DOMContentLoaded", () => {
    const content_container = document.getElementById("content-container");
    const animationPath = "/animations/";
    const backgroundPath = animationPath + "Background.png";

    if (content_container) {
        // Set background
        content_container.style.backgroundImage = `url('${backgroundPath}')`;
        content_container.style.backgroundSize = "cover";
        content_container.style.backgroundPosition = "bottom center";
        content_container.style.backgroundRepeat = "no-repeat";

        // Create lottie-player
        const lottiePlayer = document.createElement("lottie-player");
        lottiePlayer.src = animationPath + "Hive.json";
        lottiePlayer.setAttribute("background", "transparent");
        lottiePlayer.setAttribute("speed", "1");
        lottiePlayer.setAttribute("loop", "");
        lottiePlayer.setAttribute("autoplay", "");

        lottiePlayer.style.width = "200px";
        lottiePlayer.style.height = "200px";
        lottiePlayer.style.position = "absolute";
        lottiePlayer.style.top = "60%";
        lottiePlayer.style.left = "50%";
        lottiePlayer.style.transform = "translateX(-50%) scale(1)";
        lottiePlayer.style.zIndex = "0";

        // Append to container
        content_container.appendChild(lottiePlayer);

        // Set z-index 1 for all other children
        Array.from(content_container.children).forEach(child => {
            if (child !== lottiePlayer) {
                // Falls die Elemente noch keine Position haben, ggf. 'relative' setzen:
                if (getComputedStyle(child).position === 'static') {
                    child.style.position = 'relative';
                }
                child.style.zIndex = '1';
            }
        });
    }
});
