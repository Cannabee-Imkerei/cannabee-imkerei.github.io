const kontaktForm = document.getElementById("kontaktForm");
const vorname = document.getElementById("vorname");
const nachname = document.getElementById("nachname");
const handy = document.getElementById("handy");
const emailInput = document.getElementById('email');
const anfrage = document.getElementById('anfrageArt');
const datum = document.getElementById('datum');
const nachricht = document.getElementById('nachricht');

function SetKalender() {
    const today = new Date();
    const in3Weeks = new Date();
    in3Weeks.setDate(today.getDate() + 21);

    flatpickr("#datum", {
        minDate: today,
        maxDate: in3Weeks,
        dateFormat: "Y-m-d",
        disableMobile: false
    });
}

function validateEmail(mail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    return emailRegex.test(mail);
}

function validateHandy(nummer) {
    const nummerRegex = /^(?:\+49|0)(1(?:5[0-9]|6[0-9]|7[0-9]))\d{7,8}$/;
    return nummerRegex.test(nummer);
}

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        emailInput.setCustomValidity('Bitte gib eine gültige E-Mail-Adresse ein.');
    } else {
        emailInput.setCustomValidity('');
    }
    emailInput.reportValidity();
});

handy.addEventListener('blur', () => {
    if (validateHandy(handy.value)) {
        handy.setCustomValidity('Bitte gib eine gültige Handynummer ein.\nLasse dabei die führende Null weg!\nZbs: 15212345678');
    } else {
        handy.setCustomValidity('');
    }
    handy.reportValidity();
})

document.addEventListener('DOMContentLoaded', () => {
    // Begrenze Datumsauswahl auf die nächsten 3 Wochen
    const today = new Date();
    const in3Weeks = new Date();
    in3Weeks.setDate(today.getDate() + 21);

    SetKalender();

    // Dynamischer Platzhalter im Nachrichtenfeld
    anfrage.addEventListener('change', () => {
        const option = anfrage.value;
        if (option === 'honig') {
            nachricht.placeholder = 'Zbs.: 3 Gläser Raps, 2 Gläser Robinie, 1 Glas Früchtracht';
        } else if (option === 'workshop') {
            nachricht.placeholder = 'Zbs.: Kindergarten, 20 Kinder, Musterstadt';
        } else if (option === 'termin') {
            nachricht.placeholder = 'Zbs.: Würde gerne mehr über eure Betriebsweise erfahren';
        } else {
            nachricht.placeholder = '';
        }
    });
});

kontaktForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const kontakt_old = kontaktForm.innerHTML;

    // Lade Animation
    kontaktForm.innerHTML = `
        <dotlottie-wc
            src='https://lottie.host/f14da36c-e4fe-41ea-839f-bc66cdc0f761/Y0perzQx1j.lottie'
            style='width: 300px;height: 300px'
            speed='1'
            autoplay
            loop
        ></dotlottie-wc>
        `;

    // Aktuelles Datum/Uhrzeit erzeugen
    const now = new Date().toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    // Datenobjekt für deine eigene E-Mail
    const rawHandy = handy.value.trim();
    const cleanHandy = rawHandy.replace(/^(\+|0+)/, "");

    const dataToMe = {
        vorname: vorname.value,
        nachname: nachname.value,
        handy: cleanHandy,
        email: emailInput.value,
        anfrage: anfrage.value,
        datum: datum.value,
        nachricht: nachricht.value
    };

    // Datenobjekt für Bestätigungsmail an den Kunden
    const dataToUser = {
        name: `${vorname.value} ${nachname.value}`,
        time: now
    };

    try {
        // Init EmailJS
        emailjs.init({
            publicKey: "u4B4SJLcIIxRnNppQ",
        });

        // E-Mail an dich
        await emailjs.send("service_cannabee", "template_muv79m6", dataToMe);

        // E-Mail an Kunde
        await emailjs.send("service_cannabee", "template_11p1tow", {
            ...dataToUser,
            email: emailInput.value
        });

        // Bestätigung Animation
        kontaktForm.innerHTML = `
        <dotlottie-wc
            id="lottie-success"
            src="https://lottie.host/2c127db8-e38d-4659-a9a7-9bb3fa4ed6d2/7uNuvDZavJ.lottie"
            style="width: 300px;height: 300px"
            speed="1"
            autoplay
        ></dotlottie-wc>
        `;

        // Warte kurz bis DOM aktualisiert ist
        setTimeout(() => {
            const lottieElement = document.getElementById("lottie-success");

            // warte bis Shadow DOM geladen ist
            const interval = setInterval(() => {
                const player = lottieElement.shadowRoot?.querySelector("lottie-player");
                if (player) {
                    clearInterval(interval);

                    // Eventlistener anhängen
                    player.addEventListener("complete", () => {
                        kontaktForm.innerHTML = kontakt_old;
                        e.target.reset();
                    });
                }
            }, 50);
        }, 100);

    } catch (error) {
        console.error("Fehler beim Senden:", error);

        kontaktForm.innerHTML = `
        <div style="text-align: center;">
            <dotlottie-wc
            src="https://lottie.host/896ce509-ae92-4a81-88c5-d5be9e8ba791/A1B2aEidDQ.lottie"
            style="width: 300px;height: 300px"
            speed="1"
            autoplay
            loop
            ></dotlottie-wc>
            <p style="color: #b00020; font-weight: bold; margin-top: -20px;">
            Beim Absenden des Formulars ist ein Fehler aufgetreten.<br />Bitte versuche es später erneut.
            </p>
        </div>
        `;

        setTimeout(() => {
            kontaktForm.innerHTML = kontakt_old;
            e.target.reset();
        }, 5000);
    }
});