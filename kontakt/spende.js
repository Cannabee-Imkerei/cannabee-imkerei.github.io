const spendenBetrag = document.getElementById("spendenbetrag");
const spendenBtn = document.getElementById("spendenBtn");
const feedbackBox = document.getElementById("feedbackBox");

function showFeedback(message, isError = true) {
    feedbackBox.textContent = message;
    feedbackBox.className = isError ? "feedbackError" : "feedbackSuccess";
    feedbackBox.style.display = "block";

    setTimeout(() => {
        feedbackBox.style.display = "none";
    }, 4000); // 4 Sekunden sichtbar
}

document.addEventListener("click", async (event) => {
    if (event.target === spendenBtn) {
        const betrag = parseFloat(spendenBetrag.value);

        if (isNaN(betrag) || betrag <= 0) {
            showFeedback("Bitte gib einen gültigen Spendenbetrag ein.");
            return;
        }

        try {
            const response = await fetch("https://jow-api.onrender.com/api/spende", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ spende: betrag })
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Antwort erhalten:", result);

                if (result.url) {
                    // Optional: vorher kurzes Feedback anzeigen
                    showFeedback("Weiterleitung wird vorbereitet...", false);

                    setTimeout(() => {
                        window.location.href = result.url;  // 🔁 Weiterleitung zu Stripe Checkout
                    }, 800); // ganz kurzer Moment zum Lesen

                } else {
                    showFeedback("Fehler: Keine Zahlungs-URL erhalten.");
                }
            } else {
                showFeedback("Fehler: " + result.error);
            }
        } catch (err) {
            console.error("Fehler beim Spenden:", err);
            showFeedback("Ein Fehler ist aufgetreten. Bitte später erneut versuchen.");
        }
    }
});