const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍈'];
let balance = 2000;
const bet = 20;

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinSlots() {
    if (balance < bet) {
        alert('Nicht genug Guthaben!');
        return;
    }
    
    // Reduce balance
    balance -= bet;
    document.getElementById('balance').textContent = `Kontostand: ${balance}€`;

    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');
    const result = document.getElementById('result');

    // Roll animation
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
            balance += bet * 5; // Example payout
            result.textContent = 'Gewonnen! 🎉';
        } else {
            result.textContent = 'Leider verloren. Versuchen Sie es noch einmal!';
        }

        document.getElementById('balance').textContent = `Kontostand: ${balance}€`;
    }, 300); // Duration of the rolling animation
}

document.getElementById('spinButton').addEventListener('click', spinSlots);
