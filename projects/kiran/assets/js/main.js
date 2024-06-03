document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

function startGame() {
    window.location.href = paths.game;
}

// Interact.js setup for demo marker
interact('.marker').draggable({
    listeners: {
        move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        },
        end(event) {
            const target = event.target;
            const rect = target.getBoundingClientRect();
            const targetRect = document.querySelector('#image-container img').getBoundingClientRect();

            if (
                rect.left >= targetRect.left &&
                rect.right <= targetRect.right &&
                rect.top >= targetRect.top &&
                rect.bottom <= targetRect.bottom
            ) {
                startGame();
            }
        }
    }
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
