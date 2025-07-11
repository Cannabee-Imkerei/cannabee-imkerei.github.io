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

        lottiePlayer.style.width = "400px";
        lottiePlayer.style.height = "400px";
        lottiePlayer.style.position = "absolute";
        lottiePlayer.style.top = "50%";
        lottiePlayer.style.left = "50%";
        lottiePlayer.style.transform = "translateX(-50%) scale(1)";
        lottiePlayer.style.zIndex = "0";

        // Append to container
        content_container.appendChild(lottiePlayer);
    }
});
