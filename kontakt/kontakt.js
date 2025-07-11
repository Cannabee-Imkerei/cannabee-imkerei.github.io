function SetKalender(){
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
            nachricht.placeholder = '3 Gläser Raps, 2 Gläser Robinie, 1 Glas Früchtracht';
        } else if (option === 'workshop') {
            nachricht.placeholder = 'Kindergarten, 20 Kinder, Musterstadt';
        } else if (option === 'termin') {
            nachricht.placeholder = 'Würde gerne mehr über eure Betriebsweise erfahren';
        } else {
            nachricht.placeholder = '';
        }
    });
});