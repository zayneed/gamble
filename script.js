document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spinButton');
    const winSound = document.getElementById('winSound');
    const resultText = document.getElementById('result');
    const balanceDisplay = document.getElementById('balance');
    const betAmountInput = document.getElementById('betAmount');
    const betDisplay = document.getElementById('betDisplay');
    let balance = 2000; // Startkontostand

    // Funktion zum Aktualisieren des Wetteinsatzes
    function updateBetDisplay() {
        const betAmount = parseInt(betAmountInput.value, 10);
        if (isNaN(betAmount) || betAmount < 5) {
            betAmountInput.value = 5;
        }
        betDisplay.textContent = `Einsatz: ${betAmountInput.value}€`;
    }

    // Aktualisiere Wetteinsatz-Anzeige bei Änderungen im Eingabefeld
    betAmountInput.addEventListener('input', updateBetDisplay);

    function getRandomSymbol() {
        const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇'];
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function spinSlots() {
        const betAmount = parseInt(betAmountInput.value, 10);

        // Überprüfe, ob der Einsatz gültig ist
        if (isNaN(betAmount) || betAmount < 5 || betAmount > balance) {
            resultText.textContent = 'Ungültiger Einsatz. Bitte geben Sie einen Betrag zwischen 5€ und Ihrem Kontostand ein.';
            return;
        }

        // Reduce balance
        balance -= betAmount;
        balanceDisplay.textContent = `Kontostand: ${balance}€`;

        const slot1 = document.getElementById('slot1');
        const slot2 = document.getElementById('slot2');
        const slot3 = document.getElementById('slot3');

        // Roll animation
        slot1.style.transition = 'transform 0.3s';
        slot2.style.transition = 'transform 0.3s';
        slot3.style.transition = 'transform 0.3s';
        slot1.style.transform = 'rotateX(720deg)';
        slot2.style.transform = 'rotateX(720deg)';
        slot3.style.transform = 'rotateX(720deg)';

        setTimeout(() => {
            slot1.style.transform = 'rotateX(0deg)';
            slot2.style.transform = 'rotateX(0deg)';
            slot3.style.transform = 'rotateX(0deg)';
            
            slot1.textContent = getRandomSymbol();
            slot2.textContent = getRandomSymbol();
            slot3.textContent = getRandomSymbol();

            if (slot1.textContent === slot2.textContent && slot2.textContent === slot3.textContent) {
                balance += betAmount * 5; // Beispiel für Gewinn
                resultText.textContent = 'Gewonnen! 🎉';
                winSound.play(); // Spiele den Gewinn-Sound ab
            } else {
                resultText.textContent = 'Leider verloren. Versuchen Sie es noch einmal!';
            }

            balanceDisplay.textContent = `Kontostand: ${balance}€`;
        }, 300); // Dauer der Rollanimation
    }

    spinButton.addEventListener('click', spinSlots);

    // Initialisiere Wetteinsatz-Anzeige
    updateBetDisplay();
});
