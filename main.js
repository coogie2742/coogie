
const generateBtn = document.getElementById('generate');
const numbersContainer = document.getElementById('numbers');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
    localStorage.setItem('theme', theme);
});

function generateGame() {
    const numbers = new Set();
    while(numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    
    // Generate Bonus Number
    let bonusNumber;
    do {
        bonusNumber = Math.floor(Math.random() * 45) + 1;
    } while (numbers.has(bonusNumber));
    
    return { main: sortedNumbers, bonus: bonusNumber };
}

generateBtn.addEventListener('click', () => {
    numbersContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const gameData = generateGame();
        const rowEl = document.createElement('div');
        rowEl.classList.add('game-row');
        
        // Main Numbers
        gameData.main.forEach(num => {
            const numEl = document.createElement('div');
            numEl.classList.add('number');
            numEl.textContent = num;
            rowEl.appendChild(numEl);
        });
        
        // Plus sign
        const plusEl = document.createElement('div');
        plusEl.classList.add('plus-sign');
        plusEl.textContent = '+';
        rowEl.appendChild(plusEl);
        
        // Bonus Number
        const bonusEl = document.createElement('div');
        bonusEl.classList.add('number', 'bonus');
        bonusEl.textContent = gameData.bonus;
        rowEl.appendChild(bonusEl);
        
        numbersContainer.appendChild(rowEl);
    }
});
