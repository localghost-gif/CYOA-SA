let blockedCount = 0;
let isLevelActive = false;

// Common weak passwords to "defend" against
const commonPasses = ["123456", "password", "admin123", "qwerty", "dragon", "guest"];

function startLevel(theme) {
    if (theme === 'medieval') {
        isLevelActive = true;
        document.getElementById('medieval-ui').classList.remove('d-none');
        document.getElementById('card-medieval').classList.add('accent-border');
        runAttackCycle();
    }
}

function runAttackCycle() {
    if (!isLevelActive) return;

    const log = document.getElementById('attacker-log');
    const randomPass = commonPasses[Math.floor(Math.random() * commonPasses.length)];
    
    // Simulate an attacker trying a password
    log.innerText = `[ATTACK] Trying pass: "${randomPass}"`;
    log.style.color = "#ff4444";

    // Re-run every 2 seconds
    setTimeout(runAttackCycle, 2000);
}

function mitigate(event) {
    event.stopPropagation(); // Prevents clicking the button from "clicking" the card
    blockedCount++;
    const log = document.getElementById('attacker-log');
    
    log.innerText = ">> GATE CLOSED. THREAT NEUTRALIZED.";
    log.style.color = "#4ade80"; // Success Green
    
    console.log(`Successfully blocked ${blockedCount} attempts.`);
}