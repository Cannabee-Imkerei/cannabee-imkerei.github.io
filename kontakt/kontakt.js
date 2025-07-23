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
        handy.setCustomValidity('Bitte gib eine gültige Handynummer ein.');
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

document.getElementById("kontaktForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Verhindert das Standard-Formularverhalten

    const data = {
        vorname: vorname.value,
        nachname: nachname.value,
        handy: handy.value,
        email: emailInput.value,
        anfrage: anfrage.value,
        datum: datum.value,
        nachricht: nachricht.value
    };

    try {
        const response = await fetch("http://176.100.37.241:6401/cannabee/anfrage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log("Anfrage erfolgreich gesendet");
            // z.B. Erfolgsnachricht anzeigen
        } else {
            console.error("Fehler beim Senden der Anfrage");
        }
    } catch (err) {
        console.error("Netzwerkfehler:", err);
    }
});