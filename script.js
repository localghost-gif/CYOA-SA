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

function handlePortcullisChoice(choice) {
    if (choice === 'DROP') {
        alert("Safe play. The noise stops, but you have no intel on the attacker.");
    } else if (choice === 'LOG') {
        alert("The Honeypot captured a payload! You've discovered a 0-day attempt. Level 2 Unlocked.");
    } else {
        alert("GAME OVER: The attacker bypassed the gateway while you were 'verifying'.");
    }
}

const terminalOutput = document.getElementById('game-text'); // Adjust ID to your HTML

function typeWriter(text, i = 0) {
    if (i < text.length) {
        terminalOutput.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 30); // 30ms per char
    }
}

// Level 1: The Portcullis
const introText = "Establishing secure connection to JORN-SOC... [OK]\n" +
                  "Loading Portcullis Firewall Logs... [OK]\n" +
                  "WARNING: Unidentified ingress traffic detected on Port 22.\n" +
                  "Analyze the packet header?";

typeWriter(introText);

const logData = [
    "10.0.0.5 - - [27/Mar/2026] GET /index.html 200",
    "10.0.0.12 - - [27/Mar/2026] GET /favicon.ico 200",
    "192.168.1.105 - - [27/Mar/2026] POST /admin/login 401",
    "192.168.1.105 - - [27/Mar/2026] POST /admin/login 401",
    "192.168.1.105 - - [27/Mar/2026] POST /admin/login 401"
];

function startPortcullisLevel() {
    const gameText = document.getElementById('game-text'); // Ensure this ID exists in your HTML
    gameText.innerHTML = "ALERT: BRUTE FORCE DETECTED AT THE PORTCULLIS.<br>Review logs and identify the attacker's IP:<br><br>";
    
    // Display the logs
    logData.forEach(log => {
        gameText.innerHTML += `<code>${log}</code><br>`;
    });

    // Simple prompt for the player
    const playerChoice = prompt("Enter the suspicious IP address to block:");
    if (playerChoice === "192.168.1.105") {
        alert("SUCCESS: IP Blocked. Portcullis stabilized. Level 2 unlocked.");
    } else {
        alert("FAILURE: The attacker bypassed the firewall. System compromised.");
    }
}