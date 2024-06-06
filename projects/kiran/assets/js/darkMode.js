// darkMode.js
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Apply dark mode to all relevant elements
const darkModeStyles = `
    body.dark-mode {
        background-color: #121212;
        color: #ffffff;
    }
    header.dark-mode, footer.dark-mode, main.dark-mode {
        background-color: #333;
        color: #ffffff;
    }
    .dark-mode .marker-box, .dark-mode .btn {
        color: white;
    }
    .dark-mode .modal {
        background-color: #333;
        color: #ffffff;
    }
`;
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = darkModeStyles;
document.head.appendChild(styleSheet);
