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

const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        emailInput.setCustomValidity('Bitte gib eine gültige E-Mail-Adresse ein.');
    } else {
        emailInput.setCustomValidity('');
    }
    emailInput.reportValidity();
});

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('anfrageArt');
    const nachricht = document.getElementById('nachricht');
    const datum = document.getElementById('datum');

    // Begrenze Datumsauswahl auf die nächsten 3 Wochen
    const today = new Date();
    const in3Weeks = new Date();
    in3Weeks.setDate(today.getDate() + 21);

    SetKalender();

    // Dynamischer Platzhalter im Nachrichtenfeld
    select.addEventListener('change', () => {
        const option = select.value;
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