document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    const userScore = localStorage.getItem('userScore');
    document.getElementById('user-score').textContent = userScore ? userScore : 'No score available';

    // Create confetti animation
    const confettiContainer = document.getElementById('confetti-container');
    for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.left = `${Math.random() * 100}vw`;
        confettiPiece.style.animationDuration = `${Math.random() * 2 + 3}s`;
        confettiPiece.style.opacity = Math.random();
        confettiContainer.appendChild(confettiPiece);
    }

    // Display a random leaderboard
    const leaderboards = [
        ['Player 1: 100', 'Player 2: 90', 'Player 3: 80'],
        ['Player A: 95', 'Player B: 85', 'Player C: 75'],
        ['User X: 98', 'User Y: 88', 'User Z: 78']
    ];
    const randomLeaderboard = leaderboards[Math.floor(Math.random() * leaderboards.length)];
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = randomLeaderboard.map(item => `<li>${item}</li>`).join('');
});

// Placeholder script for feedback form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Feedback submitted!');
});

function exportToExcel() {
    const userScore = localStorage.getItem('userScore');
    const feedback = document.getElementById('feedback').value;

    const data = [
        ['Score', 'Feedback', 'Timestamp'],
        [userScore, feedback, new Date().toISOString()]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');

    XLSX.writeFile(workbook, 'results.xlsx');
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
